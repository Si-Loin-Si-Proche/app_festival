import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from './Icon';
import { COLORS } from '../../constants/theme';
import { CleanEvent } from '../../types/api.types';
import { LikeService } from '../../services/like.service';

const BUTTON_SIZES = {
  small: { size: 32, icon: 16 },
  medium: { size: 44, icon: 20 },
  large: { size: 56, icon: 28 },
};

interface FavoriteButtonProps {
  event?: CleanEvent;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  activeColor?: string;
  style?: ViewStyle;
  onToggle?: (newState: boolean) => void;
}

export default function FavoriteButton({
  event,
  size = 'medium',
  backgroundColor = COLORS.primary,
  activeColor = COLORS.text,
  style,
  onToggle,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkStatus = async () => {
      if (event?.id) {
        const isAlreadyLiked = await LikeService.isLiked(event.id);
        if (isMounted) setLiked(isAlreadyLiked);
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
    };
  }, [event?.id]);

  const handlePress = async () => {
    if (!event) {
      router.push('/likes' as any);
      return;
    }

    const previousState = liked;
    const newState = !liked;
    setLiked(newState);

    try {
      await LikeService.toggleFavorite(event);
      if (onToggle) onToggle(newState);
    } catch (error) {
      setLiked(previousState);
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
