import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import Typography from '../components/atoms/Typography';
import PageHeader from '../components/molecules/PageHeader';
import { COLORS } from '../constants/theme';

export default function ProgrammationScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      <PageHeader title="Likes" iconName="favorite" />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.background,
        }}
      >
        <Typography>Ceci est la page programmation.</Typography>
      </View>
    </SafeAreaView>
  );
}
