import * as Notifications from 'expo-notifications';
import { CleanEvent } from '../types/api.types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const NotificationService = {
  /**
   * Demande la permission
   */
  requestPermissions: async () => {
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
  },

  /**
   * PROD : Programme une notification x minutes avant
   */
  scheduleEventNotification: async (
    event: CleanEvent,
    minutesBefore: number = 15
  ) => {
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
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const notification = scheduled.find(
      (n) => n.content.data?.eventId === eventId
    );
    if (notification) {
      await Notifications.cancelScheduledNotificationAsync(
        notification.identifier
      );
      console.log(`Notif annulée pour ${eventId}`);
    }
  },
};
