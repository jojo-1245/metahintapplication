/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import CustomField from '../../components/CustomField';
import ScreenHeader from '../../components/ScreenHeader';
import Toast from 'react-native-toast-message';
import SendingAmountInput from '../../components/SendingAmountInput';
import DoubleActionButtons from '../../components/DoubleActionButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jsonRpcRequest } from '../../utils/main';
import { useTranslation } from 'react-i18next';

type SendingConfirmScreenProps = {
  route: {
    params: {
      symbol: string;
      name: string;
      fromAddress: string;
      toAddress: string;
      amount: string;
      icon: any;
      contractAddress: string;
    };
  };
};

const SendingConfirmScreen: React.FC<SendingConfirmScreenProps> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const { fromAddress, toAddress, amount, contractAddress, symbol } = route.params;
  const [countdown, setCountdown] = useState(10);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [networkFee, setNetworkFee] = useState<string>('Estimating...');
  const [estimatedGas, setEstimatedGas] = useState<string>('0');
  const [isButtonConfirmDisabled, setIsButtonConfirmDisabled] = useState(true);

  const network = 'polygon';
  const isNative = symbol === 'POL';

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);

  const fetchGasFeeEstimate = useCallback(async () => {
    if (!toAddress || !amount || !token) return;

    const method = isNative ? 'estimateNativeFee' : 'estimateErc20Fee';
    const params = isNative
      ? [toAddress, amount, network, token]
      : [contractAddress, toAddress, amount, network, token];

    setIsButtonConfirmDisabled(true);
    setNetworkFee('Estimating...');

    try {
      const data = await jsonRpcRequest(method, params, isNative ? 8 : 12);

      if (data.result?.estimatedGas) {
        setEstimatedGas(data.result.estimatedGas);
      }

      if (data.result?.totalFeeWei) {
        const feeMatic = (parseFloat(data.result.totalFeeWei) / 1e18).toFixed(6);
        setNetworkFee(`${feeMatic} POL`);
      } else {
        setNetworkFee('Unavailable');
      }
    } catch (err) {
      console.error('[GasFee Error]', err);
      setNetworkFee('Unavailable');
    } finally {
      setIsButtonConfirmDisabled(false);
    }
  }, [toAddress, amount, token]);

  useEffect(() => {
    if (!token && !toAddress && !amount && !contractAddress) return;
    fetchGasFeeEstimate();
  }, [toAddress, amount, token, contractAddress]);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          fetchGasFeeEstimate();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchGasFeeEstimate, isLoading]);

  const handleSending = async () => {
    if (!toAddress || !amount || !token) {
      Toast.show({
        type: 'error',
        text1: t('sendingScreen.errorMissingTitle'),
        text2: t('sendingScreen.errorMissingMessage'),
        visibilityTime: 2000,
        position: 'top',
      });
      return;
    }

    setIsLoading(true);

    const valueHex = isNative ? `0x${BigInt(parseFloat(amount) * 1e18).toString(16)}` : null;

    const params = isNative
      ? [{ to: toAddress, value: valueHex }, network, token, false]
      : [contractAddress, toAddress, amount, network, token];

    const method = isNative ? 'eth_sendTransaction' : 'sendErc20Token';
    const id = isNative ? 7 : 11;

    try {
      const data = await jsonRpcRequest(method, params, id);
      console.log('[sendErc20Token Response]', data);

      if (data.result) {
        Toast.show({
          type: 'success',
          text1: t('sendingScreen.successTitle'),
          text2: t('sendingScreen.successMessage'),
          visibilityTime: 2000,
          position: 'top',
        });

        navigation.replace('SendingComplete', {
          toAddress,
          networkFee,
          amount,
          txHash: data.result,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('sendingScreen.failedTitle'),
          text2: data.error?.message || 'Unknown error occurred',
          visibilityTime: 5000,
          position: 'top',
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('[sendErc20Token Error]', error);
      Toast.show({
        type: 'error',
        text1: t('sendingScreen.networkErrorTitle'),
        text2: error.message || 'Failed to send transaction',
        visibilityTime: 2000,
        position: 'top',
      });
      setIsLoading(false);
    }
  };

  const transactionData = {
    from: fromAddress,
    to: toAddress,
    networkFee,
    estimatedGas,
    speed: 'Normal <15S',
    network,
  };

  const handleNavigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#364ED4' }} />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <StatusBar backgroundColor="#364ED4" barStyle="light-content" />
        <View style={styles.contentContainer}>
          <ScreenHeader title={t('sendingScreen.confirmTitle')} showBackButton={true} />
          <ScrollView style={{ flex: 1 }}>
            <SendingAmountInput value={amount} cryptoSymbol={symbol} disabled={true} />
            <View style={styles.section}>
              <CustomField
                label={t('sendingScreen.from')}
                value={transactionData.from}
                copy={true}
              />
              <CustomField label={t('sendingScreen.to')} value={transactionData.to} copy={true} />
              {isLoading && (
                <CustomField
                  label={t('sendingScreen.gasPrice')}
                  value={transactionData.estimatedGas}
                  copy={false}
                />
              )}
            </View>

            {!isLoading && (
              <View style={styles.networkContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://polygonscan.com')}
                  style={styles.iconButton}
                >
                  <Image
                    source={require('../../assets/images/logo_polygon.png')}
                    style={styles.actionIcon}
                  />
                  <Image
                    source={require('../../assets/images/icon_link2.png')}
                    style={{ height: 16, objectFit: 'contain', marginTop: 3 }}
                  />
                </TouchableOpacity>
              </View>
            )}

            {!isLoading && (
              <View style={styles.section}>
                <CustomField
                  label={t('sendingScreen.networkFee')}
                  value={transactionData.networkFee}
                />
                <CustomField label={t('sendingScreen.speed')} value={transactionData.speed} />
              </View>
            )}

            <Text style={{ textAlign: 'center', marginTop: 10, color: '#888' }}>
              {isLoading
                ? t('sendingScreen.inProgress')
                : t('sendingScreen.estimationRefresh', { sec: countdown })}
            </Text>

            <View style={{ marginTop: 50, marginBottom: 25 }}>
              {isLoading ? (
                <TouchableOpacity style={styles.button} onPress={handleNavigateToHome}>
                  <Text style={styles.confirmText}>{t('sendingScreen.listPage')}</Text>
                </TouchableOpacity>
              ) : (
                <DoubleActionButtons
                  showCancel={true}
                  confirmText={t('sendingScreen.confirm')}
                  cancelText={t('sendingScreen.cancel')}
                  onConfirm={handleSending}
                  onCancel={() => navigation.goBack()}
                  isDisabled={isButtonConfirmDisabled}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#364ED4',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  section: {
    paddingBottom: 10,
  },
  iconButton: {
    padding: 8,
    flexDirection: 'row',
  },
  actionIcon: {
    height: 23,
    width: 90,
    objectFit: 'contain',
  },
  networkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  progressOverlay: {
    flex: 1,
    backgroundColor: '#364ED4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inProgressText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#364ED4',
    width: 156,
    marginHorizontal: 'auto',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendingConfirmScreen;
