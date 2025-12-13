import React, { useEffect, useState } from 'react';
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
import { COLORS, SPACING, FONTS, SIZES } from '../constants/theme';
import { CleanEvent } from '../types/api.types';
import { getFestivalEvents } from '../services/festival.service';
import { LikeService } from '../services/like.service';

// --- COMPOSANTS ---
import Typography from '../../src/components/atoms/Typography';
import Icon from '../../src/components/atoms/Icon';
import PageHeader from '../../src/components/molecules/PageHeader';
import Tag from '../../src/components/atoms/Tag';
import RemoteImage from '../components/atoms/RemoteImage';

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
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [event, setEvent] = useState<CleanEvent | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement Event
  useEffect(() => {
    const fetchEvent = async () => {
      const allEvents = await getFestivalEvents();
      const found = allEvents.find((e) => e.id === id);
      setEvent(found || null);

      if (found) {
        const liked = await LikeService.isLiked(found.id);
        setIsLiked(liked);
      }
      setIsLoading(false);
    };
    if (id) fetchEvent();
  }, [id]);

  // Gestion du Like
  const toggleLike = async () => {
    if (!event) return;
    const newState = !isLiked;
    setIsLiked(newState);
    await LikeService.toggleFavorite(event);
  };

  if (isLoading || !event) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const tagsStyles = {
    body: {
      color: COLORS.text,
      fontFamily: FONTS.regular,
      fontSize: SIZES.body,
      lineHeight: 22,
    },
    ul: { paddingLeft: 0, margin: 0 },
    li: { marginBottom: 5 },
    p: { marginBottom: 10 },
    strong: { fontFamily: FONTS.bold },
  };

  const firstDate = event.dates[0];
  const placeName = firstDate?.placeName || 'Lieu à définir';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <PageHeader
          title="Évènement"
          iconName="calendar"
          style={styles.headerCustom}
        />
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.topSection}>
          <View style={styles.titleRow}>
            <Typography variant="h1" style={styles.title}>
              {event.title}
            </Typography>

            <Tag
              label={placeName}
              iconName="location"
              backgroundColor={COLORS.tag}
              style={styles.locationTag}
            />
          </View>

          <Typography variant="caption" style={styles.dateText}>
            {formatDateRange(event.dates)}
          </Typography>

          {event.subtitle && (
            <Typography variant="body" style={styles.introText}>
              {event.subtitle}
            </Typography>
          )}
        </View>

        <RemoteImage
          url={event.imageUrl}
          style={styles.mainImage}
          resizeMode="cover"
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.btnOutline]}
            onPress={() => {
              const url =
                'https://lafermedubuisson.notre-billetterie.com/billets?kld=2526';
              Linking.openURL(url);
            }}
            activeOpacity={0.7}
          >
            <Typography variant="body">Réserver</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.btnFilled]}
            onPress={toggleLike}
            activeOpacity={0.7}
          >
            <Typography variant="body">Favori</Typography>
            <View style={{ marginLeft: 8 }}>
              <Icon
                name="favorite"
                size={20}
                color={COLORS.text}
                fill={isLiked ? COLORS.text : 'transparent'}
                strokeWidth={2}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsSection}>
          <Typography variant="h2" style={{ marginBottom: SPACING.s }}>
            Détail de l’évenement :
          </Typography>

          {event.description ? (
            <RenderHtml
              contentWidth={width - SPACING.m * 2}
              source={{ html: event.description }}
              tagsStyles={tagsStyles}
              systemFonts={[FONTS.regular, FONTS.bold]}
            />
          ) : (
            <Typography variant="body">
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
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  // --- HEADER CUSTOM ---
  headerSafeArea: {
    backgroundColor: COLORS.secondary,
  },
  headerCustom: {
    marginBottom: 0,
  },

  // --- SCROLL CONTENT ---
  scrollContent: {
    padding: SPACING.m,
    paddingBottom: 100,
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },

  // --- TOP SECTION ---
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
    color: COLORS.text,
    fontSize: 22,
  },

  locationTag: {
    borderWidth: 1.5,
    borderColor: COLORS.text,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  dateText: {
    color: COLORS.tabBarInactive,
    marginBottom: SPACING.m,
  },
  introText: {
    color: '#444',
    lineHeight: 20,
  },

  // --- IMAGE ---
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    marginBottom: SPACING.l,
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: COLORS.text,
  },

  // --- ACTIONS ---
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
    borderColor: COLORS.text,
  },
  btnOutline: {
    backgroundColor: COLORS.card,
  },
  btnFilled: {
    backgroundColor: COLORS.secondary,
  },

  // --- DETAILS ---
  detailsSection: {
    marginTop: SPACING.s,
  },
});
