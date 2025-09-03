/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize } from '../utils/fontSize';
import { colorList } from '../utils/colors';
import i18n from '../../i18n';

interface CustomInputConfirmProps extends TextInputProps {
  label?: string;
  type: 'name' | 'number' | 'contract';
  value: string;
  onChangeText: (text: string) => void;
  externalError?: string;
  isInput?: boolean;
}

const CustomInputConfirm: React.FC<CustomInputConfirmProps> = ({
  label,
  type,
  value,
  onChangeText,
  externalError,
  isInput = true,
  ...rest
}) => {
  const [error, setError] = useState('');

  const validate = (text: string) => {
    if (type === 'name') {
      // const valid = /^[A-Za-z\s]*$/.test(text);
      const valid = !/[\d\p{P}$+<=>^`|~]/gu.test(text); // Just remove number & symbol but let all char (Latin, Hangeul, etc)
      setError(valid ? '' : `*${i18n.t('customInputConfirm.name')}`);
    }

    if (type === 'number') {
      const valid = /^[0-9]*$/.test(text);
      setError(valid ? '' : `*${i18n.t('customInputConfirm.number')}`);
    }

    if (type === 'contract') {
      const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(text.trim());
      setError(isValidAddress || text === '' ? '' : `*${i18n.t('customInputConfirm.contract')}`);
    }
  };

  useEffect(() => {
    validate(value);
  }, [value]);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, isInput && { marginBottom: 6 }]}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isInput
            ? {
                paddingHorizontal: 12,
              }
            : { backgroundColor: '#fff' },
        ]}
      >
        {isInput ? (
          <TextInput
            keyboardType={type === 'number' ? 'number-pad' : 'default'}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            {...rest}
          />
        ) : (
          <Text style={[styles.input, { lineHeight: 24, paddingVertical: 4 }]}>{value}</Text>
        )}

        {isInput && (
          <TouchableOpacity onPress={() => onChangeText('')} style={styles.icon}>
            <Icon name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {!!(externalError || error) && <Text style={styles.errorText}>{externalError || error}</Text>}
    </View>
  );
};

export default CustomInputConfirm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: '#B8B8B8',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: fontSize.base,
    fontWeight: 700,
    color: colorList.GREY[900],
  },
  icon: {
    paddingLeft: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 9,
    marginTop: 4,
    marginLeft: 4,
  },
});
