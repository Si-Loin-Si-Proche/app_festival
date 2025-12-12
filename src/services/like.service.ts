import AsyncStorage from '@react-native-async-storage/async-storage';
import { CleanEvent } from '../types/api.types';

const FAVORITES_KEY = 'festival_favorites';

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
  toggleFavorite: async (event: CleanEvent): Promise<boolean> => {
    try {
      const favorites = await LikeService.getFavorites();
      const existingIndex = favorites.findIndex((e) => e.id === event.id);
      let isNowLiked = false;

      if (existingIndex >= 0) {
        favorites.splice(existingIndex, 1);
        isNowLiked = false;
      } else {
        favorites.push(event);
        isNowLiked = true;
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return isNowLiked;
    } catch (e) {
      console.error('Erreur écriture favoris', e);
      return false;
    }
  },
};
