import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { COLORS } from '../constants/theme';
import { CleanEvent } from '../types/api.types';
import { getFestivalEvents } from '../services/festival.service';

import EventList from '../components/organism/EventList';
import SectionHeader from '../components/molecules/SectionHeader';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function ProgrammationScreen() {
  const [events, setEvents] = useState<CleanEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const data = await getFestivalEvents();
        setEvents(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleEventPress = (id: string) => {
    router.push(`/event/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader logoSource={logoImg} title="Programmation" />

      <View style={styles.content}>
        <EventList
          events={events}
          isLoading={isLoading}
          onEventPress={handleEventPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});
