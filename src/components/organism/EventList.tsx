import React, { useMemo } from 'react';
import { View, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import { CleanEvent } from '../../types/api.types';
import { COLORS, SPACING } from '../../constants/theme';
import EventCard from '../molecules/EventCard';
import Typography from '../atoms/Typography';
import EmptyState from '../molecules/EmptyState';

interface EventListProps {
  events: CleanEvent[];
  isLoading?: boolean;
  onEventPress: (eventId: string) => void;
  ListHeaderComponent?: React.ReactElement;
}

export default function EventList({
  events,
  isLoading,
  onEventPress,
  ListHeaderComponent,
}: EventListProps) {
  // Logique de regroupement par date
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

  // Gestion du chargement
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Gestion liste vide
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
      // HEADER
      ListHeaderComponent={ListHeaderComponent}
      // SECTION HEADER
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Typography variant="h2" style={styles.sectionTitle}>
            {title}
          </Typography>
        </View>
      )}
      // ITEM
      renderItem={({ item }) => (
        <EventCard event={item} onPress={() => onEventPress(item.id)} />
      )}
      SectionSeparatorComponent={() => <View style={{ height: SPACING.s }} />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: SPACING.m,
    paddingBottom: 100, // Pour ne pas être caché par la TabBar
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
    color: COLORS.text,
    fontSize: 20,
  },
});
