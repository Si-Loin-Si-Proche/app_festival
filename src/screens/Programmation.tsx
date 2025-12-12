import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// --- IMPORTS ---
import { COLORS, SPACING } from '../constants/theme';
import { CleanEvent } from '../types/api.types';
import { getFestivalEvents } from '../services/festival.service';

// --- COMPOSANTS ---
import EventList from '../components/organism/EventList';
import SectionHeader from '../components/molecules/SectionHeader';
import SearchBar from '../components/molecules/SearchBar';
import FilterList from '../components/molecules/FilterList';
import EmptyState from '../components/molecules/EmptyState';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

// Helper pour formater la date au format filtre (ex: 05.02.25)
const formatDateForFilter = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

export default function ProgrammationScreen() {
  // 1. STATE
  const [allEvents, setAllEvents] = useState<CleanEvent[]>([]); // Source de vérité
  const [filteredEvents, setFilteredEvents] = useState<CleanEvent[]>([]); // Liste affichée
  const [isLoading, setIsLoading] = useState(true);

  // Filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDateFilter, setActiveDateFilter] = useState('Tous');

  const router = useRouter();

  // 2. CHARGEMENT DES DONNÉES
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const data = await getFestivalEvents();
        setAllEvents(data);
        setFilteredEvents(data); // Au début, on affiche tout
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  // 3. GÉNÉRATION DYNAMIQUE DES DATES DE FILTRE
  const filterOptions = useMemo(() => {
    if (allEvents.length === 0) return ['Tous'];

    // On extrait toutes les dates de début
    const dates = allEvents
      .map((e) =>
        e.dates[0]?.start ? formatDateForFilter(e.dates[0].start) : null
      )
      .filter((d): d is string => !!d); // On enlève les nulls

    // On dédoublonne avec Set et on trie
    const uniqueDates = Array.from(new Set(dates)).sort();

    return ['Tous', ...uniqueDates];
  }, [allEvents]);

  // 4. MOTEUR DE RECHERCHE & FILTRAGE
  useEffect(() => {
    // Pas besoin de vérifier allEvents.length ici, le filter gérera le tableau vide
    let result = allEvents;

    // A. Filtrage par Recherche
    if (searchQuery.trim().length > 0) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(lowerQuery) ||
          (e.subtitle && e.subtitle.toLowerCase().includes(lowerQuery))
      );
    }

    // B. Filtrage par Date
    if (activeDateFilter !== 'Tous') {
      result = result.filter((e) => {
        if (!e.dates[0]?.start) return false;
        return formatDateForFilter(e.dates[0].start) === activeDateFilter;
      });
    }

    setFilteredEvents(result);
  }, [searchQuery, activeDateFilter, allEvents]);

  // 5. HANDLERS
  const handleEventPress = (id: string) => {
    router.push(`/event/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader logoSource={logoImg} title="Programmation" />

      {/* ZONE DE RECHERCHE & FILTRES */}
      <View style={styles.filtersContainer}>
        <SearchBar
          onChangeText={(text) => setSearchQuery(text)}
          onSearch={(text) => setSearchQuery(text)}
          placeholder="Rechercher un spectacle..."
        />

        <FilterList
          options={filterOptions}
          onSelect={(selected) => setActiveDateFilter(selected)}
        />
      </View>

      <View style={styles.content}>
        {/* CAS LISTE VIDE APRES RECHERCHE */}
        {!isLoading && filteredEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              message={
                searchQuery
                  ? `Aucun résultat pour "${searchQuery}"`
                  : 'Aucun événement pour cette date.'
              }
              iconName="search"
            />
          </View>
        ) : (
          /* LISTE DES ÉVÉNEMENTS */
          <EventList
            events={filteredEvents}
            isLoading={isLoading}
            onEventPress={handleEventPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filtersContainer: {
    marginTop: SPACING.m,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
});
