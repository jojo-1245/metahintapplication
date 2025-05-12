/* eslint-disable react-native/no-inline-styles */
import {
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colorList} from '../../../utils/colors';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import PrimaryButton from '../../../components/PrimaryButton';
import SearchTabContent from './SearchTabContent';
import ContractTabContent from './ContractTabContent';
import {fontSize} from '../../../utils/fontSize';
import ConfirmContent from './ConfirmContent';

export type TokenProp = {
  name: string;
  symbol: string;
  icon: ImageSourcePropType;
};

interface AddTokenScreenProp {
  setIsPopupShow: Dispatch<SetStateAction<boolean>>;
}

const AddTokenScreen: React.FC<AddTokenScreenProp> = ({setIsPopupShow}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'contract' | 'confirm'>(
    'search',
  );
  const [address, setAddress] = useState<string>('');
  const [selectedTokens, setSelectedTokens] = useState<TokenProp[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (activeTab === 'search') {
      setIsButtonDisabled(selectedTokens.length === 0);
    } else if (activeTab === 'contract') {
      const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address.trim());
      setIsButtonDisabled(!isValidAddress);
    }
  }, [activeTab, selectedTokens, address]);

  useEffect(() => {
    if (selectedTokens.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectedTokens]);

  const getTabStyle = (currentTabActive: string, tabName: string) => ({
    flex: 1,
    borderBottomWidth: currentTabActive === tabName ? 5 : 2,
    borderBottomColor: currentTabActive === tabName ? '#007AFF' : '#DEDEDE',
    paddingBottom: 10,
  });

  const handleButton = () => {
    switch (activeTab) {
      case 'search':
        console.log('[AddTokenScreen] Selected tokens:', selectedTokens);
        setIsPopupShow(false);
        break;
      case 'contract':
        console.log('[AddTokenScreen] Entered address:', address);
        setActiveTab('confirm');
        setIsButtonDisabled(false);
        break;
      case 'confirm':
        console.log('[AddTokenScreen] Add new token:', address);
        setIsPopupShow(false);
        break;
      default:
        console.log('[AddTokenScreen] Selected tokens:', selectedTokens);
        break;
    }
  };

  const contentTab = () => {
    switch (activeTab) {
      case 'search':
        return (
          <SearchTabContent
            selectedTokens={selectedTokens}
            setSelectedTokens={setSelectedTokens}
          />
        );
      case 'contract':
        return <ContractTabContent address={address} setAddress={setAddress} />;
      case 'confirm':
        return <ConfirmContent address={address} />;
      default:
        break;
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => setIsPopupShow(false)}>
      <Pressable style={styles.subContainer}>
        <View style={styles.containerTab}>
          {activeTab === 'confirm' ? (
            <Text style={styles.confirmText}>Confirm Token Add</Text>
          ) : (
            <>
              <TouchableOpacity
                style={getTabStyle(activeTab, 'search')}
                onPress={() => setActiveTab('search')}>
                <Text style={styles.textTab}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={getTabStyle(activeTab, 'contract')}
                onPress={() => setActiveTab('contract')}>
                <Text style={styles.textTab}>Contract</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View
          style={[
            styles.containerContent,
            activeTab === 'confirm' && {paddingBottom: 14},
          ]}>
          {contentTab()}
        </View>

        <PrimaryButton
          title={activeTab === 'confirm' ? 'Add Token' : 'Next'}
          onPress={handleButton}
          style={styles.button}
          isDisabled={isButtonDisabled}
        />
      </Pressable>
    </Pressable>
  );
};

export default AddTokenScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    backgroundColor: 'rgba(54,78,212,0.95)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  subContainer: {
    backgroundColor: '#fff',
    minWidth: 320,
    maxWidth: 320,
    padding: 24,
    borderRadius: 22,
    // iOS shadow
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6.5,
    // Android shadow
    elevation: 6,
  },
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#DEDEDE',
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 5,
  },
  textTab: {
    fontWeight: 700,
    color: colorList.GREY[900],
    fontSize: fontSize.base,
    textAlign: 'center',
  },
  confirmText: {
    fontWeight: 700,
    color: colorList.GREY[900],
    fontSize: fontSize.base,
    textAlign: 'center',
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#DEDEDE',
    paddingBottom: 10,
  },
  containerContent: {
    paddingBottom: 38,
    paddingTop: 32,
  },
  button: {
    width: 136,
    marginHorizontal: 'auto',
  },
});
