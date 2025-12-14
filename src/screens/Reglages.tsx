import { ScrollView } from 'react-native';
import Typography from '../components/atoms/Typography';

export default function IndexScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 150,
        gap: 15,
      }}
    >
      <Typography variant="h1">Festival 2026</Typography>

      <Typography variant="h2">Programmation</Typography>

      <Typography variant="body" style={{ textAlign: 'center' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>

      <Typography variant="quote" style={{ textAlign: 'center' }}>
        du 05 au 10 février 2026
      </Typography>

      <Typography variant="caption">test caption</Typography>
    </ScrollView>
  );
}
