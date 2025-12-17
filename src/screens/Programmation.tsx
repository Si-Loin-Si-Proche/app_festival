import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

// --- IMPORTS ---
import { COLORS, SPACING, FONTS, SIZES } from '../constants/theme';
import { CleanEvent } from '../types/api.types';
import { getFestivalEvents } from '../services/festival.service';
import { useFavorites } from '../hooks/useFavorites';

// --- COMPOSANTS ---
import EventList from '../components/organism/EventList';
import SectionHeader from '../components/molecules/SectionHeader';
import SearchBar from '../components/molecules/SearchBar';
import FilterList from '../components/molecules/FilterList';
import EmptyState from '../components/molecules/EmptyState';
import Typography from '../components/atoms/Typography';

const formatDateForFilter = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

const getEventLocation = (event: CleanEvent): string => {
  return event.dates?.[0]?.placeName || event.placeName || 'Lieu à définir';
};

const getEventPriceCategory = (
  event: CleanEvent
): 'Gratuit' | 'Payant' | 'Sur réservation' => {
  const keywords = (event.tags || [])
    .concat(event.description || '')
    .join(' ')
    .toLowerCase();
  if (keywords.includes('gratuit')) return 'Gratuit';
  if (keywords.includes('réservation') || keywords.includes('reservation'))
    return 'Sur réservation';
  return 'Payant';
};

const isEventToutPublic = (event: CleanEvent): boolean => {
  const keywords = (event.tags || []).join(' ').toLowerCase();
  if (keywords.includes('adulte') || keywords.includes('interdit'))
    return false;
  return true;
};

export default function ProgrammationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isLiked, toggleFavorite } = useFavorites();

  // --- STATE ---
  const [allEvents, setAllEvents] = useState<CleanEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CleanEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDateFilter, setActiveDateFilter] = useState('Tous');
  const [activeLocationFilter, setActiveLocationFilter] = useState('Tous');
  const [activePriceFilter, setActivePriceFilter] = useState('Tous');
  const [onlyToutPublic, setOnlyToutPublic] = useState(false);

  const [showFilters, setShowFilters] = useState(true);

  // --- 1. CHARGEMENT INITIAL ---
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const data = await getFestivalEvents();
        setAllEvents(data);
        setFilteredEvents(data);
        if (params.location) {
          const locationParam = Array.isArray(params.location)
            ? params.location[0]
            : params.location;
          setActiveLocationFilter(locationParam);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, [params.location]);

  const dateOptions = useMemo(() => {
    if (allEvents.length === 0) return ['Tous'];
    const dates = allEvents
      .map((e) =>
        e.dates[0]?.start ? formatDateForFilter(e.dates[0].start) : null
      )
      .filter((d): d is string => !!d);
    return ['Tous', ...Array.from(new Set(dates)).sort()];
  }, [allEvents]);

  const locationOptions = useMemo(() => {
    if (allEvents.length === 0) return ['Tous'];
    const locations = allEvents.map(getEventLocation);
    return ['Tous', ...Array.from(new Set(locations)).sort()];
  }, [allEvents]);

  const priceOptions = ['Tous', 'Payant', 'Gratuit', 'Sur réservation'];

  // --- 3. MOTEUR DE FILTRAGE ---
  useEffect(() => {
    let result = allEvents;

    // A. Recherche Texte
    if (searchQuery.trim().length > 0) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(lowerQuery) ||
          (e.subtitle && e.subtitle.toLowerCase().includes(lowerQuery))
      );
    }

    // B. Filtre Date
    if (activeDateFilter !== 'Tous') {
      result = result.filter((e) => {
        if (!e.dates[0]?.start) return false;
        return formatDateForFilter(e.dates[0].start) === activeDateFilter;
      });
    }

    // C. Filtre Lieu (Scène)
    if (activeLocationFilter !== 'Tous') {
      result = result.filter(
        (e) => getEventLocation(e) === activeLocationFilter
      );
    }

    // D. Filtre Tarif
    if (activePriceFilter !== 'Tous') {
      result = result.filter(
        (e) => getEventPriceCategory(e) === activePriceFilter
      );
    }

    // E. Filtre Tout Public (Checkbox)
    if (onlyToutPublic) {
      result = result.filter((e) => isEventToutPublic(e));
    }

    setFilteredEvents(result);
  }, [
    searchQuery,
    activeDateFilter,
    activeLocationFilter,
    activePriceFilter,
    onlyToutPublic,
    allEvents,
  ]);

  // --- HANDLERS ---
  const handleEventPress = (id: string) => {
    router.push(`/event/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader
        logoSource={require('../assets/logo_ferme_du_buisson.png')}
        useImageTitle={true}
        showFavorite={true}
      />

      <View style={styles.headerContainer}>
        {/* BARRE DE RECHERCHE */}
        <SearchBar
          onChangeText={setSearchQuery}
          onSearch={setSearchQuery}
          placeholder="Rechercher un spectacle..."
        />

        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          style={styles.toggleFiltersBtn}
        >
          <Typography variant="body" style={{ fontWeight: 'bold' }}>
            {showFilters ? 'Masquer les filtres ▲' : 'Afficher les filtres ▼'}
          </Typography>
        </TouchableOpacity>

        {showFilters && (
          <View>
            {/* 1. Dates */}
            <FilterList
              options={dateOptions}
              selected={activeDateFilter}
              onSelect={setActiveDateFilter}
              style={{ marginBottom: SPACING.s }}
            />

            <FilterList
              options={locationOptions}
              selected={activeLocationFilter}
              onSelect={setActiveLocationFilter}
              style={{ marginBottom: SPACING.s }}
            />

            <FilterList
              options={priceOptions}
              selected={activePriceFilter}
              onSelect={setActivePriceFilter}
              style={{ marginBottom: SPACING.s }}
            />

            <View style={styles.switchRow}>
              <Typography variant="body" style={{ flex: 1 }}>
                Spectacles tout public uniquement
              </Typography>
              <Switch
                value={onlyToutPublic}
                onValueChange={setOnlyToutPublic}
                trackColor={{ false: '#767577', true: COLORS.primary }}
                thumbColor={onlyToutPublic ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
              />
            </View>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {!isLoading && filteredEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              message={
                searchQuery
                  ? `Aucun résultat pour "${searchQuery}"`
                  : 'Aucun événement ne correspond à vos filtres.'
              }
              iconName="search"
            />
            {/* Bouton Reset si aucun résultat */}
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setActiveDateFilter('Tous');
                setActiveLocationFilter('Tous');
                setActivePriceFilter('Tous');
                setOnlyToutPublic(false);
              }}
              style={{ marginTop: 20, padding: 10 }}
            >
              <Typography
                variant="body"
                style={{
                  color: COLORS.primary,
                  textDecorationLine: 'underline',
                }}
              >
                Réinitialiser les filtres
              </Typography>
            </TouchableOpacity>
          </View>
        ) : (
          <EventList
            events={filteredEvents}
            isLoading={isLoading}
            onEventPress={handleEventPress}
            isLiked={isLiked}
            onToggleFavorite={toggleFavorite}
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
  headerContainer: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.s,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 10,
  },
  toggleFiltersBtn: {
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginTop: 50,
  },

  lastRowFilters: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  smallFilterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.background,
    marginRight: 8,
    backgroundColor: COLORS.background,
  },
  smallFilterBadgeActive: {
    backgroundColor: COLORS.text,
    borderColor: COLORS.text,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.s,
    marginTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
