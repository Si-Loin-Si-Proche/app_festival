import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

// Services & Contextes
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from './useFavorites';
import { NotificationService } from '../services/notifications.service';

export const useSettings = () => {
  const router = useRouter();

  // 1. Récupération des Contextes
  const {
    isDark,
    toggleTheme,
    isAccessible,
    toggleAccessibility,
    resetPreferences,
    colors,
  } = useTheme();

  const { resetFavorites } = useFavorites();

  // 2. États Locaux (UI)
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isResetModalVisible, setResetModalVisible] = useState(false);

  // 3. Initialisation : Charger l'état des notifications
  useEffect(() => {
    const loadNotifStatus = async () => {
      const isEnabled = await NotificationService.areNotificationsEnabled();
      setNotifEnabled(isEnabled);
    };
    loadNotifStatus();
  }, []);

  // --- HANDLERS ---

  // A. Notifications
  const handleToggleNotifications = async (value: boolean) => {
    setNotifEnabled(value); // Update visuel immédiat
    await NotificationService.setNotificationsEnabled(value);
  };

  // B. Thème (Conversion String <-> Boolean)
  const currentThemeLabel = isDark ? 'Sombre' : 'Clair';

  const handleThemeSelect = (selectedLabel: string) => {
    const shouldBeDark = selectedLabel === 'Sombre';
    if (shouldBeDark !== isDark) {
      toggleTheme();
    }
    setIsThemeOpen(false);
  };

  // C. Accessibilité
  const handleAccessToggle = (value: boolean) => {
    // On appelle toggle seulement si la valeur change (sécurité)
    if (value !== isAccessible) {
      toggleAccessibility();
    }
  };

  const handleResetConfirm = async () => {
    try {
      await resetFavorites();

      await resetPreferences();

      await Notifications.cancelAllScheduledNotificationsAsync();
      await NotificationService.setNotificationsEnabled(true);
      setNotifEnabled(true);

      setResetModalVisible(false);
      Alert.alert('Succès', "L'application a été réinitialisée.");

      // Optionnel : Rediriger vers l'accueil pour rafraîchir
      router.replace('/' as any);
    } catch (error) {
      console.error('Erreur reset', error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de la réinitialisation.'
      );
    }
  };

  return {
    colors,
    notifEnabled,
    isAccessible,
    currentThemeLabel,
    isThemeOpen,
    isResetModalVisible,

    setIsThemeOpen,
    setResetModalVisible,

    handleToggleNotifications,
    handleThemeSelect,
    handleAccessToggle,
    handleResetConfirm,

    router,
  };
};
