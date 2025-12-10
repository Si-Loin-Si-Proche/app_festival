import { Text, View } from 'react-native';
import IconComponent from '../components/atoms/Icon';

export default function IndexScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenue! Ceci est la home page principale.</Text>
      <IconComponent name={'search'} />
    </View>
  );
}
