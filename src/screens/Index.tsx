import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// --- IMPORTS ---
import Typography from '../components/atoms/Typography';
import SectionHeader from '../components/molecules/SectionHeader';
import EventCard from '../components/molecules/EventCard';
import SectionFooter from '../components/molecules/SectionFooter';
import { COLORS, FONTS } from '../constants/theme';

// --- SERVICES & TYPES ---
import { getFestivalEvents } from '../services/festival.service';
import { CleanEvent } from '../types/api.types';
import { useFavorites } from '../hooks/useFavorites';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function IndexScreen() {
  const router = useRouter();
  const [topSectionHeight, setTopSectionHeight] = useState(350);

  // 1. STATE & HOOKS
  const { isLiked, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);

  const [liveEvents, setLiveEvents] = useState<CleanEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CleanEvent[]>([]);

  // 2. LOGIQUE TEMPORELLE ⏳
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEvents = await getFestivalEvents();
        const now = new Date(); // L'heure actuelle

        // --- FILTRE : EN COURS (LIVE) ---
        // Un event est "En cours" si Maintenant est entre le Début et la Fin
        const live = allEvents.filter((event) => {
          if (!event.dates || event.dates.length === 0) return false;
          // On vérifie la première date (ou tu peux boucler sur toutes les dates si c'est multi-dates)
          const start = new Date(event.dates[0].start);
          const end = new Date(event.dates[0].end);
          return now >= start && now <= end;
        });

        // --- FILTRE : À VENIR ---
        // Un event est "À venir" si son Début est dans le futur
        const upcoming = allEvents.filter((event) => {
          if (!event.dates || event.dates.length === 0) return false;
          const start = new Date(event.dates[0].start);
          return start > now;
        });

        // TRI : Du plus proche au plus lointain
        upcoming.sort((a, b) => {
          const dateA = new Date(a.dates[0].start);
          const dateB = new Date(b.dates[0].start);
          return dateA.getTime() - dateB.getTime();
        });

        setLiveEvents(live);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error('Erreur home', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePress = (id: string) => {
    router.push(`/event/${id}` as any);
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: COLORS.secondary }]}>
        <ActivityIndicator size="large" color={COLORS.text} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={['top']}
    >
      <SectionHeader
        logoSource={logoImg}
        useImageTitle={true}
        showFavorite={true}
        style={{ backgroundColor: COLORS.background, zIndex: 100 }}
      />

      <View style={{ flex: 1, position: 'relative' }}>
        {/* --- ZONE DU HAUT (ROSE - EN CE MOMENT) --- */}
        <View style={styles.fixedBackgroundLayer}>
          <View
            style={styles.contentMeasurer}
            onLayout={(event) =>
              setTopSectionHeight(event.nativeEvent.layout.height)
            }
          >
            <Typography variant="h3" style={styles.introText}>
              Bienvenue au festival des cinémas du Cambodge, Laos et Vietnam
            </Typography>

            <Typography variant="h2" style={{ marginBottom: 15 }}>
              En ce moment...
            </Typography>

            {/* LOGIQUE D'AFFICHAGE LIVE */}
            {liveEvents.length > 0 ? (
              liveEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="compact"
                  onPress={() => handlePress(event.id)}
                  isFavorite={isLiked(event.id)}
                  onToggle={() => toggleFavorite(event)}
                />
              ))
            ) : (
              // 👈 TEXTE SI VIDE
              <View style={styles.emptyStateBox}>
                <Typography variant="body" style={{ fontStyle: 'italic' }}>
                  Pas d'événement en cours actuellement.
                </Typography>
              </View>
            )}
          </View>
        </View>

        {/* --- SCROLLVIEW (BLANC - À VENIR) --- */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          scrollEventThrottle={16}
        >
          {/* ESPACEUR TRANSPARENT */}
          <View
            style={{ height: topSectionHeight, backgroundColor: 'transparent' }}
          />

          {/* --- FEUILLE BLANCHE --- */}
          <View style={styles.bottomSheet}>
            <Typography variant="h2" style={{ marginTop: 0, marginBottom: 20 }}>
              Événements à venir
            </Typography>

            {/* LOGIQUE D'AFFICHAGE À VENIR */}
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  variant="vertical"
                  event={event}
                  backgroundColor={
                    index % 2 === 0 ? COLORS.secondary : COLORS.card
                  }
                  onPress={() => handlePress(event.id)}
                  isFavorite={isLiked(event.id)}
                  onToggle={() => toggleFavorite(event)}
                />
              ))
            ) : (
              // 👈 TEXTE SI VIDE
              <View style={styles.emptyStateBox}>
                <Typography
                  variant="body"
                  style={{ textAlign: 'center', marginTop: 20 }}
                >
                  Les événements sont tous passés, à l'année prochaine ;)
                </Typography>
              </View>
            )}

            <View style={styles.footerContainer}>
              <SectionFooter />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedBackgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.secondary,
    zIndex: 0,
  },
  contentMeasurer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  introText: {
    marginBottom: 20,
    lineHeight: 24,
    fontFamily: FONTS.bold,
  },
  bottomSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.text,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    minHeight: 500,
    marginTop: -20,
    overflow: 'hidden',
  },
  footerContainer: {
    marginHorizontal: -22,
    marginBottom: -20,
    marginTop: 20,
    zIndex: 1,
  },
  emptyStateBox: {
    padding: 10,
    opacity: 0.7,
  },
});
