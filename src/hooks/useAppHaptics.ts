import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { Platform } from 'react-native';

let isHapticsEnabledGlobal = true;

export const setGlobalHapticsEnabled = (enabled: boolean) => {
  isHapticsEnabledGlobal = enabled;
};

export const useAppHaptics = () => {
  const light = useCallback(() => {
    if (Platform.OS === 'web' || !isHapticsEnabledGlobal) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const medium = useCallback(() => {
    if (Platform.OS === 'web' || !isHapticsEnabledGlobal) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const success = useCallback(() => {
    if (Platform.OS === 'web' || !isHapticsEnabledGlobal) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const selection = useCallback(() => {
    if (Platform.OS === 'web' || !isHapticsEnabledGlobal) return;
    Haptics.selectionAsync();
  }, []);

  return { light, medium, success, selection };
};
