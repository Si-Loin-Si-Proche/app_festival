import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import SectionHeader from '../components/molecules/SectionHeader';
import MenuItem from '../components/molecules/MenuItem';
import Separator from '../components/atoms/Separator';
import Typography from '../components/atoms/Typography';
import ConfirmationModal from '../components/molecules/ConfirmationModal';
import { COLORS } from '../constants/theme';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function ReglagesScreen() {
  const router = useRouter();

  // ÉTATS
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [accessEnabled, setAccessEnabled] = useState(false);
  const [theme, setTheme] = useState('Clair');

  // État pour gérer l'ouverture du dropdown "Apparence"
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // État pour gérer la visibilité de la modale de reset
  const [isResetModalVisible, setResetModalVisible] = useState(false);

  // LOGIQUE
  const handleThemeSelect = (newTheme: string) => {
    setTheme(newTheme);
    setIsThemeOpen(false); // On ferme la liste après choix
  };

  const handleResetConfirm = () => {
    setResetModalVisible(false);
    console.log('Reset effectué !');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* 1. HEADER FIXE */}
      <SectionHeader
        logoSource={require('../assets/logo_ferme_du_buisson.png')}
        useImageTitle={true}
        showFavorite={false}
      />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          flexGrow: 1,
          paddingBottom: 100,
        }}
      >
        {/*BLOC 1 : NOTIFICATIONS*/}
        <MenuItem
          label="Notifications"
          type="switch"
          value={notifEnabled}
          onValueChange={setNotifEnabled}
        />
        <Separator marginVertical={5} thickness={2} />

        {/*BLOC 2 : APPARENCE (Dropdown intégré)*/}
        <MenuItem
          label="Apparence"
          type="dropdown"
          selectedValue={theme}
          options={['Clair', 'Sombre']}
          isExpanded={isThemeOpen}
          onPress={() => setIsThemeOpen(!isThemeOpen)}
          onSelectOption={handleThemeSelect}
        />
        <Separator marginVertical={5} thickness={2} />

        {/*BLOC 3 : ACCESSIBILITÉ*/}
        <MenuItem
          label="Accessibilité +"
          type="switch"
          value={accessEnabled}
          onValueChange={setAccessEnabled}
        />
        <Separator marginVertical={5} thickness={2} />

        {/*BLOC 4 : MENTIONS LÉGALES*/}
        <MenuItem
          label="Mentions légales"
          type="link"
          onPress={() => router.push('/mentions_legales' as any)}
        />
        <Separator marginVertical={5} thickness={2} />

        {/*BLOC 5 : REINITIALISATION*/}
        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => setResetModalVisible(true)}>
            <Typography
              variant="h2"
              style={{ color: COLORS.off, textAlign: 'left' }}
            >
              Réinitialiser l'application
            </Typography>
          </TouchableOpacity>
        </View>

        {/*VERSION*/}
        <View style={{ marginTop: 'auto' }}>
          <Typography
            variant="caption"
            style={{ textAlign: 'center', opacity: 0.5 }}
          >
            version 1.0.0
          </Typography>
        </View>
      </ScrollView>

      {/* MODALE DE CONFIRMATION (En dehors du ScrollView) */}
      <ConfirmationModal
        visible={isResetModalVisible}
        onConfirm={handleResetConfirm}
        onCancel={() => setResetModalVisible(false)}
      />
    </SafeAreaView>
  );
}
