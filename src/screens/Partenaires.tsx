import React from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/molecules/SectionHeader';
import Typography from '../components/atoms/Typography';
import { COLORS, SPACING } from '../constants/theme';

// Import des images locales
const partnerImg1 = require('../assets/partenaires_1.png');
const partnerImg2 = require('../assets/partenaires_2.png');
const partnerImg3 = require('../assets/partenaires_3.png');

export default function PartenairesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader
        showBackButton={true}
        useImageTitle={true}
        showFavorite={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre de la page */}
        <Typography variant="h1" style={styles.pageTitle}>
          Nos partenaires
        </Typography>

        {/* --- LISTE DES IMAGES EMPILÉES --- */}

        {/* Image 1 */}
        <View style={styles.imageWrapper}>
          <Image
            source={partnerImg1}
            style={styles.partnerImage}
            resizeMode="contain" // Important pour ne pas déformer les logos
          />
        </View>

        {/* Image 2 */}
        <View style={styles.imageWrapper}>
          <Image
            source={partnerImg2}
            style={styles.partnerImage}
            resizeMode="contain"
          />
        </View>

        {/* Image 3 */}
        <View style={styles.imageWrapper}>
          <Image
            source={partnerImg3}
            style={styles.partnerImage}
            resizeMode="contain"
          />
        </View>

        {/* Espace en bas pour le scroll */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fond blanc
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 60,
  },
  pageTitle: {
    marginTop: SPACING.m,
    marginBottom: SPACING.s,
  },
  introText: {
    marginBottom: SPACING.xl,
  },

  // Wrapper pour espacer les blocs d'images
  imageWrapper: {
    alignItems: 'center',
    width: '100%',
  },

  // Style de l'image elle-même
  partnerImage: {
    width: '100%', // Prend toute la largeur disponible (moins le padding du parent)
    height: 300, // Hauteur arbitraire suffisante pour afficher les logos sans les couper. Ajuste si besoin.
  },
});
