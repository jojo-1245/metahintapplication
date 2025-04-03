/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colorList} from '../utils/colors';
import i18n from '../../i18n';

type OTPCountdownProps = {
  onResend?: () => void; // ⬅️ Tambah ini
};

const OTPCountdown = ({onResend}: OTPCountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(180);

  useEffect(() => {
    if (secondsLeft === 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const handleResend = () => {
    setSecondsLeft(180);
    console.log('[OTPCountdown] Resend code triggered!');
    onResend?.();
  };

  const isResendEnabled = secondsLeft === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>

      <TouchableOpacity
        onPress={handleResend}
        disabled={!isResendEnabled}
        style={{marginTop: 8}}>
        <Text
          style={[
            styles.resendText,
            {
              color: isResendEnabled ? colorList.GREEN[800] : '#C0C0C0',
            },
          ]}>
          {i18n.t('otp.resend')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPCountdown;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 68,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorList.ORANGE[800],
  },
  resendText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
