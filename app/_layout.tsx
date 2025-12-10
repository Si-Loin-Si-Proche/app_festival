import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// 1. Import des fichiers de police spécifiques
import { 
  AtkinsonHyperlegible_400Regular, 
  AtkinsonHyperlegible_700Bold, 
  AtkinsonHyperlegible_400Regular_Italic,
  AtkinsonHyperlegible_700Bold_Italic 
} from '@expo-google-fonts/atkinson-hyperlegible';

// Empêche l'écran de chargement de disparaître tant que les fonts ne sont pas prêtes
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  // 2. Le Hook qui charge les polices en mémoire
  const [loaded, error] = useFonts({
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
    AtkinsonHyperlegible_400Regular_Italic,
    AtkinsonHyperlegible_700Bold_Italic,
  });

  // 3. On cache le Splash Screen une fois que c'est fini
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Tant que ce n'est pas chargé, on n'affiche rien (l'écran reste sur le splash screen)
  if (!loaded && !error) {
    return null;
  }

  // 4. Une fois chargé, on affiche TA navigation (les Tabs)
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Tu pourras configurer tes onglets ici plus tard */}
      {/* Par exemple : <Tabs.Screen name="index" ... /> */}
    </Tabs>
  );
};

export default Layout;