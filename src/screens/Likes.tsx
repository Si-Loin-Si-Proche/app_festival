import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SPACING } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../hooks/useFavorites';
import EventList from '../components/organism/EventList';
import EmptyState from '../components/molecules/EmptyState';
import SectionHeader from '../components/molecules/SectionHeader';

export default function LikesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { favorites, loading, isLiked, toggleFavorite } = useFavorites();

  const handleEventPress = (id: string) => {
    router.push(`/event/${id}` as any);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <SectionHeader
        showBackButton={true}
        useImageTitle={true}
        showFavorite={false}
      />

      <View style={[styles.content, { backgroundColor: colors.background }]}>
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
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
});
