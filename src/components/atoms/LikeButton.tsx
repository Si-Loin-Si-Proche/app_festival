import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from './Icon';
import { COLORS, SHADOWS } from '../../constants/theme';

const BUTTON_SIZES = {
  small: { size: 32, icon: 16 }, // Pour le Header
  medium: { size: 44, icon: 20 }, // Pour les cartes
  large: { size: 56, icon: 28 }, // Pour les pages détails
};

interface FavoriteButtonProps {
  eventId?: string;
  isLiked?: boolean;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  activeColor?: string;
  style?: ViewStyle;
  onToggle?: (newState: boolean) => void;
}

export default function FavoriteButton({
  eventId,
  isLiked = false,
  size = 'medium',
  backgroundColor = COLORS.primary,
  activeColor = COLORS.text,
  style,
  onToggle,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handlePress = () => {
    if (!eventId) {
      router.push('/favoris' as any);
      return;
    }

    const newState = !liked;
    setLiked(newState);

    if (onToggle) {
      onToggle(newState);
    }

    // Brancher le stockage des likes ici
  };

  const { size: buttonSize, icon: iconSize } = BUTTON_SIZES[size];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.container,
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: backgroundColor,
        },
        SHADOWS.medium,
        style,
      ]}
    >
      <Icon
        name="favorite"
        size={iconSize}
        color={liked ? activeColor : COLORS.tabBarInactive}
        fill={liked ? activeColor : 'transparent'}
        strokeWidth={liked ? 0 : 2}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
