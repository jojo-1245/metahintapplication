import {View} from 'react-native';
import {useState} from 'react';
import CustomInputConfirm from '../../../components/CustomInputConfirm';

interface ConfirmContentProp {
  address: string;
}

const IeouIHYp: React.FC<ConfirmContentProp> = ({address}) => {
  const [tokenName, setTokenName] = useState<string>('Metahint');
  const [tokenSymbol, setTokenSymbol] = useState<string>('HNT');
  const [digits, setDigits] = useState<string>('369');

  return (
    <View>
      <CustomInputConfirm
        type="contract"
        value={address}
        onChangeText={() => console.log('Without Value!')}
        placeholder="Contract Address"
        placeholderTextColor="#aaa"
        label="Contract Address"
        isInput={false}
      />
      <CustomInputConfirm
        type="name"
        value={tokenName}
        onChangeText={setTokenName}
        placeholder="Token Name"
        placeholderTextColor="#aaa"
        label="Token Name"
        isInput={false}
      />
      <CustomInputConfirm
        type="name"
        value={tokenSymbol}
        onChangeText={setTokenSymbol}
        placeholder="Token Symbol"
        placeholderTextColor="#aaa"
        label="Token Symbol"
        isInput={false}
      />
      <CustomInputConfirm
        type="number"
        value={digits}
        onChangeText={setDigits}
        placeholder="Digits"
        placeholderTextColor="#aaa"
        label="Digits"
        isInput={false}
      />
    </View>
  );
};

export default ConfirmContent;
