import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import Typography from '../components/atoms/Typography';
import EventCard from '../components/molecules/EventCard';
import { CleanEvent } from '../types/api.types';

// --- DONNÉES DE TEST ---

const EVENT_FULL: CleanEvent = {
  id: '1',
  title: 'Concert Nocturne',
  subtitle: 'Orchestre National de Jazz',
  description: '<p>Une soirée inoubliable sous les étoiles.</p>',
  imageUrl:
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  tags: ['Musique', 'Jazz'],
  dates: [
    {
      start: '2026-06-24T20:30:00',
      end: '2026-06-24T22:00:00',
      placeName: 'La Ferme du Buisson',
    },
  ],
  price: 'Gratuit',
};

const EVENT_MINIMAL: CleanEvent = {
  id: '2',
  title: 'Atelier Cuisine',
  description: '<p>Apprenez à cuisiner.</p>',
  imageUrl: undefined, // Pas d'image (test du placeholder)
  tags: [],
  dates: [
    {
      start: '2026-06-25T14:00:00',
      end: '2026-06-25T16:00:00',
      placeName: 'Caravane',
    },
  ],
};

export default function InfosScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Typography variant="h1" color={COLORS.secondary}>
          Test Molécules
        </Typography>
      </View>

      {/* TEST 1 : CARTE COMPLÈTE */}
      <View style={styles.section}>
        <Typography variant="h2" style={styles.sectionTitle}>
          1. EventCard (Complet)
        </Typography>

        <EventCard
          event={EVENT_FULL}
          onPress={() => Alert.alert('Click', 'Ouverture du concert')}
        />
      </View>

      {/* TEST 2 : CARTE MINIMALISTE */}
      <View style={styles.section}>
        <Typography variant="h2" style={styles.sectionTitle}>
          2. EventCard (Minimal)
        </Typography>

        <EventCard
          event={EVENT_MINIMAL}
          onPress={() => Alert.alert('Click', "Ouverture de l'atelier")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.m,
    paddingTop: 60,
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.m,
    fontSize: 18,
    color: COLORS.text,
  },
});
