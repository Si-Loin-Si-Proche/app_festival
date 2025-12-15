import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../components/atoms/Typography';
import SectionHeader from '../components/molecules/SectionHeader';
import EventCard from '../components/molecules/EventCard';
import { COLORS } from '../constants/theme';
import SectionFooter from '../components/molecules/SectionFooter';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

// Mocks avec les couleurs
const FAKE_EVENTS = [
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
  {
    id: '3',
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
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      {/* Le Header reste fixe en haut */}
      <SectionHeader title="" logoSource={logoImg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        // 1. CORRECTION : On enlève le paddingHorizontal ici !
        // On garde flexGrow pour que le footer puisse descendre si peu de contenu
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* 2. NOUVEAU CONTENEUR : C'est lui qui gère les marges du contenu */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {/* Titre (J'ai enlevé le marginLeft car le parent gère le padding) */}
          <Typography variant="h2" style={{ marginTop: 15, marginBottom: 15 }}>
            Événements à venir
          </Typography>

          {/* Liste des cartes */}
          {FAKE_EVENTS.map((event) => (
            <EventCard
              key={event.id}
              variant="vertical"
              event={event as any}
              backgroundColor={event.color}
              onPress={() => console.log('Clic sur', event.title)}
            />
          ))}
        </View>

        {/* 3. FOOTER : Il est en dehors de la View padding, donc il prend 100% de largeur */}
        <SectionFooter />
      </ScrollView>
    </SafeAreaView>
  );
}
