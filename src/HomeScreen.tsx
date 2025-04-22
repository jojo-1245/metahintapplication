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
  Dimensions
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import {formatCustom, getBalance, shortenAddress} from '../../utils/main';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import AddTokenScreen from './AddTokenScreen/AddTokenScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jsonRpcRequest} from '../../utils/main';
import {useLogout} from '../../context/useContext';
import {useTranslation} from 'react-i18next';

// Define types for our crypto data
interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  icon: any; // URL image
}

const screenWidth = Dimensions.get('window').width;

let front = 6;
let back = 4;

if (screenWidth < 350) {
  front = 6;
  back = 4;
} else if (screenWidth < 400) {
  front = 10;
  back = 8;
} else if (screenWidth < 500) {
  front = 14;
  back = 12;
} else {
  front = 16;
  back = 14;
}


const HomeScreen = () => {
  const logout = useLogout();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();

  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isPopupShow, setIsPopupShow] = useState(false);
  const [publicAddress, setPublicAddress] = useState('-');
  const contractAddress = process.env.HNT_CONTRACT_ADDRESS ?? '';
  const [balance, setBalance] = useState('0');
  const currency = ['polygon', 'ethereum'];

  // Fetch list currency
  const fetchCryptoData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const keyRes = await jsonRpcRequest('getPrivateKey', [token], 5);

      console.log(keyRes);

      // Condition if token expired
      if (keyRes?.error?.code === -32003) {
        Toast.show({
          type: 'info',
          text1: t('home.tokenExpiredTitle'),
          text2: t('home.tokenExpiredText'),
        });

        const timeout = setTimeout(() => {
          logout();
        }, 3000);
        return () => clearTimeout(timeout);
      }

      const pubAddr = keyRes?.result?.publicAddress;
      if (!pubAddr) throw new Error('No public address found');
      setPublicAddress(pubAddr);

      // --- 1. MATIC Balance (Polygon) ---
      const maticBalance = await getBalance('POL', pubAddr, '', currency[0]);

      // --- 2. HNT (ERC20 token) from getWalletBalances (Polygon) ---
      const hntBalance = await getBalance(
        'HNT',
        pubAddr,
        contractAddress,
        currency[0],
      );

      // --- 3. Update cryptoAssets state ---
      const newAssets: CryptoAsset[] = [
        {
          id: '1',
          symbol: 'POL',
          name: 'Polygon',
          amount: maticBalance,
          icon: require('../../assets/images/icon_polygon.png'),
        },
        {
          id: '2',
          symbol: 'HNT',
          name: 'MetaHint',
          amount: hntBalance,
          icon: require('../../assets/images/icon_hnt.png'),
        },
      ];

      setCryptoAssets(newAssets);
      setBalance(maticBalance.toString()); // default balance in card from Polygon
    } catch (error: any) {
      console.error('fetchCryptoData error:', error);
      Toast.show({
        type: 'error',
        text1: t('home.fetchErrorTitle'),
        text2: error.message || 'Unknown error',
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
      text1: t('home.copySuccessTitle'),
      text2: t('home.copySuccessText'),
    });
  };

  const handleReceive = () => {
    navigation.navigate('Receive', {
      publicAddress,
    });
  };

  const handleSend = () => {
    navigation.navigate('Sending', {
      symbol: 'POL',
      fromAddress: publicAddress,
      name: 'Polygon',
      icon: require('../../assets/images/icon_polygon.png'),
      contractAddress: process.env.POLYGON_CONTRACT_ADDRESS ?? '',
    });
  };

  const handleLogout = () => {
    Alert.alert(
      t('home.logoutTitle'),
      t('home.logoutMessage'),
      [
        {
          text: t('home.logoutCancel'),
          style: 'cancel',
        },
        {
          text: t('home.logoutConfirm'),
          onPress: logout,
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const handlePolygonscan = () => {
    // Fixed template literal syntax
    Linking.openURL(`https://polygonscan.com/address/${publicAddress}`);
  };

  const renderCryptoItem = ({item}: {item: CryptoAsset}) => {
    // Function to determine icon color based on crypto symbol
    const getIconColor = (symbol: string) => {
      switch (symbol) {
        case 'ETH':
          return '#5F59E0';
        case 'POL':
          return '#8347E6';
        case 'HNT':
          return '#8347E6';
        default:
          return '#5F59E0';
      }
    };

    const handlePress = () => {
      navigation.navigate('DetailToken', {
        currID: item.id,
        symbol: item.symbol,
        name: item.name,
        icon: item.icon,
        bgColor: getIconColor(item.symbol),
      });
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.cryptoItem}>
          <View style={styles.cryptoIconContainer}>
            <View
              style={[
                styles.cryptoIcon,
                {backgroundColor: getIconColor(item.symbol)},
              ]}>
              <Image
                source={item.icon}
                style={styles.cryptoIconImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.cryptoInfo}>
            <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
            <Text style={styles.cryptoName}>{item.name}</Text>
          </View>
          <Text style={styles.cryptoAmount}>
            {formatCustom(item.amount)} {item.symbol}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
      {isPopupShow && <AddTokenScreen setIsPopupShow={setIsPopupShow} />}

      {/* Header Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo_metahint.png')}
            style={styles.logo}
          />
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

      {/* Card Wrapper */}
      <View style={styles.walletCardContainer}>
        <View style={styles.walletCard}>
          {/* Card Content */}
          <View
            style={{
              padding: 16,
              position: 'relative',
            }}>
            <Image
              source={require('../../assets/images/bg_walletCard.png')}
              style={{
                position: 'absolute',
                right: 0,
                left: 0,
                width: 'auto',
                zIndex: 1,
                borderRadius: 18,
              }}
            />
            <View
              style={{
                zIndex: 1,
                paddingLeft: 10,
                gap: 15,
              }}>
              <View style={styles.walletAddressContainer}>
                <Text style={styles.walletLabel}>{t('home.cardLabel')}</Text>
                <TouchableOpacity
                  onPress={handleCopyAddress}
                  style={styles.copyButton}>
                  <Image
                    source={require('../../assets/images/icon_copy.png')}
                    style={styles.copyIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.walletAddress}>
                {shortenAddress(publicAddress, front, back)}
              </Text>
            </View>
          </View>

          {/* Card Action */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={handlePolygonscan}
              style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <Image
                  source={require('../../assets/images/icon_scan.png')}
                  style={styles.actionIcon}
                />
              </View>
              <Text style={styles.actionText}>{t('home.polygonScan')}</Text>
            </TouchableOpacity>

            <View
              style={{
                height: 'auto',
                width: 0.5,
                borderRadius: 50,
                backgroundColor: '#D8D8D8',
              }}
            />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleReceive}>
              <View style={styles.actionIconContainer}>
                <Image
                  source={require('../../assets/images/icon_receive.png')}
                  style={styles.actionIcon}
                />
              </View>
              <Text style={styles.actionText}>{t('home.receive')}</Text>
            </TouchableOpacity>

            <View
              style={{
                height: 'auto',
                width: 0.4,
                borderRadius: 50,
                backgroundColor: '#D8D8D8',
              }}
            />

            <TouchableOpacity style={styles.actionButton} onPress={handleSend}>
              <View style={styles.actionIconContainer}>
                <Image
                  source={require('../../assets/images/icon_send.png')}
                  style={[styles.actionIcon, {marginTop: -3}]}
                />
              </View>
              <Text style={styles.actionText}>{t('home.send')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.assetsContainer}>
        <Text style={styles.assetsTitle}>{t('home.walletTitle')}</Text>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text>{t('home.loadingAssets')}</Text>
          </View>
        ) : (
          <FlatList<CryptoAsset>
            data={cryptoAssets}
            renderItem={renderCryptoItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cryptoList}
          />
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
  walletAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  copyButton: {
    padding: 4,
  },
  copyIcon: {
    color: '#fff',
    height: 24,
    width: 24,
  },
  actionIcon: {
    color: '#fff',
    height: 28,
    width: 28,
  },
  walletAddress: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
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
  actionText: {
    fontSize: 12,
    color: '#333',
  },
  assetsContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  assetsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  cryptoIconImage: {
    width: 24,
    height: 24,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
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
  cryptoAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
});

export default HomeScreen;
