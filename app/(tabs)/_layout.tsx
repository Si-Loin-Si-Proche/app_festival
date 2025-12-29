import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import TabBar from '../../src/components/molecules/TabBar';
import { useTheme } from '../../src/context/ThemeContext';

const TabsLayout = () => {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar
        style={colors.text === '#FFFFFF' ? 'light' : 'dark'}
        backgroundColor={colors.background}
        translucent={false}
      />

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

        {/* Pages cachées */}
        <Tabs.Screen
          name="map"
          options={{ href: null, tabBarStyle: { display: 'none' } }}
        />
        <Tabs.Screen name="likes" options={{ href: null }} />
        <Tabs.Screen name="cgu" options={{ href: null }} />
        <Tabs.Screen name="mentions_legales" options={{ href: null }} />
        <Tabs.Screen name="politiques_conf" options={{ href: null }} />
        <Tabs.Screen name="partenaires" options={{ href: null }} />
      </Tabs>
    </>
  );
};

export default TabsLayout;
