import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { SPACING } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { CleanEvent } from '../types/api.types';
import { getFestivalEvents } from '../services/festival.service';
import { useFavorites } from '../hooks/useFavorites';

import EventList from '../components/organism/EventList';
import SectionHeader from '../components/molecules/SectionHeader';
import SearchBar from '../components/molecules/SearchBar';
import FilterList from '../components/molecules/FilterList';
import EmptyState from '../components/molecules/EmptyState';
import Typography from '../components/atoms/Typography';
import Switch from '../components/atoms/Switch';
import { useAppHaptics } from '../hooks/useAppHaptics';

const formatDateForFilter = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
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
  const { colors } = useTheme();
  const { isLiked, toggleFavorite } = useFavorites();
  const { medium } = useAppHaptics();

  const [allEvents, setAllEvents] = useState<CleanEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CleanEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDateFilter, setActiveDateFilter] = useState('Tous');
  const [activeLocationFilter, setActiveLocationFilter] = useState('Tous');
  const [activePriceFilter, setActivePriceFilter] = useState('Tous');
  const [activeGenreFilter, setActiveGenreFilter] = useState('Tous');
  const [onlyToutPublic, setOnlyToutPublic] = useState(false);

  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const data = await getFestivalEvents((newData) => {
          setAllEvents(newData);
        });
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

  const genreOptions = useMemo(() => {
    if (allEvents.length === 0) return ['Tous'];
    const allTags = allEvents.flatMap((e) => e.tags || []);
    return ['Tous', ...Array.from(new Set(allTags)).sort()];
  }, [allEvents]);

  const priceOptions = ['Tous', 'Payant', 'Gratuit', 'Sur réservation'];

  useEffect(() => {
    let result = allEvents;

    if (searchQuery.trim().length > 0) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(lowerQuery) ||
          (e.subtitle && e.subtitle.toLowerCase().includes(lowerQuery))
      );
    }

    if (activeDateFilter !== 'Tous') {
      result = result.filter((e) => {
        if (!e.dates[0]?.start) return false;
        return formatDateForFilter(e.dates[0].start) === activeDateFilter;
      });
    }

    if (activeLocationFilter !== 'Tous') {
      result = result.filter(
        (e) => getEventLocation(e) === activeLocationFilter
      );
    }

    if (activeGenreFilter !== 'Tous') {
      result = result.filter(
        (e) => e.tags && e.tags.includes(activeGenreFilter)
      );
    }

    if (activePriceFilter !== 'Tous') {
      result = result.filter(
        (e) => getEventPriceCategory(e) === activePriceFilter
      );
    }

    if (onlyToutPublic) {
      result = result.filter((e) => isEventToutPublic(e));
    }

    setFilteredEvents(result);
  }, [
    searchQuery,
    activeDateFilter,
    activeLocationFilter,
    activePriceFilter,
    activeGenreFilter,
    onlyToutPublic,
    allEvents,
  ]);

  const handleEventPress = (id: string) => {
    medium();
    router.push(`/event/${id}` as any);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveDateFilter('Tous');
    setActiveLocationFilter('Tous');
    setActivePriceFilter('Tous');
    setActiveGenreFilter('Tous');
    setOnlyToutPublic(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <SectionHeader
        logoSource={require('../assets/logo_ferme_du_buisson.png')}
        useImageTitle={true}
        showFavorite={true}
      />

      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <SearchBar
          onChangeText={setSearchQuery}
          onSearch={setSearchQuery}
          placeholder="Rechercher un spectacle..."
        />

        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          style={styles.toggleFiltersBtn}
        >
          <Typography
            variant="body"
            style={{ fontWeight: 'bold', color: colors.text }}
          >
            {showFilters ? 'Masquer les filtres ▲' : 'Afficher les filtres ▼'}
          </Typography>
        </TouchableOpacity>

        {showFilters && (
          <View>
            <View style={{ gap: SPACING.m }}>
              <View>
                <Typography
                  variant="caption"
                  style={{ color: colors.text, opacity: 0.7 }}
                >
                  Dates
                </Typography>
                <FilterList
                  options={dateOptions}
                  selected={activeDateFilter}
                  onSelect={setActiveDateFilter}
                />
              </View>

              <View>
                <Typography
                  variant="caption"
                  style={{ color: colors.text, opacity: 0.7 }}
                >
                  Lieux
                </Typography>
                <FilterList
                  options={locationOptions}
                  selected={activeLocationFilter}
                  onSelect={setActiveLocationFilter}
                />
              </View>

              <View>
                <Typography
                  variant="caption"
                  style={{ color: colors.text, opacity: 0.7 }}
                >
                  Genres
                </Typography>
                <FilterList
                  options={genreOptions}
                  selected={activeGenreFilter}
                  onSelect={setActiveGenreFilter}
                />
              </View>

              <View>
                <Typography
                  variant="caption"
                  style={{ color: colors.text, opacity: 0.7 }}
                >
                  Tarifs
                </Typography>
                <FilterList
                  options={priceOptions}
                  selected={activePriceFilter}
                  onSelect={setActivePriceFilter}
                />
              </View>
            </View>

            {/* ----- A réactiver quand on aura récup le tag "tout public" de l'api -----
            <View style={[styles.switchRow, { borderTopColor: colors.border }]}>
              <Typography
                variant="body"
                style={{ flex: 1, color: colors.text }}
              >
                Spectacles tout public uniquement
              </Typography>
              <Switch
                value={onlyToutPublic}
                onValueChange={setOnlyToutPublic}
              />
            </View>
             */}
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
            <TouchableOpacity
              onPress={resetFilters}
              style={{ marginTop: 20, padding: 10 }}
            >
              <Typography
                variant="body"
                style={{
                  color: colors.primary,
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
  },
  headerContainer: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.s,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  toggleFiltersBtn: {
    alignItems: 'flex-end',
    marginBottom: SPACING.s,
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.s,
    marginTop: SPACING.s,
    borderTopWidth: 1,
  },
});
