import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import i18n from '../../i18n';

type CustomFieldProps = {
  label: string;
  value: string;
  copy?: boolean;
  link?: string;
  isLarge?: boolean;
  scan?: boolean;
  editable?: boolean;
  onChangeText?: (val: string) => void;
  onScan?: (val: string) => void;
  placeholder?: string;
};

const CustomField: React.FC<CustomFieldProps> = ({
  label,
  value,
  copy = false,
  link = '',
  isLarge = false,
  scan = false,
  editable = false,
  onChangeText,
  onScan,
  placeholder = '',
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const copyToClipboard = () => {
    Clipboard.setString(value);
    Toast.show({
      type: 'success',
      text1: i18n.t('customField.copied'),
      visibilityTime: 2000,
      position: 'top',
    });
  };

  const openLink = () => {
    if (link) {
      Linking.openURL(link);
    }
  };

  const handleScan = () => {
    navigation.navigate('Scan', {
      onScanned: (result: string) => {
        onScan?.(result);
      },
    });
  };

  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.valueContainer}>
        {editable ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={[styles.detailValue, styles.input]}
            placeholder={placeholder}
            autoFocus={true}
            placeholderTextColor="#B8B8B8"
          />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={isLarge ? styles.valueScrollLarge : styles.valueScroll}>
            <Text style={styles.detailValue}>{value}</Text>
          </ScrollView>
        )}

        {copy && (
          <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
            <Image
              source={require('../assets/images/icon_copy.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        )}

        {link !== '' && (
          <TouchableOpacity onPress={openLink} style={styles.iconButton}>
            <Image
              source={require('../assets/images/icon_link.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        )}

        {scan && (
          <TouchableOpacity onPress={handleScan} style={styles.iconButton}>
            <Image
              source={require('../assets/images/icon_scanner.png')}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomField;

const styles = StyleSheet.create({
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
    paddingVertical: 3,
    paddingHorizontal: 5,
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
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    paddingVertical: 4,
  },
});
