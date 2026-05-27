// ============================================================
// [WEB-APP] Service de notifications DÉSACTIVÉ
// Les APIs expo-notifications sont natives et ne fonctionnent
// pas sur le web. Toutes les fonctions sont des stubs no-op.
// ============================================================

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Constants, { ExecutionEnvironment } from 'expo-constants';
import { CleanEvent } from '../types/api.types';

// import type * as NotificationsType from 'expo-notifications';

// const NOTIF_PREF_KEY = 'user_notifications_enabled';

// const isExpoGo =
//   Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
// let Notifications: typeof NotificationsType | null = null;

// if (!isExpoGo) {
//   try {
//     Notifications = require('expo-notifications');
//     if (Notifications) {
//       Notifications.setNotificationHandler({
//         handleNotification: async () => ({
//           shouldShowAlert: true,
//           shouldPlaySound: true,
//           shouldSetBadge: false,
//           shouldShowBanner: true,
//           shouldShowList: true,
//         }),
//       });
//     }
//   } catch (_e) {
//     console.warn('Erreur chargement natif notifications', _e);
//   }
// }

export const NotificationService = {
  /** [WEB] Stub — retourne toujours false (notifications désactivées sur web) */
  areNotificationsEnabled: async (): Promise<boolean> => {
    return false;
  },

  /** [WEB] Stub — no-op */
  setNotificationsEnabled: async (_enabled: boolean): Promise<void> => {
    // Notifications non supportées sur le web
  },

  /** [WEB] Stub — retourne toujours false */
  requestPermissions: async (): Promise<boolean> => {
    return false;
  },

  /** [WEB] Stub — no-op */
  scheduleEventNotification: async (
    _event: CleanEvent,
    _minutesBefore: number = 15
  ): Promise<void> => {
    // Notifications non supportées sur le web
  },

  /** [WEB] Stub — no-op */
  cancelEventNotification: async (_eventId: string): Promise<void> => {
    // Notifications non supportées sur le web
  },
};
