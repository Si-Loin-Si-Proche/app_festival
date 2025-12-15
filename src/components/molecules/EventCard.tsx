import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { CleanEvent } from '../../types/api.types';
import { COLORS, SPACING, FONTS, SIZES } from '../../constants/theme';
import RemoteImage from '../atoms/RemoteImage';
import Typography from '../atoms/Typography';
import FavoriteButton from '../atoms/LikeButton';
import Tag from '../atoms/Tag';

interface EventCardProps {
  event: CleanEvent;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'horizontal' | 'vertical';
  backgroundColor?: string;
}

export default function EventCard({
  event,
  onPress,
  style,
  variant = 'horizontal',
  backgroundColor,
}: EventCardProps) {
  const firstDate = event.dates[0];
  const placeName = firstDate?.placeName || 'Lieu à définir';

  // --- LOGIQUE DE DATE ---
  let dateString = 'Date à venir';
  let timeString = '';

  if (firstDate?.start) {
    const startDate = new Date(firstDate.start);
    dateString = startDate.toLocaleDateString('fr-FR', {
      weekday: variant === 'vertical' ? 'long' : undefined,
      day: '2-digit',
      month: variant === 'vertical' ? 'long' : '2-digit',
      year: variant === 'vertical' ? undefined : '2-digit',
    });

    timeString = startDate
      .toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(':', 'h');
  }

  // ============================================================
  // VARIANTE VERTICALE (HOME PAGE)
  // ============================================================
  if (variant === 'vertical') {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[styles.vContainer, style]}
      >
        {/* IMAGE EN FOND */}
        <RemoteImage
          url={event.imageUrl}
          style={styles.vImage}
          resizeMode="cover"
        />

        {/* CARTEL (Le bloc texte flottant en bas) */}
        {/* J'ai fusionné ton doublon ici : une seule View avec la couleur ET le contenu */}
        <View
          style={[
            styles.vInfoBox,
            { backgroundColor: backgroundColor || COLORS.card },
          ]}
        >
          {/* COLONNE GAUCHE : Titre & Sous-titre */}
          {/* flex: 1 est crucial ici pour empêcher le texte de dépasser sur la date */}
          <View style={{ flex: 1, marginRight: 10 }}>
            <Typography variant="h2" style={styles.vTitle} numberOfLines={1}>
              {event.title}
            </Typography>
            {event.subtitle && (
              <Typography variant="caption" numberOfLines={1}>
                {event.subtitle}
              </Typography>
            )}
          </View>

          {/* COLONNE DROITE : Date & Heure */}
          {/* flexShrink: 0 assure que la date ne soit jamais écrasée */}
          <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
            <Typography variant="caption" style={{ fontFamily: FONTS.bold }}>
              {dateString}
            </Typography>
            <Typography variant="caption">{timeString}</Typography>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // ============================================================
  // VARIANTE HORIZONTALE (LISTE CLASSIQUE)
  // ============================================================
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.hContainer, style]}
    >
      <View style={styles.hImageContainer}>
        <RemoteImage
          url={event.imageUrl}
          style={styles.hImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.hContent}>
        <Typography variant="caption" style={styles.hDateText}>
          {dateString} à {timeString}
        </Typography>

        <Typography variant="body" style={styles.hTitle} numberOfLines={2}>
          {event.title}
        </Typography>

        {event.subtitle && (
          <Typography
            variant="caption"
            style={styles.hSubtitle}
            numberOfLines={1}
          >
            {event.subtitle}
          </Typography>
        )}

        <Tag
          label={placeName}
          iconName="location"
          backgroundColor={COLORS.tag}
          style={styles.hTag}
        />
      </View>

      <View style={styles.hRightSection}>
        <FavoriteButton
          size="medium"
          event={event}
          backgroundColor={COLORS.secondary}
          activeColor={COLORS.text}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // --- STYLES VERTICAL (HOME) ---
  vContainer: {
    width: '100%', // <--- CHANGEMENT : Prend toute la largeur disponible
    height: 250, // <--- CHANGEMENT : Un peu plus haut pour être joli
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.text,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
    marginBottom: SPACING.m, // Marge en bas au lieu de droite
    position: 'relative',
  },
  vImage: {
    width: '100%',
    height: '100%',
  },
  vInfoBox: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    // La couleur de fond est gérée dynamiquement via le style inline
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.text,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Ombre
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Pour Android
  },
  vTitle: {
    marginBottom: 2,
    fontSize: 16,
    lineHeight: 20,
  },

  // --- STYLES HORIZONTAL ---
  hContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.text,
    padding: SPACING.s,
    marginBottom: SPACING.m,
    alignItems: 'stretch',
    height: 140,
  },
  hImageContainer: {
    width: 90,
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: SPACING.m,
  },
  hImage: {
    width: '100%',
    height: '100%',
  },
  hContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
  },
  hDateText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.text,
    marginBottom: 2,
  },
  hTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.h3,
    color: COLORS.text,
    marginBottom: 2,
    lineHeight: 20,
  },
  hSubtitle: {
    fontFamily: FONTS.italic,
    fontSize: 12,
    color: COLORS.text,
  },
  hRightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: SPACING.s,
  },
  hTag: {
    marginTop: SPACING.s,
    alignSelf: 'flex-start',
  },
});
