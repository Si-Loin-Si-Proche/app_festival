import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { CleanEvent } from '../types/api.types';

import type * as NotificationsType from 'expo-notifications';

const NOTIF_PREF_KEY = 'user_notifications_enabled';

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
let Notifications: typeof NotificationsType | null = null;

if (!isExpoGo) {
  try {
    Notifications = require('expo-notifications');
    if (Notifications) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    }
  } catch (e) {
    console.warn('Erreur chargement natif notifications', e);
  }
}

export const NotificationService = {
  /**
   * Vérifie si l'utilisateur a activé les notifications dans l'app
   * Par défaut : TRUE
   */
  areNotificationsEnabled: async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(NOTIF_PREF_KEY);
      return value !== null ? JSON.parse(value) : true;
    } catch (e) {
      return true;
    }
  },

  /**
   * Change le réglage global (activé/désactivé)
   */
  setNotificationsEnabled: async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(NOTIF_PREF_KEY, JSON.stringify(enabled));
      // On utilise la variable dynamique 'Notifications'
      if (!enabled && Notifications) {
        await Notifications.cancelAllScheduledNotificationsAsync();
        console.log('Notifications désactivées : Tout a été annulé.');
      }
    } catch (e) {
      console.error('Erreur sauvegarde pref notif', e);
    }
  },

  requestPermissions: async () => {
    // PROTECTION EXPO GO
    if (!Notifications) {
      console.log(
        '🚧 [Expo Go] Permissions simulées (librairie native absente)'
      );
      return true; // On fait croire que c'est bon pour ne pas bloquer l'UI
    }

    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permission refusée !');
        return false;
      }
      return true;
    } catch (e) {
      console.warn('Erreur permissions:', e);
      return false;
    }
  },

  /**
   * PROD : Programme une notification x minutes avant
   */
  scheduleEventNotification: async (
    event: CleanEvent,
    minutesBefore: number = 15
  ) => {
    if (!Notifications) {
      console.log(`🚧 [Expo Go] Notification SIMULÉE pour : ${event.title}`);
      return;
    }

    const isAppEnabled = await NotificationService.areNotificationsEnabled();
    if (!isAppEnabled) {
      console.log('Notif bloquée par le réglage utilisateur (OFF)');
      return;
    }

    const hasPermission = await NotificationService.requestPermissions();
    if (!hasPermission) return;
    if (!event.dates || event.dates.length === 0) return;
    const startDate = new Date(event.dates[0].start);
    const triggerDate = new Date(
      startDate.getTime() - minutesBefore * 60 * 1000
    );
    if (triggerDate.getTime() < Date.now()) {
      console.log('Trop tard pour la notification.');
      return;
    }
    const timeString = startDate
      .toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(':', 'h');

    try {
      const placeName = event.dates[0]?.placeName || 'la Ferme du Buisson';

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `C'est bientôt ! ⏳`,
          body: `${event.title} commence à ${timeString} à ${placeName}.`,
          sound: true,
          data: { eventId: event.id },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: triggerDate,
        },
      });
      console.log(
        `Notif programmée pour ${event.title} à ${triggerDate.toLocaleTimeString()}`
      );
      return id;
    } catch (e) {
      console.error('Erreur programmation notif', e);
    }
  },

  /**
   * Annule la notification
   */
  cancelEventNotification: async (eventId: string) => {
    if (!Notifications) return;
    try {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      const notification = scheduled.find(
        (n) => n.content.data?.eventId === eventId
      );
      if (notification) {
        await Notifications.cancelScheduledNotificationAsync(
          notification.identifier
        );
        console.log(`🗑 Notif annulée pour ${eventId}`);
      }
    } catch (e) {
      console.warn('Erreur annulation notif:', e);
    }
  },
};
