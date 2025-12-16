import AsyncStorage from '@react-native-async-storage/async-storage';
import { CleanEvent } from '../types/api.types';
import { NotificationService } from './notifications.service';

const FAVORITES_KEY = 'festival_favorites';
const STORAGE_KEY = 'user_favorites';

export const LikeService = {
  /**
   * Récupère tous les favoris stockés
   */
  getFavorites: async (): Promise<CleanEvent[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Erreur lecture favoris', e);
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
   * Retourne true si ajouté, false si retiré
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
    } catch (error) {
      console.error('Erreur toggle like', error);
      return [];
    }
  },
};
