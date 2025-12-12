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
}

export default function EventCard({ event, onPress, style }: EventCardProps) {
  const firstDate = event.dates[0];

  // 1. On récupère le lieu (C'est ça que tu veux afficher !)
  const placeName = firstDate?.placeName || 'Lieu à définir';

  // 2. On formate la date
  let dateString = 'Date à venir';
  if (firstDate?.start) {
    const startDate = new Date(firstDate.start);
    dateString =
      startDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }) +
      ' à ' +
      startDate
        .toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(':', 'h');
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {/* IMAGE */}
      <View style={styles.imageContainer}>
        <RemoteImage
          url={event.imageUrl}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* CONTENU CENTRAL */}
      <View style={styles.content}>
        {/* Date et Heure */}
        <Typography variant="caption" style={styles.dateText}>
          {dateString}
        </Typography>

        {/* Titre */}
        <Typography variant="body" style={styles.title} numberOfLines={2}>
          {event.title}
        </Typography>

        {/* Sous-titre */}
        {event.subtitle && (
          <Typography
            variant="caption"
            style={styles.subtitle}
            numberOfLines={1}
          >
            {event.subtitle}
          </Typography>
        )}

        <Tag
          label={placeName}
          iconName="location"
          backgroundColor={COLORS.tag}
          style={styles.tag}
        />
      </View>

      {/* SECTION DROITE (Favori) */}
      <View style={styles.rightSection}>
        <FavoriteButton
          size="medium"
          eventId={event.id}
          backgroundColor={COLORS.secondary}
          activeColor={COLORS.text}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  imageContainer: {
    width: 90,
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: SPACING.m,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
  },
  dateText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.text,
    marginBottom: 2,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.h3,
    color: COLORS.text,
    marginBottom: 2,
    lineHeight: 20,
  },
  subtitle: {
    fontFamily: FONTS.italic,
    fontSize: 12,
    color: COLORS.text,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: SPACING.s,
  },
  tag: {
    marginTop: SPACING.s,
    alignSelf: 'flex-start',
  },
});
