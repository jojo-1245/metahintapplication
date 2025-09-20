import {View} from 'react-native';
import CustomInput from '../../../components/CustomInput';

interface ContractTabContentProp {
  address: string;
  setAddress: (text: string) => void;
}

const igpUoOQo: React.FC<ContractTabContentProp> = ({
  address,
  setAddress,
}) => {
  return (
    <View>
      <CustomInput
        type="contract"
        value={address}
        onChangeText={setAddress}
        placeholder="Contract Address"
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default ContractTabContent;
