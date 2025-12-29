import React, { useMemo } from 'react';
import { View, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import { CleanEvent } from '../../types/api.types';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import EventCard from '../molecules/EventCard';
import Typography from '../atoms/Typography';
import EmptyState from '../molecules/EmptyState';

interface EventListProps {
  events: CleanEvent[];
  isLoading?: boolean;
  onEventPress: (eventId: string) => void;
  isLiked: (id: string) => boolean;
  onToggleFavorite: (event: CleanEvent) => void;
  ListHeaderComponent?: React.ReactElement;
}

export default function EventList({
  events,
  isLoading,
  onEventPress,
  isLiked,
  onToggleFavorite,
  ListHeaderComponent,
}: EventListProps) {
  const { colors } = useTheme();

  const sections = useMemo(() => {
    if (!events.length) return [];

    const groups = events.reduce(
      (acc, event) => {
        const dateStr = event.dates[0]?.start;
        if (!dateStr) return acc;

        const dateObj = new Date(dateStr);
        const dayLabel = dateObj
          .toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
          })
          .replace(/^\w/, (c) => c.toUpperCase());

        if (!acc[dayLabel]) {
          acc[dayLabel] = [];
        }
        acc[dayLabel].push(event);
        return acc;
      },
      {} as Record<string, CleanEvent[]>
    );

    return Object.keys(groups).map((title) => ({
      title,
      data: groups[title],
    }));
  }, [events]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && events.length === 0) {
    return (
      <View style={styles.center}>
        <EmptyState message={"Pas d'évènement a afficher"} />
      </View>
    );
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={ListHeaderComponent}
      initialNumToRender={6}
      windowSize={5}
      maxToRenderPerBatch={5}
      removeClippedSubviews={true}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Typography
            variant="h2"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            {title}
          </Typography>
        </View>
      )}
      renderItem={({ item }) => (
        <EventCard
          event={item}
          onPress={() => onEventPress(item.id)}
          isFavorite={isLiked(item.id)}
          onToggle={() => onToggleFavorite(item)}
        />
      )}
      SectionSeparatorComponent={() => <View style={{ height: SPACING.s }} />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: SPACING.m,
    paddingBottom: 100,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  sectionHeader: {
    marginTop: SPACING.m,
    marginBottom: SPACING.s,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
  },
});
