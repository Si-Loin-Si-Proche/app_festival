import { View } from 'react-native';
import Typography from '../components/atoms/Typography';
import PageHeader from '../components/molecules/PageHeader';

export default function ProgrammationScreen() {
  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="Likes" iconName="favorite" />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Ceci est la page programmation.</Typography>
      </View>
    </View>
  );
}
