/* eslint-disable no-console */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PALETTE, SIZES, SIZES_ACCESSIBILITY } from '../constants/theme';

// 1. DÉFINITION DU TYPE
type ThemeContextType = {
  isDark: boolean;
  isAccessible: boolean;
  toggleTheme: () => void;
  toggleAccessibility: () => void;
  resetPreferences: () => Promise<void>;
  colors: typeof PALETTE.light;
  sizes: typeof SIZES;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isAccessible, setIsAccessible] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('user_theme');
        const savedAccess = await AsyncStorage.getItem('user_access');
        if (savedTheme === 'dark') setIsDark(true);
        if (savedAccess === 'true') setIsAccessible(true);
      } catch (_e) {
        console.error('Erreur chargement theme', _e);
      }
    };
    loadSettings();
  }, []);

  const toggleTheme = async () => {
    setIsDark((prev) => {
      const newVal = !prev;
      AsyncStorage.setItem('user_theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  const toggleAccessibility = async () => {
    setIsAccessible((prev) => {
      const newVal = !prev;
      AsyncStorage.setItem('user_access', newVal ? 'true' : 'false');
      return newVal;
    });
  };

  // 👇 2. CRÉATION DE LA FONCTION RESET
  const resetPreferences = async () => {
    setIsDark(false); // On remet en clair
    setIsAccessible(false); // On remet taille normale
    try {
      // On nettoie le stockage
      await AsyncStorage.removeItem('user_theme');
      await AsyncStorage.removeItem('user_access');
    } catch (_e) {
      console.error('Erreur reset preferences', _e);
    }
  };

  const themeValues = useMemo(
    () => ({
      isDark,
      isAccessible,
      toggleTheme,
      toggleAccessibility,
      resetPreferences,

      colors: isDark ? PALETTE.dark : PALETTE.light,
      sizes: isAccessible ? SIZES_ACCESSIBILITY : SIZES,
    }),
    [isDark, isAccessible]
  );

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
