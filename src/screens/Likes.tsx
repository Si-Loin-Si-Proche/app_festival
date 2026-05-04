import React from 'react';
import { View, StyleSheet, Share, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SPACING } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../hooks/useFavorites';
import EventList from '../components/organism/EventList';
import EmptyState from '../components/molecules/EmptyState';
import SectionHeader from '../components/molecules/SectionHeader';
import Icon from '../components/atoms/Icon';

export default function LikesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { favorites, loading, isLiked, toggleFavorite } = useFavorites();

  const handleEventPress = (id: string) => {
    router.push(`/event/${id}` as any);
  };

  const handleShare = async () => {
    if (favorites.length === 0) return;

    try {
      const header =
        '📅 Ma sélection pour le festival Si Loin, Si Proche :\n\n';
      const body = favorites
        .map((event) => {
          const info =
            event.dates && event.dates.length > 0
              ? ` - ${new Date(event.dates[0].start).toLocaleDateString('fr-FR', { weekday: 'short', hour: '2-digit', minute: '2-digit' })}`
              : '';
          return `• ${event.title}${info}`;
        })
        .join('\n');
      const footer =
        '\n\n🎟 Retrouvez toute la programmation sur https://lafermedubuisson.com';
      const message = header + body + footer;

      await Share.share({
        message: message,
        title: 'Ma sélection Si Loin Si Proche',
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
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
          <>
            <EventList
              events={favorites}
              isLoading={loading}
              onEventPress={handleEventPress}
              isLiked={isLiked}
              onToggleFavorite={toggleFavorite}
            />

            {!loading && favorites.length > 0 && (
              <TouchableOpacity
                style={[
                  styles.fab,
                  {
                    backgroundColor: colors.secondary,
                    borderColor: colors.border,
                  },
                ]}
                onPress={handleShare}
                activeOpacity={0.8}
              >
                <Icon name="share" size={26} color={colors.text} />
              </TouchableOpacity>
            )}
          </>
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
    position: 'relative',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 100,
  },
});
