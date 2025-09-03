import {Image, View, Pressable, StyleSheet, Text} from 'react-native';
import {colorList} from '../../../utils/colors';
import {fontSize} from '../../../utils/fontSize';
import {TokenProp} from './AddTokenScreen';

interface SearchTabContentProp {
  selectedTokens: TokenProp[];
  setSelectedTokens: (token: TokenProp[]) => void;
}

const SearchTabContent: React.FC<SearchTabContentProp> = ({
  selectedTokens,
  setSelectedTokens,
}) => {
  const tokens = [
    {
      name: 'Polygon',
      symbol: 'POL',
      icon: require('../../../assets/icons/pol.png'),
    },
    {
      name: 'XRUN',
      symbol: 'XRUN',
      icon: require('../../../assets/icons/xrun.png'),
    },
  ];

  const toggleTokens = (token: TokenProp) => {
    const exists = selectedTokens.find(item => item.symbol === token.symbol);
    if (exists) {
      setSelectedTokens(
        selectedTokens.filter(item => item.symbol !== token.symbol),
      );
    } else {
      setSelectedTokens([...selectedTokens, token]);
    }
  };

  return (
    <View style={styles.containerTokens}>
      {tokens.map(token => {
        const isActive = selectedTokens.some(
          item => item.symbol === token.symbol,
        );

        return (
          <Pressable
            key={token.name}
            style={styles.containerToken}
            onPress={() => toggleTokens(token)}>
            <Image source={token.icon} style={{height: 19}} />
            <Text
              style={[
                styles.textSymbol,
                isActive && {color: colorList.BLUE[600]},
              ]}>
              {token.symbol}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SearchTabContent;

const styles = StyleSheet.create({
  containerTokens: {
    gap: 21,
  },
  containerToken: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  textSymbol: {
    fontSize: fontSize.base,
    color: colorList.BLACK.solid,
  },
});
