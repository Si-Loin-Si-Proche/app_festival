import { View } from 'react-native';
import Typography from '../components/atoms/Typography';
import SearchBar from '../components/molecule/SearchBar';
import FilterList from '../components/molecule/FilterList';
import EmptyState from '../components/molecule/EmptyState';
import { useState } from 'react';

export default function ReglageScreen() {
  const [hasResults, setHasResults] = useState(true);

  const handleSearch = (query: string) => {
    console.log('Recherche pour :', query);

    if (query.trim().toLowerCase() === 'rien') {
      setHasResults(false);
    } else {
      setHasResults(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 15,
      }}
    >
      <Typography variant="h1">Festival 2026</Typography>

      <SearchBar onSearch={handleSearch} />

      <View style={{ height: 50, width: '100%' }}>
        <FilterList
          options={[
            'Tous',
            '05.02.25',
            '06.02.25',
            '07.02.25',
            '08.02.25',
            '09.02.25',
          ]}
          onSelect={(selected) => console.log('Filtre:', selected)}
        />
      </View>

      {/* LOGIQUE D'AFFICHAGE */}
      {hasResults ? (
        <View style={{ width: '100%', marginTop: 20 }}>
          <Typography variant="h2">Résultats :</Typography>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
          <EmptyState
            message="Oups, nous n'avons rien trouvé."
            iconName="search"
          />
        </View>
      )}
    </View>
  );
}
