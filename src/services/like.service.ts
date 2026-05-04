/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CleanEvent } from '../types/api.types';
import { NotificationService } from './notifications.service';

const STORAGE_KEY = 'user_favorites';

export const LikeService = {
  /**
   * Récupère tous les favoris stockés
   */
  getFavorites: async (): Promise<CleanEvent[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (_e) {
      console.error('Erreur lecture favoris', _e);
      return [];
    }
  },

  /**
   * Vérifie si un event est liké
   */
  isLiked: async (eventId: string): Promise<boolean> => {
    const favorites = await LikeService.getFavorites();
    return favorites.some((e) => e.id === eventId);
  },

  /**
   * Ajoute ou retire un favori (Toggle)
   */
  toggleFavorite: async (event: CleanEvent) => {
    try {
      const savedLikes = await AsyncStorage.getItem(STORAGE_KEY);
      let currentLikes: CleanEvent[] = savedLikes ? JSON.parse(savedLikes) : [];

      const existingIndex = currentLikes.findIndex((e) => e.id === event.id);

      if (existingIndex !== -1) {
        currentLikes.splice(existingIndex, 1);
        await NotificationService.cancelEventNotification(event.id);
      } else {
        currentLikes.push(event);
        await NotificationService.scheduleEventNotification(event, 30);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentLikes));
      return currentLikes;
    } catch (_error) {
      console.error('Erreur toggle like', _error);
      return [];
    }
  },

  resetAllFavorites: async () => {
    try {
      const currentLikes = await LikeService.getFavorites();
      for (const event of currentLikes) {
        await NotificationService.cancelEventNotification(event.id);
      }
      await AsyncStorage.removeItem(STORAGE_KEY);
      return [];
    } catch (_e) {
      console.error('Erreur reset favorites', _e);
      return [];
    }
  },
};
