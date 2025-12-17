import React from 'react'; // Plus besoin de useState, useCallback, useFocusEffect ici !
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// --- IMPORTS ---
import { COLORS, SPACING } from '../constants/theme';
import { useFavorites } from '../hooks/useFavorites';

// --- COMPOSANTS ---
import EventList from '../components/organism/EventList';
import EmptyState from '../components/molecules/EmptyState';
import SectionHeader from '../components/molecules/SectionHeader';

export default function LikesScreen() {
  const router = useRouter();

  const { favorites, loading, isLiked, toggleFavorite } = useFavorites();

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

      <View style={styles.content}>
        {!loading && favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyState
              message="Vous n'avez pas encore ajouté de favoris."
              iconName="favorite"
            />
          </View>
        ) : (
          <EventList
            events={favorites}
            isLoading={loading}
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
