import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import SignUpSuccessScreen from '../screens/SignUpSuccessScreen';
import Toast from 'react-native-toast-message';
import DetailTokenScreen from '../screens/DetailTokenScreen/DetailTokenScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen/TransactionDetailScreen.';
import SendingConfirmScreen from '../screens/SendingScreen/SendingConfirmScreen';
import ReceiveScreen from '../screens/ReceiveScreen/ReceiveScreen';
import SendingScreen from '../screens/SendingScreen/SendingScreen';
import ScanScreen from '../screens/SendingScreen/ScanScreen';
import SendingCompleteScreen from '../screens/SendingScreen/SendingCompleteScreen';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  VerifyEmail: {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
  };
  SignUpSuccess: undefined;
  Home: undefined;
  DetailToken: {
    currID: string;
    symbol: string;
    name: string;
    icon: any;
    bgColor: string;
  };
  TransactionDetail: {
    txHash: string;
    timestamp: number;
    symbol: string;
  };
  Sending: {
    symbol: string;
    fromAddress: string;
    name: string;
    icon: any;
    contractAddress: string;
  };
  SendingConfirm: {
    symbol: string;
    name: string;
    fromAddress: string;
    toAddress: string;
    amount: string;
    icon: any;
    contractAddress: string;
  };
  SendingComplete: {
    toAddress: string;
    amount: string;
    networkFee: string;
    txHash: string;
  };
  Scan: {onScanned: (val: string) => void};
  Receive: {
    publicAddress: string;
  };
};

const pCeBHWST = createNativeStackNavigator<RootStackParamList>();

const jHLhJpKU = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="SignUpSuccess" component={SignUpSuccessScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DetailToken" component={DetailTokenScreen} />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetailScreen}
          />
          <Stack.Screen name="Sending" component={SendingScreen} />
          <Stack.Screen
            name="SendingConfirm"
            component={SendingConfirmScreen}
          />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="Receive" component={ReceiveScreen} />
          <Stack.Screen
            name="SendingComplete"
            component={SendingCompleteScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default AppNavigator;
