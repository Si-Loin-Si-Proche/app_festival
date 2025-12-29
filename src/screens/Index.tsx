import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Typography from '../components/atoms/Typography';
import SectionHeader from '../components/molecules/SectionHeader';
import EventCard from '../components/molecules/EventCard';
import SectionFooter from '../components/molecules/SectionFooter';
import { FONTS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { getFestivalEvents } from '../services/festival.service';
import { CleanEvent } from '../types/api.types';
import { useFavorites } from '../hooks/useFavorites';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function IndexScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [topSectionHeight, setTopSectionHeight] = useState(350);

  const { isLiked, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);

  const [liveEvents, setLiveEvents] = useState<CleanEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CleanEvent[]>([]);

  useEffect(() => {
    const processData = (events: CleanEvent[]) => {
      const now = new Date();

      const live = events.filter((event) => {
        if (!event.dates || event.dates.length === 0) return false;
        const start = new Date(event.dates[0].start);
        const end = new Date(event.dates[0].end);
        return now >= start && now <= end;
      });

      const upcoming = events.filter((event) => {
        if (!event.dates || event.dates.length === 0) return false;
        const start = new Date(event.dates[0].start);
        return start > now;
      });

      upcoming.sort((a, b) => {
        const dateA = new Date(a.dates[0].start);
        const dateB = new Date(b.dates[0].start);
        return dateA.getTime() - dateB.getTime();
      });

      setLiveEvents(live);
      setUpcomingEvents(upcoming);
    };

    const fetchData = async () => {
      try {
        const data = await getFestivalEvents((newData) => {
          console.log("⚡️ Mise à jour de l'accueil via le réseau");
          processData(newData);
        });
        processData(data);
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
      <View style={[styles.center, { backgroundColor: colors.secondary }]}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top']}
    >
      <SectionHeader
        logoSource={logoImg}
        useImageTitle={true}
        showFavorite={true}
        style={{ backgroundColor: colors.background, zIndex: 100 }}
      />

      <View style={{ flex: 1, position: 'relative' }}>
        <View
          style={[
            styles.fixedBackgroundLayer,
            { backgroundColor: colors.secondary },
          ]}
        >
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
              <View style={styles.emptyStateBox}>
                <Typography variant="body" style={{ fontStyle: 'italic' }}>
                  Pas d'événement en cours actuellement.
                </Typography>
              </View>
            )}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          scrollEventThrottle={16}
        >
          <View
            style={{ height: topSectionHeight, backgroundColor: 'transparent' }}
          />

          <View
            style={[
              styles.bottomSheet,
              {
                backgroundColor: colors.background,
                borderColor: colors.text,
              },
            ]}
          >
            <Typography variant="h2" style={{ marginTop: 0, marginBottom: 20 }}>
              Événements à venir
            </Typography>

            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  variant="vertical"
                  event={event}
                  backgroundColor={
                    index % 2 === 0 ? colors.secondary : colors.card
                  }
                  onPress={() => handlePress(event.id)}
                  isFavorite={isLiked(event.id)}
                  onToggle={() => toggleFavorite(event)}
                />
              ))
            ) : (
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 2,
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
