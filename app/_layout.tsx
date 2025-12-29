import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TabBar from '../src/components/molecules/TabBar';
import { ThemeProvider } from '../src/context/ThemeContext';

import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_700Bold,
  AtkinsonHyperlegible_400Regular_Italic,
  AtkinsonHyperlegible_700Bold_Italic,
} from '@expo-google-fonts/atkinson-hyperlegible';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [loaded, error] = useFonts({
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
    AtkinsonHyperlegible_400Regular_Italic,
    AtkinsonHyperlegible_700Bold_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{ headerShown: false }}
          backBehavior="history"
          tabBar={(props) => <TabBar {...props} />}
        >
          {/* 1. HOME */}
          <Tabs.Screen name="index" options={{ title: 'Home' }} />

          {/* 2. INFOS (Contient le MapBlock) */}
          <Tabs.Screen name="infos" options={{ title: 'Infos' }} />

          {/* 3. PROGRAMMATION */}
          <Tabs.Screen
            name="programmation"
            options={{ title: 'Programmation' }}
          />

          {/* 4. REGLAGES */}
          <Tabs.Screen name="reglages" options={{ title: 'Réglages' }} />

          {/* --- ROUTES CACHÉES (Pas dans la TabBar) --- */}

          {/* Likes */}
          <Tabs.Screen name="likes" options={{ href: null }} />

          {/* MAP (Cachée ici, accessible via MapBlock) */}
          <Tabs.Screen
            name="map"
            options={{
              title: 'Map',
              href: null,
              tabBarStyle: { display: 'none' },
            }}
          />

          <Tabs.Screen name="mentions_legales" options={{ href: null }} />
          <Tabs.Screen name="politiques_conf" options={{ href: null }} />
          <Tabs.Screen name="cgu" options={{ href: null }} />
          <Tabs.Screen name="partenaires" options={{ href: null }} />
        </Tabs>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default Layout;
