/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TextInput } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { maskEmail } from '../utils/maskEmail';
import { colorList } from '../utils/colors';
import PrimaryButton from '../components/PrimaryButton';
import OTPCountdown from '../components/OTPCountdown';
import { fontSize } from '../utils/fontSize';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DismissKeyboardWrapper from '../components/DismissKeyboardWrapper';
import { jsonRpcRequest } from '../utils/main';
import { useTranslation } from 'react-i18next';

type VerifyEmailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyEmail'>;

type VerifyEmailScreenRouteProp = RouteProp<RootStackParamList, 'VerifyEmail'>;

type VerifyEmailScreenProp = {
  navigation: VerifyEmailScreenNavigationProp;
  route: VerifyEmailScreenRouteProp;
};

const VerifyEmailScreen: React.FC<VerifyEmailScreenProp> = ({ route }) => {
  const navigation = useNavigation<VerifyEmailScreenNavigationProp>();
  const { t } = useTranslation();

  const { name, phoneNumber, email, password } = route.params;
  const length = 4;
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef<TextInput[]>([]);
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setOtp(Array(length).fill(''));
      setIsOtpInvalid(false);

      // Fokus ke input pertama kalau perlu
      setTimeout(() => {
        inputs.current[0]?.focus();
      }, 100);
    }, [])
  );

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleButtonVerifyEmail = async () => {
    const typedOtp = otp.join('');

    // Cek apakah semua input sudah diisi
    if (typedOtp.length < 4) {
      Toast.show({
        type: 'error',
        text1: t('verifyEmail.toast.incomplete.title'),
        text2: t('verifyEmail.toast.incomplete.desc'),
        visibilityTime: 2000,
        position: 'top',
      });
      return;
    }

    try {
      // 1. Verify OTP
      const verifyData = await jsonRpcRequest('verifyEmailCode', [email, typedOtp], 2);

      if (!verifyData.result?.success) {
        Toast.show({
          type: 'error',
          text1: t('verifyEmail.toast.verifyFailed.title'),
          text2: verifyData.result?.message || t('verifyEmail.toast.verifyFailed.desc'),
          visibilityTime: 2000,
          position: 'top',
        });
        return;
      }

      // 2. Register user
      const registerData = await jsonRpcRequest(
        'register',
        [name, phoneNumber, email, password],
        3
      );

      if (registerData.error) {
        Toast.show({
          type: 'error',
          text1: t('verifyEmail.toast.registerFailed.title'),
          text2: registerData.error?.data || t('verifyEmail.toast.registerFailed.desc'),
          visibilityTime: 2000,
          position: 'top',
        });
        navigation.navigate('SignUp');
        return;
      }

      // 3. Simpan ke AsyncStorage
      await AsyncStorage.setItem('userId', registerData.result.userId.toString());
      await AsyncStorage.setItem('publicAddress', registerData.result.publicAddress);

      // 4. Navigasi ke halaman success
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignUpSuccess' }],
      });
    } catch (error) {
      console.error('[VerifyEmailScreen] Error:', error);
      Toast.show({
        type: 'error',
        text1: t('verifyEmail.toast.network.title'),
        text2: t('verifyEmail.toast.network.desc'),
        visibilityTime: 2000,
        position: 'top',
      });
    }
  };

  const handleResendOTP = async () => {
    if (!email) return;

    try {
      const data = await jsonRpcRequest('requestEmailVerification', [email], 1);

      if (data.result?.success) {
        Toast.show({
          type: 'success',
          text1: t('verifyEmail.toast.resendSuccess.title'),
          text2: t('verifyEmail.toast.resendSuccess.desc'),
          visibilityTime: 2000,
          position: 'top',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('verifyEmail.toast.resendFailed.title'),
          text2: data.result?.message || t('verifyEmail.toast.resendFailed.desc'),
          visibilityTime: 2000,
          position: 'top',
        });
      }
    } catch (error) {
      console.error('Resend Error:', error);
      Toast.show({
        type: 'error',
        text1: t('verifyEmail.toast.resendNetwork.title'),
        text2: t('verifyEmail.toast.resendNetwork.desc'),
        visibilityTime: 2000,
        position: 'top',
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#364ED4' }} />

      <DismissKeyboardWrapper>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <StatusBar backgroundColor="#364ED4" barStyle="light-content" />

          <View style={styles.innerContainer}>
            <ScreenHeader title={t('verifyEmail.title')} showBackButton={true} />

            <View>
              <Text style={styles.subtitle}>{t('verifyEmail.subtitle')}</Text>
              <Text
                style={[
                  styles.subtitle,
                  { color: colorList.GREY[900], fontWeight: '700', marginTop: 4 },
                ]}
              >
                {maskEmail(email)}
              </Text>
            </View>

            <View style={styles.containerOTP}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  style={[
                    styles.input,
                    isOtpInvalid
                      ? styles.invalidInput
                      : digit
                      ? styles.activeInput
                      : styles.inactiveInput,
                  ]}
                  maxLength={1}
                  keyboardType="numeric"
                  ref={(ref) => {
                    if (ref) {
                      inputs.current[index] = ref;
                    }
                  }}
                />
              ))}
            </View>

            <OTPCountdown onResend={handleResendOTP} />

            <PrimaryButton title={t('verifyEmail.button')} onPress={handleButtonVerifyEmail} />
          </View>
        </SafeAreaView>
      </DismissKeyboardWrapper>
    </View>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#364ED4',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colorList.GREY[500],
    textAlign: 'left',
  },
  containerOTP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
    marginTop: 40,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: fontSize['2xl'],
    fontWeight: '700',
  },
  activeInput: {
    borderColor: colorList.BLUE[600],
  },
  inactiveInput: {
    borderColor: colorList.GREY[500],
  },
  invalidInput: {
    borderColor: colorList.RED.solid,
  },
});
