import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import TabBar from '../src/components/molecules/TabBar';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{ headerShown: false }}
        backBehavior="history"
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="infos" options={{ title: 'Infos' }} />
        <Tabs.Screen
          name="programmation"
          options={{ title: 'Programmation' }}
        />
        <Tabs.Screen name="reglages" options={{ title: 'Réglages' }} />

        {/* Routes cachées */}
        <Tabs.Screen
          name="likes"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen name="map" options={{ title: 'Map' }} />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default Layout;
