import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from './Icon';
import { useTheme } from '../../context/ThemeContext';
import { CleanEvent } from '../../types/api.types';
import { useAppHaptics } from '../../hooks/useAppHaptics';

const BUTTON_SIZES = {
  small: { size: 32, icon: 16 },
  medium: { size: 44, icon: 20 },
  large: { size: 56, icon: 28 },
};

interface FavoriteButtonProps {
  isLiked?: boolean;
  onPress?: () => void;
  event?: CleanEvent;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  activeColor?: string;
  style?: ViewStyle;
}

export default function FavoriteButton({
  isLiked = false,
  onPress,
  event,
  size = 'medium',
  backgroundColor,
  activeColor,
  style,
}: FavoriteButtonProps) {
  const { success, light } = useAppHaptics();

  const router = useRouter();
  const { colors } = useTheme();

  const handlePress = () => {
    if (!event) {
      light();
      router.push('/likes' as any);
      return;
    }
    if (onPress) {
      success();
      onPress();
    }
  };

  const { size: buttonSize, icon: iconSize } = BUTTON_SIZES[size];

  // Gestion des couleurs par défaut via le hook
  const finalBackgroundColor = backgroundColor || colors.primary;
  const finalActiveColor = activeColor || colors.text;

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
          backgroundColor: finalBackgroundColor,
        },
        style,
      ]}
    >
      <Icon
        name="favorite"
        size={iconSize}
        color={isLiked ? finalActiveColor : colors.tabBarInactive}
        fill={isLiked ? finalActiveColor : 'transparent'}
        strokeWidth={isLiked ? 0 : 2}
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
