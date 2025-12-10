
import { View } from 'react-native';
import Typography from '../components/atoms/Typography';

export default function IndexScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, gap: 15 }}>
      
      <Typography variant="h1">
        Festival 2025
      </Typography>

      <Typography variant="h2">
        Programmation
      </Typography>

      <Typography variant="body" style={{ textAlign: 'center' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>

      <Typography variant="quote" style={{ textAlign: 'center' }}>
        du 05 au 10 février 2026
      </Typography>

      <Typography variant="caption">
        test caption
      </Typography>

    </View>
  );
}