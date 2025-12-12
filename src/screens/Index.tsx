import Typography from '../components/atoms/Typography';
import IconComponent from '../components/atoms/Icon';
import Separator from '../components/atoms/Separator';
import Tag from '../components/atoms/Tag';
import { COLORS } from '../constants/theme';
import Loader from '../components/atoms/Loader';
import SectionHeader from '../components/molecules/SectionHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function IndexScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionHeader title="Réglages" logoSource={logoImg} />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
          gap: 15,
        }}
      >
        <IconComponent name={'search'} />

        <Typography variant="h1">Festival 2026</Typography>

        <Typography variant="h2">Programmation</Typography>

        <Typography variant="body" style={{ textAlign: 'center' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>

        <Separator color="#25b0cfff" thickness={2} marginVertical={30} />

        <Typography variant="quote" style={{ textAlign: 'center' }}>
          du 05 au 10 février 2026
        </Typography>

        <Typography variant="caption">test caption</Typography>

        <Tag label="théâtre" iconName="location" backgroundColor={COLORS.tag} />

        <Loader />
      </SafeAreaView>
    </SafeAreaView>
  );
}
