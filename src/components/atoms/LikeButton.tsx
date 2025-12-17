import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from './Icon';
import { COLORS } from '../../constants/theme';
import { CleanEvent } from '../../types/api.types';

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
  backgroundColor = COLORS.primary,
  activeColor = COLORS.text,
  style,
}: FavoriteButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (!event) {
      router.push('/likes' as any);
      return;
    }

    if (onPress) {
      onPress();
    }
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
        style,
      ]}
    >
      <Icon
        name="favorite"
        size={iconSize}
        color={isLiked ? activeColor : COLORS.tabBarInactive}
        fill={isLiked ? activeColor : 'transparent'}
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
