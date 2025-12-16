import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/molecules/SectionHeader';
import MapBlock from '../components/organism/MapBlock';
import { COLORS, SPACING } from '../constants/theme';

// Importe ton logo ou utilise un require
const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function InfosScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader
        logoSource={require('../assets/logo_ferme_du_buisson.png')}
        useImageTitle={true}
        showFavorite={true}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- LE BLOC CARTE --- */}
        <MapBlock />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: SPACING.m,
  },
  introText: {
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.l,
    textAlign: 'center',
  },
});
