import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';

// --- IMPORTS ---
import { COLORS, SPACING } from '../constants/theme';
import { CleanEvent } from '../types/api.types';
import { LikeService } from '../services/like.service';

// --- COMPOSANTS ---
import PageHeader from '../components/molecules/PageHeader';
import EventList from '../components/organism/EventList';
import EmptyState from '../components/molecules/EmptyState';

export default function LikesScreen() {
  const [favorites, setFavorites] = useState<CleanEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        setIsLoading(true);
        const data = await LikeService.getFavorites();
        setFavorites(data);
        setIsLoading(false);
      };

      loadFavorites();
    }, [])
  );

  const handleEventPress = (id: string) => {
    router.push(`/event/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader title="Mes Favoris" iconName="favorite" />

      <View style={styles.content}>
        {!isLoading && favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              message="Vous n'avez pas encore ajouté de favoris."
              iconName="favorite"
            />
          </View>
        ) : (
          <EventList
            events={favorites}
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
    backgroundColor: COLORS.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
});
