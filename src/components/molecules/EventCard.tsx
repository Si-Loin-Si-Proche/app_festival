import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from 'react-native';
import { CleanEvent } from '../../types/api.types';
import { SPACING, FONTS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import RemoteImage from '../atoms/RemoteImage';
import Typography from '../atoms/Typography';
import FavoriteButton from '../atoms/LikeButton';
import Tag from '../atoms/Tag';
import Icon from '../atoms/Icon';

interface EventCardProps {
  event: CleanEvent;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'horizontal' | 'vertical' | 'compact';
  backgroundColor?: string;
  isFavorite: boolean;
  onToggle: () => void;
}

function EventCard({
  event,
  onPress,
  style,
  variant = 'horizontal',
  backgroundColor,
  isFavorite,
  onToggle,
}: EventCardProps) {
  const { colors, sizes } = useTheme();

  const firstDate = event.dates[0];
  const placeName = firstDate?.placeName || 'Lieu à définir';

  // --- LOGIQUE DE DATE ---
  let dateString = 'Date à venir';
  let timeString = '';
  let endTimeString = '';

  if (firstDate?.start) {
    const startDate = new Date(firstDate.start);
    dateString = startDate.toLocaleDateString('fr-FR', {
      weekday: variant === 'vertical' ? undefined : undefined,
      day: '2-digit',
      month: 'long',
    });

    timeString = startDate
      .toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(':', 'h');

    if (firstDate.end) {
      const endDate = new Date(firstDate.end);
      endTimeString = endDate
        .toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })
        .replace(':', 'h');
    }
  }

  // Helper pour l'image
  const imageSource = event.imageUrl as
    | string
    | ImageSourcePropType
    | undefined;
  const isUrl =
    typeof imageSource === 'string' &&
    (imageSource.startsWith('http') || imageSource.startsWith('https'));

  const renderImage = (imageStyle: StyleProp<ImageStyle>) => {
    if (!imageSource)
      return (
        <View
          style={[imageStyle as ViewStyle, { backgroundColor: colors.border }]}
        />
      );
    if (isUrl) {
      return (
        <RemoteImage
          url={imageSource as string}
          style={imageStyle}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Image
          source={imageSource as ImageSourcePropType}
          style={imageStyle}
          resizeMode="cover"
        />
      );
    }
  };

  // VARIANTE COMPACTE
  if (variant === 'compact') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.cContainer,
          {
            borderColor: colors.text,
            backgroundColor: colors.background,
          },
          style,
        ]}
      >
        <View
          style={[
            styles.cTagWrapper,
            {
              backgroundColor: colors.tag,
              borderColor: colors.text,
            },
          ]}
        >
          <Icon name="location" size={14} color={colors.text} />
          <Typography
            variant="caption"
            style={[styles.cTagText, { color: colors.text }]}
          >
            {placeName.toUpperCase()}
          </Typography>
        </View>

        <View style={styles.cContent}>
          <Typography variant="caption" style={styles.cTime}>
            {timeString}
            {endTimeString ? `-${endTimeString}` : ''}
          </Typography>
          <Typography variant="h2" style={styles.cTitle} numberOfLines={1}>
            {event.title}
          </Typography>
        </View>

        <Icon name="arrowRight" size={24} color={colors.text} />
      </TouchableOpacity>
    );
  }

  // VARIANTE VERTICALE (Home)
  if (variant === 'vertical') {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[styles.vContainer, style]}
      >
        {renderImage([styles.vImage, { borderColor: colors.text }])}

        <View
          style={[
            styles.vInfoBox,
            {
              // Ici on utilise la prop backgroundColor si elle existe, sinon la couleur par défaut
              backgroundColor: backgroundColor || colors.card,
              borderColor: colors.text,
            },
          ]}
        >
          <Typography variant="h2" style={styles.vTitle} numberOfLines={2}>
            {event.title}
          </Typography>

          {event.subtitle && (
            <Typography
              variant="caption"
              style={styles.vSubtitle}
              numberOfLines={1}
            >
              {event.subtitle}
            </Typography>
          )}

          <View>
            <Typography variant="caption" style={{ fontFamily: FONTS.bold }}>
              {new Date(firstDate?.start || '').toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
              })}
            </Typography>

            <Typography variant="caption">
              {timeString}
              {endTimeString ? `-${endTimeString}` : ''}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // VARIANTE HORIZONTALE (Défaut)
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.hContainer,
        {
          backgroundColor: colors.card,
          borderColor: colors.text,
        },
        style,
      ]}
    >
      <View style={styles.hImageContainer}>{renderImage(styles.hImage)}</View>

      <View style={styles.hContent}>
        <Typography
          variant="caption"
          style={[styles.hDateText, { color: colors.text }]}
        >
          {dateString} à {timeString}
        </Typography>

        <Typography
          variant="body"
          style={[styles.hTitle, { color: colors.text, fontSize: sizes.h3 }]}
          numberOfLines={2}
        >
          {event.title}
        </Typography>

        {event.subtitle && (
          <Typography
            variant="caption"
            style={[styles.hSubtitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {event.subtitle}
          </Typography>
        )}

        <Tag
          label={placeName}
          iconName="location"
          backgroundColor={colors.tag}
          style={styles.hTag}
        />
      </View>

      <View style={styles.hRightSection}>
        <FavoriteButton
          size="medium"
          event={event}
          backgroundColor={colors.secondary}
          activeColor={colors.text}
          isLiked={isFavorite}
          onPress={onToggle}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // --- COMPACT ---
  cContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: SPACING.m,
    height: 60,
  },
  cTagWrapper: {
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
    gap: 4,
  },
  cTagText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    marginBottom: 0,
    textTransform: 'uppercase',
  },
  cContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 0,
  },
  cTime: {
    fontSize: 12,
    marginBottom: 0,
    lineHeight: 14,
    fontFamily: FONTS.regular,
  },
  cTitle: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    marginBottom: 0,
    lineHeight: 16,
  },

  // --- VERTICAL ---
  vContainer: {
    width: '100%',
    height: 250,
    marginBottom: 40,
    position: 'relative',
    overflow: 'visible',
  },
  vImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 2,
    overflow: 'hidden',
  },
  vInfoBox: {
    position: 'absolute',
    bottom: -20,
    left: 20,
    maxWidth: '85%',
    alignSelf: 'flex-start',
    borderRadius: 16,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 5,
    zIndex: 10,
  },
  vTitle: {
    marginBottom: 0,
    fontSize: 18,
    lineHeight: 22,
  },
  vSubtitle: {
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 0,
  },

  // --- HORIZONTAL ---
  hContainer: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 2,
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
    marginBottom: 2,
  },
  hTitle: {
    fontFamily: FONTS.bold,
    marginBottom: 2,
    lineHeight: 20,
  },
  hSubtitle: {
    fontFamily: FONTS.italic,
    fontSize: 12,
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

const arePropsEqual = (
  prevProps: EventCardProps,
  nextProps: EventCardProps
) => {
  const isSelectedChanged = prevProps.isFavorite !== nextProps.isFavorite;
  const isEventChanged = prevProps.event.id !== nextProps.event.id;

  const isBackgroundChanged =
    prevProps.backgroundColor !== nextProps.backgroundColor;

  return !isSelectedChanged && !isEventChanged && !isBackgroundChanged;
};

export default React.memo(EventCard, arePropsEqual);
