import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

type Props = {
  value: string;
  onChangeText?: (val: string) => void;
  cryptoSymbol: string;
  disabled?: boolean;
};

const SendingAmountInput: React.FC<Props> = ({
  value,
  onChangeText,
  cryptoSymbol,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        autoFocus={true}
        keyboardType="numeric"
        style={[styles.input, disabled && styles.disabled]}
      />
      <Text style={styles.symbol}>{cryptoSymbol}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    fontSize: 48,
    fontWeight: '600',
    color: '#000',
    minWidth: 100,
    textAlign: 'center',
  },
  disabled: {
    color: '#999',
  },
  symbol: {
    backgroundColor: '#F1FEFA',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default SendingAmountInput;
