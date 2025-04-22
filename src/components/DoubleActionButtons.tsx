import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  isDisabled?: boolean;
};

const DoubleActionButtons: React.FC<Props> = ({
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showCancel = false,
  isDisabled = false,
}) => {
  return (
    <View style={styles.container}>
      {showCancel && (
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={onCancel}>
          <Text style={styles.cancelText}>{cancelText}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.button, styles.confirm, isDisabled && {opacity: 0.5}]}
        disabled={isDisabled}
        onPress={onConfirm}>
        <Text style={styles.confirmText}>{confirmText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
  },
  confirm: {
    backgroundColor: '#364ED4',
  },
  cancel: {
    backgroundColor: 'transparent',
    borderColor: '#F5F5F5',
    borderWidth: 1,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 700,
  },
});

export default DoubleActionButtons;
