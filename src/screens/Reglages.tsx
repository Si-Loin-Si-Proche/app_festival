import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../hooks/useSettings';
import SectionHeader from '../components/molecules/SectionHeader';
import MenuItem from '../components/molecules/MenuItem';
import Separator from '../components/atoms/Separator';
import Typography from '../components/atoms/Typography';
import ConfirmationModal from '../components/molecules/ConfirmationModal';

export default function ReglagesScreen() {
  const {
    colors,
    notifEnabled,
    vibrationEnabled,
    isAccessible,
    currentThemeLabel,
    isThemeOpen,
    isResetModalVisible,
    setIsThemeOpen,
    setResetModalVisible,
    handleToggleNotifications,
    handleToggleVibration,
    handleThemeSelect,
    handleAccessToggle,
    handleResetConfirm,
    router,
  } = useSettings();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
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
        {/* BLOC 1 : NOTIFICATIONS & VIBRATIONS — [WEB-APP] désactivés */}
        {/* <MenuItem
          label="Notifications"
          type="switch"
          value={notifEnabled}
          onValueChange={handleToggleNotifications}
        />
        <Separator marginVertical={5} thickness={2} /> */}

        {/* <MenuItem
          label="Vibrations"
          type="switch"
          value={vibrationEnabled}
          onValueChange={handleToggleVibration}
        />
        <Separator marginVertical={5} thickness={2} /> */}

        {/* BLOC 2 : APPARENCE */}
        <MenuItem
          label="Apparence"
          type="dropdown"
          selectedValue={currentThemeLabel}
          options={['Clair', 'Sombre']}
          isExpanded={isThemeOpen}
          onPress={() => setIsThemeOpen(!isThemeOpen)}
          onSelectOption={handleThemeSelect}
        />
        <Separator marginVertical={5} thickness={2} />

        {/* BLOC 3 : ACCESSIBILITÉ */}
        <MenuItem
          label="Accessibilité +"
          type="switch"
          value={isAccessible}
          onValueChange={handleAccessToggle}
        />
        <Separator marginVertical={5} thickness={2} />

        {/* BLOC 4 : MENTIONS LÉGALES & PARTENAIRES */}
        <MenuItem
          label="Mentions légales"
          type="link"
          onPress={() => router.push('/mentions_legales' as any)}
        />
        <Separator marginVertical={5} thickness={2} />

        {/* BLOC 5 : PARTENAIRES */}
        <MenuItem
          label="Nos partenaires"
          type="link"
          onPress={() => router.push('/partenaires' as any)}
        />
        <Separator marginVertical={5} thickness={2} />

        {/* BLOC 6 : REINITIALISATION */}
        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => setResetModalVisible(true)}>
            <Typography
              variant="h2"
              style={{ color: colors.off, textAlign: 'left' }}
            >
              Réinitialiser l'application
            </Typography>
          </TouchableOpacity>
        </View>

        {/* VERSION */}
        <View style={{ marginTop: 'auto' }}>
          <Typography
            variant="caption"
            style={{ textAlign: 'center', opacity: 0.5 }}
          >
            v1.5.0 - 2026 Ferme du Buisson©
          </Typography>
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={isResetModalVisible}
        onConfirm={handleResetConfirm}
        onCancel={() => setResetModalVisible(false)}
      />
    </SafeAreaView>
  );
}
