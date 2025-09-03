import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import Toast from 'react-native-toast-message';
import PrimaryButton from '../../components/PrimaryButton';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { colorList } from '../../utils/colors';
import QRCode from 'react-native-qrcode-svg';
import { shortenAddress } from '../../utils/main';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';

type ReceiveProp = RouteProp<RootStackParamList, 'Receive'>;

const ReceiveScreen: React.FC<{ route: ReceiveProp }> = ({ route }) => {
  const { publicAddress } = route.params;
  const { t } = useTranslation();

  const filterPublicAddress = shortenAddress(publicAddress, 9, 6);
  const qrRef = useRef<any>(null);

  const handleShareAddress = () => {
    if (!qrRef.current) return;

    qrRef.current.toDataURL((dataURL: string) => {
      const imageData = `data:image/png;base64,${dataURL}`;

      const options = {
        title: t('receiveScreen.shareTitle'),
        message: t('receiveScreen.shareMessage', { address: publicAddress }),
        url: imageData,
        type: 'image/png',
      };

      Share.open(options)
        .then((res) => {
          console.log('✅ Shared:', res);
          Toast.show({
            type: 'success',
            text1: t('receiveScreen.shareSuccess'),
          });
        })
        .catch((err) => {
          if (err && err.message !== 'User did not share') {
            console.error('❌ Share error:', err);
          }
        });
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(publicAddress);
    Toast.show({
      type: 'success',
      text1: t('receiveScreen.copied'),
      visibilityTime: 2000,
      position: 'top',
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
          <ScreenHeader title={t('receiveScreen.screenTitle')} showBackButton={true} />

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
            <View>
              <View style={styles.detailItem}>
                <View style={styles.valueContainer}>
                  <View>
                    <Text style={styles.detailLabel}>{t('receiveScreen.walletAddress')}</Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.valueScroll}
                    >
                      <Text style={styles.detailValue}>{filterPublicAddress}</Text>
                    </ScrollView>
                  </View>
                  <View style={styles.line} />
                  <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
                    <Image
                      source={require('../../assets/images/icon_copy.png')}
                      style={styles.actionIcon}
                    />
                    <Text style={styles.copyText}>{t('receiveScreen.copy')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.wrapperQRCode}>
                <QRCode
                  value={publicAddress}
                  size={220}
                  getRef={(c) => (qrRef.current = c)}
                  quietZone={20}
                />
              </View>
            </View>

            <PrimaryButton title={t('receiveScreen.shareAddress')} onPress={handleShareAddress} />
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  detailItem: {
    marginVertical: 8,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#B8B8B8',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueScroll: {
    flex: 1,
  },
  valueScrollLarge: {
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  iconButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colorList.BLUE[100],
    borderRadius: 8,
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: '#364ED4',
  },
  networkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 20,
  },
  networkLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  networkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8347E6',
  },
  copyText: {
    fontSize: 14,
    fontWeight: 700,
    color: colorList.BLUE[600],
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: colorList.GREY[100],
  },
  wrapperQRCode: {
    borderRadius: 32,
    backgroundColor: '#fff',
    borderWidth: 7,
    borderColor: colorList.BLUE[600],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 'auto',
    marginTop: 77,
  },
  scrollViewContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
});

export default ReceiveScreen;
