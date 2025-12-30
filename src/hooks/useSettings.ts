import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Services & Contextes
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from './useFavorites';
import { NotificationService } from '../services/notifications.service';
import { setGlobalHapticsEnabled } from './useAppHaptics';

const VIBRATION_KEY = 'user_vibration_enabled';

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
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

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
    if (value !== isAccessible) {
      toggleAccessibility();
    }
  };

  const handleResetConfirm = async () => {
    try {
      await resetFavorites();

      await resetPreferences();

      await NotificationService.setNotificationsEnabled(false);

      await NotificationService.setNotificationsEnabled(true);
      setNotifEnabled(true);

      setResetModalVisible(false);
      Alert.alert('Succès', "L'application a été réinitialisée.");

      const vib = await AsyncStorage.getItem(VIBRATION_KEY);
      const isVibEnabled = vib !== null ? JSON.parse(vib) : true;
      setVibrationEnabled(isVibEnabled);
      setGlobalHapticsEnabled(isVibEnabled);

      router.replace('/' as any);
    } catch (error) {
      console.error('Erreur reset', error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de la réinitialisation.'
      );
    }
  };

  const handleToggleVibration = async (value: boolean) => {
    setVibrationEnabled(value);
    setGlobalHapticsEnabled(value);
    await AsyncStorage.setItem(VIBRATION_KEY, JSON.stringify(value));
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

    vibrationEnabled,
    handleToggleVibration,

    router,
  };
};
