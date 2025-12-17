import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../components/atoms/Typography';
import SectionHeader from '../components/molecules/SectionHeader';
import EventCard from '../components/molecules/EventCard';
import { COLORS, FONTS } from '../constants/theme';
import SectionFooter from '../components/molecules/SectionFooter';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

// --- DONNÉES MOCK ---
const LIVE_EVENTS = [
  {
    id: 'live1',
    title: 'Ateliers de découverte',
    dates: [
      {
        start: '2026-02-06T14:30:00',
        end: '2026-02-06T16:30:00',
        placeName: 'Cinéma',
      },
    ],
  },
  {
    id: 'live2',
    title: 'Cambodge, vue sur courts',
    dates: [
      {
        start: '2026-02-06T17:00:00',
        end: '2026-02-06T19:10:00',
        placeName: 'Théâtre',
      },
    ],
  },
];

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'En famille, vue sur court',
    subtitle: "Courts-métrages d'animation",
    imageUrl:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop',
    description: 'Une sélection de courts métrages...',
    dates: [
      {
        start: '2026-02-06T11:00:00',
        end: '2026-02-06T12:30:00',
        placeName: 'Cinéma',
      },
    ],
    tags: [],
    color: COLORS.secondary,
  },
  {
    id: '2',
    title: 'Dans la cuisine des Nguyen',
    subtitle: 'Stéphane Ly-Cuong',
    imageUrl:
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2670&auto=format&fit=crop',
    description: "Une plongée dans l'histoire...",
    dates: [
      {
        start: '2026-02-06T17:00:00',
        end: '2026-02-06T19:10:00',
        placeName: 'Théâtre',
      },
    ],
    tags: [],
    color: COLORS.secondary,
  },
];

export default function IndexScreen() {
  const [topSectionHeight, setTopSectionHeight] = useState(350);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={['top']}
    >
      {/* 1. HEADER */}
      <SectionHeader
        logoSource={logoImg}
        useImageTitle={true}
        showFavorite={true}
        style={{ backgroundColor: COLORS.background, zIndex: 100 }}
      />

      <View style={{ flex: 1, position: 'relative' }}>
        {/* 2. ARRIÈRE PLAN FIXE (Fond Rose) */}
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

            {LIVE_EVENTS.map((event) => (
              <EventCard
                key={event.id}
                event={event as any}
                variant="compact"
                onPress={() => console.log('Clic event en cours')}
              />
            ))}
          </View>
        </View>

        {/* 3. SCROLLVIEW */}
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

          {/* LA FEUILLE BLANCHE */}
          <View style={styles.bottomSheet}>
            <Typography variant="h2" style={{ marginTop: 0, marginBottom: 20 }}>
              Événements à venir
            </Typography>

            {UPCOMING_EVENTS.map((event) => (
              <EventCard
                key={event.id}
                variant="vertical"
                event={event as any}
                backgroundColor={event.color}
                onPress={() => console.log('Clic sur', event.title)}
              />
            ))}

            <View
              style={{
                marginHorizontal: -22, // -20 pour le padding + -2 pour la bordure parent
                marginBottom: -20, // Pour coller tout en bas malgré le paddingBottom du parent
                marginTop: 20, // Un peu d'espace avant le footer
                zIndex: 1, // S'assure qu'il est au dessus si besoin
              }}
            >
              <SectionFooter />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.background, // Blanc
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,

    // Bordure
    borderWidth: 2,
    borderColor: COLORS.text,
    borderBottomWidth: 0, // Pas de bordure en bas pour laisser le footer couler

    // Le padding qui nous embêtait pour le footer, mais qui est utile pour le reste
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20, // Padding bas

    minHeight: 500,
    marginTop: -20,

    // Important : si tu mets overflow hidden, le footer sera coupé s'il dépasse trop
    // Ici on laisse visible ou on gère bien les marges
    overflow: 'hidden',
  },
});
