import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
// [WEB-APP] AsyncStorage désactivé (vibration key non utilisée)
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Services & Contextes
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from './useFavorites';
// [WEB-APP] NotificationService désactivé (APIs natives)
// import { NotificationService } from '../services/notifications.service';
// [WEB-APP] Haptics désactivé (APIs natives)
// import { setGlobalHapticsEnabled } from './useAppHaptics';

// const VIBRATION_KEY = 'user_vibration_enabled';

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
  // [WEB-APP] notifEnabled figé à false (non supporté sur web)
  const [notifEnabled] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isResetModalVisible, setResetModalVisible] = useState(false);
  // [WEB-APP] vibrationEnabled figé à false (non supporté sur web)
  const [vibrationEnabled] = useState(false);

  // [WEB-APP] useEffect notifications désactivé
  // useEffect(() => {
  //   const loadNotifStatus = async () => {
  //     const isEnabled = await NotificationService.areNotificationsEnabled();
  //     setNotifEnabled(isEnabled);
  //   };
  //   loadNotifStatus();
  // }, []);

  // Évite l'erreur "unused import" de useEffect
  useEffect(() => {}, []);

  // --- HANDLERS ---

  // A. Notifications — [WEB-APP] no-op
  const handleToggleNotifications = async (_value: boolean) => {
    // Notifications non supportées sur le web
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
      // [WEB-APP] Notifications désactivées
      // await NotificationService.setNotificationsEnabled(false);
      // await NotificationService.setNotificationsEnabled(true);

      setResetModalVisible(false);
      Alert.alert('Succès', "L'application a été réinitialisée.");

      // [WEB-APP] Vibration désactivée
      // const vib = await AsyncStorage.getItem(VIBRATION_KEY);
      // const isVibEnabled = vib !== null ? JSON.parse(vib) : true;
      // setGlobalHapticsEnabled(isVibEnabled);

      router.replace('/' as any);
    } catch (_error) {
      /* eslint-disable-next-line no-console */
      console.error('Erreur reset', _error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de la réinitialisation.'
      );
    }
  };

  // [WEB-APP] Vibration désactivée — no-op
  const handleToggleVibration = async (_value: boolean) => {
    // Vibrations non supportées sur le web
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
