import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { LikeService } from '../services/like.service';
import { CleanEvent } from '../types/api.types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<CleanEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    const data = await LikeService.getFavorites();
    setFavorites(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const toggleFavorite = async (event: CleanEvent) => {
    const newFavorites = await LikeService.toggleFavorite(event);
    setFavorites(newFavorites);
  };

  const isLiked = (eventId: string) => {
    return favorites.some((f) => f.id === eventId);
  };

  const resetFavorites = async () => {
    const emptyList = await LikeService.resetAllFavorites();
    setFavorites(emptyList);
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isLiked,
    refresh: loadFavorites,
    resetFavorites,
  };
};
