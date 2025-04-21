import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import CustomField from '../../components/CustomField';
import ScreenHeader from '../../components/ScreenHeader';
import { jsonRpcRequest, shortenAddress } from '../../utils/main';
import { fontSize } from '../../utils/fontSize';
import { colorList } from '../../utils/colors';
import {
  createTransferHistoryTable,
  insertTransferRecord,
  openDatabase,
} from '../../utils/dbHelper';
import { useTranslation } from 'react-i18next';

type SendingCompleteScreenProps = {
  route: {
    params: {
      toAddress: string;
      amount: string;
      networkFee: string;
      txHash: string;
    };
  };
};

const SendingCompleteScreen: React.FC<SendingCompleteScreenProps> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const { toAddress, networkFee, amount, txHash } = route.params;

  useEffect(() => {
    const insertReceivedData = async () => {
      const db = await openDatabase();
      await createTransferHistoryTable(db);

      const response = await jsonRpcRequest('getTransactionDetails', [txHash, 'polygon'], 14);
      if (!response.result) return;

      const result = response.result;
      const isErc20 = !!result.erc20Transfer;
      const transferData = {
        transfer_hash: result.hash,
        sender_address: result.from,
        receiver_address: isErc20 ? result.erc20Transfer.recipient : result.to,
        amount: isErc20 ? result.erc20Transfer.amountFormatted : result.valueFormatted,
        blockchain: 'polygon',
        token_type: isErc20 ? result.erc20Transfer.tokenContract : null,
        transfer_timestamp: Date.now() / 1000,
        memo: undefined,
        raw_transaction_json: JSON.stringify(result),
        gas_price: result.gasPrice,
        block_height: result.blockNumber,
      };

      await insertTransferRecord(db, transferData);
    };

    if (txHash) {
      insertReceivedData();
    }
  }, [txHash]);

  const transactionData = {
    toAddres: toAddress,
    amount,
    networkFee,
    txHash,
  };

  const handleNavigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => backHandler.remove();
  }, []);

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
          <ScreenHeader title={t('sendingScreen.completedTitle')} showBackButton={true} />

          <ScrollView style={{ flex: 1 }}>
            <View style={styles.wrapperTitleAddress}>
              <Text style={styles.titleAddress}>{shortenAddress(toAddress, 11, 11)}</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`https://polygonscan.com/tx/${txHash}`)}
              >
                <Image
                  style={styles.iconPolygonscan}
                  height={17}
                  width={109}
                  source={require('../../assets/images/polygonscan.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <CustomField
                label={t('sendingScreen.amount')}
                value={transactionData.amount}
                copy={false}
              />
              <CustomField
                label={t('sendingScreen.networkFee')}
                value={transactionData.networkFee}
                copy={false}
              />
              <CustomField
                label={t('sendingScreen.to')}
                value={transactionData.toAddres}
                copy={true}
              />
              <CustomField
                label={t('sendingScreen.txHash')}
                value={transactionData.txHash}
                copy={true}
              />
            </View>

            <Text style={{ textAlign: 'center', marginTop: 10, color: '#888' }}>
              {t('sendingScreen.completed')}
            </Text>

            <View style={{ marginTop: 50, marginBottom: 25 }}>
              <TouchableOpacity style={styles.button} onPress={handleNavigateToHome}>
                <Text style={styles.confirmText}>{t('sendingScreen.close')}</Text>
              </TouchableOpacity>
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
  wrapperTitleAddress: {
    flexDirection: 'column',
    gap: 12,
    maxWidth: 280,
    marginHorizontal: 'auto',
  },
  titleAddress: {
    fontWeight: '900',
    fontSize: fontSize.lg,
    color: colorList.BLACK[700],
    marginTop: 24,
  },
  section: {
    paddingBottom: 10,
    marginTop: 30,
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
  iconPolygonscan: { marginLeft: 'auto' },
});

export default SendingCompleteScreen;
