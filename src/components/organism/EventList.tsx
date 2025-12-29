import React, { useMemo } from 'react';
import { View, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import { CleanEvent } from '../../types/api.types';
import { SPACING, FONTS } from '../../constants/theme';
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

    const now = new Date();
    now.setHours(0, 0, 0, 0);

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
            year: 'numeric',
          })
          .replace(/^\w/, (c) => c.toUpperCase());

        if (!acc[dayLabel]) {
          acc[dayLabel] = {
            title: dayLabel,
            date: dateObj,
            data: [],
          };
        }
        acc[dayLabel].data.push(event);
        return acc;
      },
      {} as Record<string, { title: string; date: Date; data: CleanEvent[] }>
    );

    const allSections = Object.values(groups);

    const futureSections = allSections.filter((s) => {
      const sectionDate = new Date(s.date);
      sectionDate.setHours(0, 0, 0, 0);
      return sectionDate >= now;
    });

    const pastSections = allSections.filter((s) => {
      const sectionDate = new Date(s.date);
      sectionDate.setHours(0, 0, 0, 0);
      return sectionDate < now;
    });
    futureSections.sort((a, b) => a.date.getTime() - b.date.getTime());
    pastSections.sort((a, b) => a.date.getTime() - b.date.getTime());
    return [...futureSections, ...pastSections];
  }, [events]);

  const isToday = (dateObj: Date) => {
    const now = new Date();
    return (
      dateObj.getDate() === now.getDate() &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getFullYear() === now.getFullYear()
    );
  };

  const isEventPast = (event: CleanEvent) => {
    if (!event.dates[0]?.end) return false;
    return new Date(event.dates[0].end) < new Date();
  };

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
        <EmptyState message={"Pas d'évènement à afficher"} />
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
      renderSectionHeader={({ section: { title, date } }) => {
        const today = isToday(date);
        return (
          <View style={styles.sectionHeaderWrapper}>
            {today && (
              <View
                style={[styles.todayBadge, { backgroundColor: colors.primary }]}
              >
                <Typography
                  variant="caption"
                  style={{ color: 'white', fontWeight: 'bold' }}
                >
                  AUJOURD'HUI
                </Typography>
              </View>
            )}

            <View
              style={[styles.sectionHeader, today && styles.sectionHeaderToday]}
            >
              <Typography
                variant="h2"
                style={[
                  styles.sectionTitle,
                  { color: today ? colors.primary : colors.text }, // Rouge si aujourd'hui
                ]}
              >
                {title}
              </Typography>
            </View>
          </View>
        );
      }}
      renderItem={({ item }) => {
        const passed = isEventPast(item);
        return (
          <View style={{ opacity: passed ? 0.5 : 1 }}>
            <EventCard
              event={item}
              onPress={() => onEventPress(item.id)}
              isFavorite={isLiked(item.id)}
              onToggle={() => onToggleFavorite(item)}
            />
          </View>
        );
      }}
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
  sectionHeaderWrapper: {
    marginTop: SPACING.m,
    marginBottom: SPACING.s,
    alignItems: 'flex-start',
  },
  sectionHeader: {
    backgroundColor: 'transparent',
  },
  sectionHeaderToday: {
    // Style en plus pour les events du jour
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
  },
  todayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
});
