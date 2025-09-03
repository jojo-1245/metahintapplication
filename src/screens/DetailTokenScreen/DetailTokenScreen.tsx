/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {formatCustom, getBalance, shortenAddress} from '../../utils/main';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jsonRpcRequest} from '../../utils/main'; // pastikan kamu punya function ini
import {useLogout} from '../../context/useContext';
import {getAllTransfers, openDatabase} from '../../utils/dbHelper';
import {colorList} from '../../utils/colors';
import {useTranslation} from 'react-i18next';

// Define types for crypto assets data
interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  txHash: string;
  amount: number;
  icon: any;
  transfer_timestamp: number;
}

type DetailTokenRouteProp = RouteProp<RootStackParamList, 'DetailToken'>;

const DetailTokenScreen = () => {
  const logout = useLogout();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<DetailTokenRouteProp>();
  const {t} = useTranslation();

  const {symbol, name, icon, bgColor} = route.params;

  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [publicAddress, setPublicAddress] = useState('-');
  const [privateKey, setPrivateKey] = useState('');
  const [balance, setBalance] = useState('0');
  const [contractAddress, setContractAddress] = useState('');
  const currency = ['polygon', 'ethereum'];
  const [urlPolygonscan, setUrlPolygonscan] = useState('');

  useEffect(() => {
    const getDataHistory = async () => {
      const db = await openDatabase();
      const response = await getAllTransfers(db, publicAddress.toLowerCase());

      const isSameAddress = (a: string, b: string) =>
        a.toLowerCase() === b.toLowerCase();

      const data = response.filter(item => {
        // Case 1: Native POL (MATIC) → token_type === null
        if (!contractAddress && item.token_type === null) return true;

        // Case 2: ERC20 → token_type must match contract address
        if (contractAddress && item.token_type === contractAddress) return true;

        return false;
      });

      const mappedAssets = data.map(item => {
        const isSending = isSameAddress(item.sender_address, publicAddress);

        return {
          id: item.transfer_hash,
          symbol,
          name: isSending ? 'Sending' : 'Receiving',
          txHash: item.transfer_hash,
          amount: parseFloat(item.amount),
          icon,
          transfer_timestamp: item.transfer_timestamp,
        };
      });

      setCryptoAssets(mappedAssets);
    };

    getDataHistory();
  }, [contractAddress, publicAddress]);

  const fetchCryptoData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: t('detailToken.noTokenFound'),
          text2: t('detailToken.pleaseLoginAgain'),
        });
        navigation.replace('SignIn');
        return;
      }

      // Get key
      const keyRes = await jsonRpcRequest('getPrivateKey', [token], 5);
      const pubAddr = keyRes?.result?.publicAddress;
      const privKey = keyRes?.result?.privateKey;

      if (!pubAddr || !privKey) throw new Error('Invalid key response');

      setPublicAddress(pubAddr);
      setPrivateKey(privKey);

      // Set Polygonscan URL & Contract
      let contract = '';
      let scanUrl = '';

      if (symbol === 'HNT') {
        contract = process.env.HNT_CONTRACT_ADDRESS ?? '';
        scanUrl = `https://polygonscan.com/token/${contract}?a=${pubAddr}`;
      } else {
        scanUrl = `https://polygonscan.com/address/${pubAddr}`;
      }

      setContractAddress(contract);
      setUrlPolygonscan(scanUrl);

      // Fetch balance
      const bal = await getBalance(symbol, pubAddr, contract, currency[0]);
      setBalance(bal.toString());
    } catch (error: any) {
      console.error('fetchCryptoData error:', error);
      Toast.show({
        type: 'error',
        text1: t('detailToken.failedToFetch'),
        text2: error.message || t('detailToken.unknownError'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const handleCopyAddress = () => {
    Clipboard.setString(publicAddress);
    Toast.show({
      type: 'success',
      text1: t('detailToken.addressCopied'),
      text2: t('detailToken.addressCopiedMessage'),
      visibilityTime: 2000,
      position: 'top',
    });
  };

  const handleLogout = () => {
    Alert.alert(
      t('detailToken.logoutConfirmationTitle'),
      t('detailToken.logoutConfirmationMessage'),
      [
        {
          text: t('detailToken.cancel'),
          style: 'cancel',
        },
        {
          text: t('detailToken.logout'),
          onPress: logout,
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const handleSend = () => {
    navigation.navigate('Sending', {
      symbol,
      fromAddress: publicAddress,
      name,
      icon,
      contractAddress,
    });
  };

  const renderCryptoItem = ({item}: {item: CryptoAsset}) => {
    const getIconColor = () => {
      switch (item.symbol) {
        case 'ETH':
          return '#5F59E0';
        case 'POL':
        case 'HNT':
          return '#8347E6';
        default:
          return '#5F59E0';
      }
    };

    const isSending = item.name.toLowerCase() === 'sending';
    const iconArrow = isSending
      ? require('../../assets/images/icon_txsend.png')
      : require('../../assets/images/icon_txreceive.png');

    const handleTransactionDetail = () => {
      navigation.navigate('TransactionDetail', {
        txHash: item.txHash,
        timestamp: item.transfer_timestamp,
        symbol: item.symbol,
      });
    };

    return (
      <TouchableOpacity onPress={handleTransactionDetail}>
        <View style={styles.cryptoItem}>
          <View style={styles.cryptoIconContainer}>
            <View
              style={[styles.cryptoIcon, {backgroundColor: getIconColor()}]}>
              <Image
                source={item.icon}
                style={styles.cryptoIconImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.cryptoInfo}>
            <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
            <View style={styles.transactionTypeContainer}>
              <Text
                style={[
                  styles.cryptoName,
                  {
                    color: isSending ? '#FFC56F' : '#364ED4',
                    textTransform: 'uppercase',
                  },
                ]}>
                {item.name}
              </Text>
              <Image
                source={iconArrow}
                style={styles.transactionArrowIcon}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.cryptoAmount,
                {color: isSending ? '#FFC56F' : '#364ED4'},
              ]}>
              {isSending ? '-' : '+'}
              {item.amount.toString().substring(0, 8)} {item.symbol}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleReceive = () => {
    navigation.navigate('Receive', {
      publicAddress,
    });
  };

  const handlePolygonscan = () => {
    Linking.openURL(urlPolygonscan);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../../assets/logo_metahint.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            padding: 5,
            paddingHorizontal: 10,
            marginTop: -10,
          }}
          onPress={handleLogout}>
          <Image
            source={require('../../assets/images/icon_exit.png')}
            style={{tintColor: '#364ED4', height: 23, width: 23}}
          />
        </TouchableOpacity>
      </View>

      {/* Wallet Card */}
      <View style={styles.walletCardContainer}>
        <View style={styles.walletCard}>
          {/* Card Content */}
          <View style={styles.cardContent}>
            <Image
              source={require('../../assets/images/bg_walletCard.png')}
              style={styles.cardBackground}
            />
            <View style={styles.cardContentInner}>
              <View style={styles.walletAddressContainer}>
                <Text style={styles.walletLabel}>
                  {t('detailToken.myBalance')}
                </Text>
                <Text style={styles.balanceLabel}>
                  {formatCustom(Number(balance))} {symbol}
                </Text>
              </View>
              <View style={styles.addressContainer}>
                <Text style={styles.walletAddress}>
                  {shortenAddress(publicAddress, 8, 6)}
                </Text>
                <TouchableOpacity
                  onPress={handleCopyAddress}
                  style={styles.copyButton}>
                  <Image
                    source={require('../../assets/images/icon_copy.png')}
                    style={styles.copyIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Card Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handlePolygonscan}>
              <View style={styles.actionIconContainer}>
                <Image
                  source={require('../../assets/images/icon_scan.png')}
                  style={styles.actionIcon}
                />
              </View>
              <Text style={styles.actionText}>
                {t('detailToken.polygonScan')}
              </Text>
            </TouchableOpacity>

            <View style={styles.actionDivider} />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleReceive}>
              <View style={styles.actionIconContainer}>
                <Image
                  source={require('../../assets/images/icon_receive.png')}
                  style={styles.actionIcon}
                />
              </View>
              <Text style={styles.actionText}>{t('detailToken.receive')}</Text>
            </TouchableOpacity>

            <View style={styles.actionDivider} />

            <TouchableOpacity style={styles.actionButton} onPress={handleSend}>
              <View style={styles.actionIconContainer}>
                <Image
                  source={require('../../assets/images/icon_send.png')}
                  style={[styles.actionIcon, {marginTop: -3}]}
                />
              </View>
              <Text style={styles.actionText}>
                {t('detailToken.sendCrypto')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Balance Section */}
      <View style={styles.assetsContainer}>
        <Text style={styles.assetsTitle}>
          {name} - {symbol}
        </Text>

        {isLoading ? (
          <Text style={styles.textHistoryEmpty}>
            {t('detailToken.loadingAssets')}
          </Text>
        ) : (
          <View style={styles.cryptoItem}>
            <View style={styles.cryptoIconContainer}>
              <View style={[styles.cryptoIcon, {backgroundColor: bgColor}]}>
                <Image
                  source={icon}
                  style={styles.cryptoIconImage}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.cryptoInfo}>
              <Text style={styles.cryptoSymbol}>{symbol}</Text>
              <Text style={styles.cryptoName}>{name}</Text>
            </View>
            <Text style={styles.cryptoAmount}>
              {formatCustom(Number(balance))} {symbol}
            </Text>
          </View>
        )}
      </View>

      {/* Transaction History */}
      <View style={[styles.assetsContainer, {flex: 1, marginTop: -10}]}>
        <Text style={styles.assetsTitle}>{t('detailToken.history')}</Text>

        {isLoading ? (
          <Text style={styles.textHistoryEmpty}>
            {t('detailToken.loadingAssets')}
          </Text>
        ) : (
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
              <FlatList
                data={cryptoAssets}
                renderItem={renderCryptoItem}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.cryptoList]}
                ListEmptyComponent={
                  <Text style={styles.textHistoryEmpty}>
                    {t('detailToken.noHistory')}
                  </Text>
                }
              />
            </View>
          </SafeAreaView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    padding: 16,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 37,
    width: 111,
    objectFit: 'contain',
  },
  walletCardContainer: {
    paddingHorizontal: 16,
  },
  walletCard: {
    borderRadius: 16,
    marginBottom: 1,
  },
  cardContent: {
    padding: 16,
    position: 'relative',
  },
  cardBackground: {
    position: 'absolute',
    right: 0,
    left: 0,
    width: 'auto',
    zIndex: 1,
    borderRadius: 18,
  },
  cardContentInner: {
    zIndex: 1,
    paddingLeft: 10,
    gap: 5,
  },
  walletAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: -10,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  walletAddress: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 0,
  },
  copyButton: {
    padding: 4,
  },
  copyIcon: {
    color: '#fff',
    height: 24,
    width: 24,
  },
  actionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 25,
    zIndex: 1,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    height: 30,
    width: 30,
  },
  actionIcon: {
    color: '#fff',
    height: 28,
    width: 28,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
  },
  actionDivider: {
    height: 'auto',
    width: 0.5,
    borderRadius: 50,
    backgroundColor: '#D8D8D8',
  },
  assetsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  assetsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  cryptoList: {
    paddingBottom: 16,
  },
  cryptoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cryptoIconContainer: {
    marginRight: 12,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cryptoIconImage: {
    width: 24,
    height: 24,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoSymbol: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  cryptoName: {
    fontSize: 12,
    color: '#B8B8B8',
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  transactionArrowIcon: {
    width: 18,
    height: 18,
    marginTop: -4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cryptoAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  textHistoryEmpty: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: colorList.GREY[500],
  },
});

export default DetailTokenScreen;
