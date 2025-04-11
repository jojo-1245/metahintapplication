/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
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
import { useRoute, RouteProp } from '@react-navigation/native';
import CustomField from '../../components/CustomField';
import ScreenHeader from '../../components/ScreenHeader';
import { jsonRpcRequest } from '../../utils/main';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTranslation } from 'react-i18next';

type TransactionDetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;

const TransactionDetailScreen = () => {
  const route = useRoute<TransactionDetailRouteProp>();
  const { t } = useTranslation();

  const { txHash, symbol, timestamp } = route.params;

  const [txDetail, setTxDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTransactionDetails = async (txHash: string) => {
    try {
      const res = await jsonRpcRequest('getTransactionDetails', [txHash, 'polygon'], 14);
      if (!res?.result) throw new Error('Transaction not found');

      const timestampUnix = timestamp;
      const date = new Date(timestampUnix * 1000);
      const dateFormatted = date.toLocaleString();

      const tx = res.result;
      const isERC20 = !!tx.erc20Transfer;
      const totalGasFee = ((Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18).toFixed(6);

      return {
        from: tx.from,
        to: isERC20 ? tx.erc20Transfer.recipient : tx.to,
        time: dateFormatted,
        txHash: tx.hash,
        details: {
          nonce: tx.nonce,
          gasPrice: tx.gasPrice,
          usedGas: tx.gasUsed,
          maxGas: tx.gas,
          totalSpent: isERC20
            ? `${tx.erc20Transfer.amountFormatted} ${symbol}`
            : `${(Number(tx.value) / 1e18).toFixed(6)} ${symbol}`,
          blockNumber: tx.blockNumber,
          gasFee: `${totalGasFee} MATIC`,
        },
        network: 'Polygon',
      };
    } catch (err: any) {
      console.error('fetchTransactionDetails error:', err);
      Toast.show({
        type: 'error',
        text1: t('transactionDetailScreen.failedFetchTitle'),
        text2: err.message || t('transactionDetailScreen.unknownError'),
      });
      return null;
    }
  };

  useEffect(() => {
    const loadTx = async () => {
      const result = await fetchTransactionDetails(txHash);
      if (result) {
        setTxDetail(result);
      }
      setLoading(false);
    };

    loadTx();
  }, [txHash]);

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
          <ScreenHeader title={t('transactionDetailScreen.title')} showBackButton={true} />

          <ScrollView style={{ flex: 1 }}>
            {loading ? (
              <Text style={{ textAlign: 'center', marginTop: 40 }}>
                {t('transactionDetailScreen.loading')}
              </Text>
            ) : txDetail ? (
              <>
                <View style={styles.section}>
                  <CustomField
                    label={t('transactionDetailScreen.from')}
                    value={txDetail.from}
                    copy
                  />
                  <CustomField label={t('transactionDetailScreen.to')} value={txDetail.to} copy />
                  <CustomField label={t('transactionDetailScreen.time')} value={txDetail.time} />
                  <CustomField
                    label={t('transactionDetailScreen.txHash')}
                    value={txDetail.txHash}
                    copy
                    link={`https://polygonscan.com/tx/${txDetail.txHash}`}
                  />
                </View>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    {t('transactionDetailScreen.transactionDetails')}
                  </Text>
                </View>

                <View style={styles.section}>
                  <CustomField
                    label={t('transactionDetailScreen.nonce')}
                    value={txDetail.details.nonce}
                  />
                  <CustomField
                    label={t('transactionDetailScreen.gasPrice')}
                    value={txDetail.details.gasPrice}
                  />
                  <CustomField
                    label={t('transactionDetailScreen.usedGas')}
                    value={txDetail.details.usedGas}
                  />
                  <CustomField
                    label={t('transactionDetailScreen.maxGas')}
                    value={txDetail.details.maxGas}
                  />
                  <CustomField
                    label={t('transactionDetailScreen.totalSpent')}
                    value={txDetail.details.totalSpent}
                    isLarge
                  />
                  <CustomField
                    label={t('transactionDetailScreen.blockHeight')}
                    value={txDetail.details.blockNumber}
                  />
                </View>

                <View style={styles.networkContainer}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`https://polygonscan.com/tx/${txDetail.txHash}`)}
                    style={styles.iconButton}
                  >
                    <Image
                      source={require('../../assets/images/polygonscan.png')}
                      height={17}
                      width={109}
                      style={styles.iconPolygonscan}
                    />
                    <Image
                      source={require('../../assets/images/icon_link2.png')}
                      style={{ height: 14, objectFit: 'contain', marginTop: 3 }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 40 }}>
                {t('transactionDetailScreen.notFound')}
              </Text>
            )}
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
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 25,
    marginTop: 15,
    paddingBottom: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#DEDEDE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  iconButton: {
    padding: 8,
    flexDirection: 'row',
  },
  networkContainer: {
    flexDirection: 'row',
    paddingBottom: 50,
    marginBottom: 20,
  },
  iconPolygonscan: { width: 109, height: 17 },
});

export default TransactionDetailScreen;
