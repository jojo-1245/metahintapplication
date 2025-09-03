/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import PrimaryButton from '../components/PrimaryButton';
import { fontSize } from '../utils/fontSize';
import { useTranslation } from 'react-i18next';

type SignUpSuccessScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUpSuccess'
>;

const SignUpSuccessScreen = () => {
  const navigation = useNavigation<SignUpSuccessScreenNavigationProp>();
  const { t } = useTranslation();

  const handleButtonSignUpSuccess = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: 'white' }} />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <View style={styles.innerContainer}>
          <Image source={require('../assets/images/card-verified.png')} style={styles.image} />
          <Text style={styles.title}>{t('signUpSuccess.title')}</Text>
          <Text style={styles.subtitle}>{t('signUpSuccess.subtitle')}</Text>

          <PrimaryButton title={t('signUpSuccess.button')} onPress={handleButtonSignUpSuccess} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUpSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#364ED4',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  image: {
    height: 197,
    width: 200,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
    marginTop: 40,
  },
  subtitle: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: '#9EA3AE',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 40,
  },
});
