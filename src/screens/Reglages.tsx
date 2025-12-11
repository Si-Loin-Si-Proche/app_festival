import { View } from 'react-native';
import Typography from '../components/atoms/Typography';
import SearchBar from '../components/molecule/SearchBar';
import FilterList from '../components/molecule/FilterList';

export default function ReglageScreen() {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 200,
        gap: 15,
      }}
    >
      <Typography variant="h1">Festival 2026</Typography>

      <SearchBar onSearch={(query) => console.log('Recherche:', query)} />

      <FilterList
        options={[
          'Tous',
          '05.02.25',
          '06.02.25',
          '07.02.25',
          '08.02.25',
          '09.02.25',
        ]}
        onSelect={(selected) => console.log('Filtre sélectionné:', selected)}
      />

      {/* const handleFilterSelect = (filter: string) => {
      console.log('Filtre sélectionné :', filter);
      // Ici tu filtreras ta liste d'événements plus tard
      }; */}
    </View>
  );
}
