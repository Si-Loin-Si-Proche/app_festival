import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import RenderHtml from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- IMPORTS ---
import { SPACING, FONTS, SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { CleanEvent } from '../types/api.types';
import { getFestivalEvents } from '../services/festival.service';
import { useFavorites } from '../hooks/useFavorites';

// --- COMPOSANTS ---
import Typography from '../../src/components/atoms/Typography';
import Icon from '../../src/components/atoms/Icon';
import Tag from '../../src/components/atoms/Tag';
import RemoteImage from '../components/atoms/RemoteImage';
import SectionHeader from '../components/molecules/SectionHeader';

const SYSTEM_FONTS = [FONTS.regular, FONTS.bold];

const formatDateRange = (dates: any[]) => {
  if (!dates || dates.length === 0) return '';
  const start = new Date(dates[0].start);
  const end = new Date(dates[dates.length - 1].end || dates[0].end);

  const format = (d: Date) =>
    d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

  if (start.getTime() === end.getTime()) return format(start);
  return `${format(start)} - ${format(end)}`;
};

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const { isLiked, toggleFavorite } = useFavorites();

  const [event, setEvent] = useState<CleanEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Styles dynamiques pour le rendu HTML
  const tagsStyles = useMemo(
    () => ({
      body: {
        color: colors.text,
        fontFamily: FONTS.regular,
        fontSize: SIZES.body,
        lineHeight: 22,
      },
      ul: { paddingLeft: 0, margin: 0, color: colors.text },
      li: { marginBottom: 5, color: colors.text },
      p: { marginBottom: 10, color: colors.text },
      strong: { fontFamily: FONTS.bold, color: colors.text },
      a: { color: colors.primary, textDecorationLine: 'underline' },
    }),
    [colors]
  );

  const htmlSource = useMemo(() => {
    return { html: event?.description || '' };
  }, [event?.description]);

  // Chargement Event
  useEffect(() => {
    const fetchEvent = async () => {
      const allEvents = await getFestivalEvents();
      const found = allEvents.find((e) => e.id === id);
      setEvent(found || null);

      setIsLoading(false);
    };
    if (id) fetchEvent();
  }, [id]);

  const isEventLiked = event ? isLiked(event.id) : false;

  const handleToggle = () => {
    if (event) {
      toggleFavorite(event);
    }
  };

  if (isLoading || !event) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const firstDate = event.dates[0];
  const placeName = firstDate?.placeName || 'Lieu à définir';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView
        style={[styles.headerSafeArea, { backgroundColor: colors.background }]}
        edges={['top']}
      >
        <SectionHeader
          showBackButton={true}
          useImageTitle={true}
          showFavorite={false}
          style={{ backgroundColor: colors.background }}
        />
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: colors.background },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.topSection}>
          <View style={styles.titleRow}>
            <Typography
              variant="h1"
              style={[styles.title, { color: colors.text }]}
            >
              {event.title}
            </Typography>

            <Tag
              label={placeName}
              iconName="location"
              backgroundColor={colors.tag}
              style={[styles.locationTag, { borderColor: colors.text }]}
            />
          </View>

          <Typography
            variant="caption"
            style={[styles.dateText, { color: colors.tabBarInactive }]}
          >
            {formatDateRange(event.dates)}
          </Typography>

          {event.subtitle && (
            <Typography
              variant="body"
              style={[styles.introText, { color: colors.text }]}
            >
              {event.subtitle}
            </Typography>
          )}
        </View>

        <RemoteImage
          url={event.imageUrl}
          style={[styles.mainImage, { borderColor: colors.text }]}
          resizeMode="cover"
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                backgroundColor: colors.card,
                borderColor: colors.text,
              },
            ]}
            onPress={() => {
              const url =
                'https://lafermedubuisson.notre-billetterie.com/billets?kld=2526';
              Linking.openURL(url);
            }}
            activeOpacity={0.7}
          >
            <Typography variant="body" style={{ fontFamily: FONTS.bold }}>
              Réserver
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                backgroundColor: colors.secondary,
                borderColor: colors.text,
              },
            ]}
            onPress={handleToggle}
            activeOpacity={0.7}
          >
            <Typography variant="body" style={{ fontFamily: FONTS.bold }}>
              Favori
            </Typography>
            <View style={{ marginLeft: 8 }}>
              <Icon
                name="favorite"
                size={20}
                color={colors.text}
                fill={isEventLiked ? colors.text : 'transparent'}
                strokeWidth={2}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsSection}>
          <Typography
            variant="h2"
            style={{ marginBottom: SPACING.s, color: colors.text }}
          >
            Détail de l’évenement :
          </Typography>

          {event.description ? (
            <RenderHtml
              contentWidth={width - SPACING.m * 2}
              source={htmlSource}
              tagsStyles={tagsStyles as any}
              systemFonts={SYSTEM_FONTS}
            />
          ) : (
            <Typography variant="body" style={{ color: colors.text }}>
              Pas de description détaillée.
            </Typography>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSafeArea: {
    //
  },
  scrollContent: {
    padding: SPACING.m,
    paddingBottom: 100,
    flexGrow: 1,
  },
  topSection: {
    marginBottom: SPACING.m,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
    gap: SPACING.s,
  },
  title: {
    flex: 1,
    fontSize: 22,
  },
  locationTag: {
    borderWidth: 1.5,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  dateText: {
    marginBottom: SPACING.m,
  },
  introText: {
    lineHeight: 20,
    fontStyle: 'italic',
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    marginBottom: SPACING.l,
    backgroundColor: '#eee',
    borderWidth: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.m,
    marginBottom: SPACING.l,
  },
  actionBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  detailsSection: {
    marginTop: SPACING.s,
  },
});
