import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/molecules/SectionHeader';
import Typography from '../components/atoms/Typography';
import { COLORS, SPACING } from '../constants/theme';

export default function PolitiqueConfScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* HEADER : Retour + Logo Centre + Pas de Favori */}
      <SectionHeader
        showBackButton={true}
        useImageTitle={true}
        showFavorite={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="h1" style={styles.pageTitle}>
          Politique de confidentialité
        </Typography>

        <View style={styles.section}>
          <Typography variant="h2">
            Protection de la vie privée et confidentialité
          </Typography>

          <Typography variant="body" style={styles.paragraph}>
            En application des articles 27 et 34 de la loi dite "Informatique et
            libertés" n° 78-17 du 6 janvier 1978, vous disposez d’un droit de
            modification ou de suppression des données qui vous concernent.
          </Typography>

          <Typography variant="body" style={styles.paragraph}>
            Si vous souhaitez exercer ce droit, vous pouvez, à tout moment,
            supprimer votre inscription à notre lettre d’information
            électronique via le lien de désinscription, ou nous écrire.
          </Typography>

          <Typography variant="body" style={styles.paragraph}>
            Les informations collectées et intégrées à nos bases de données font
            l'objet d'une utilisation uniquement à des fins d'informations pour
            la Ferme du Buisson, ou sont exceptionnellement cédées à nos
            partenaires culturels lorsque vous en avez donné l'autorisation.
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  pageTitle: {
    marginBottom: SPACING.l,
    marginTop: SPACING.m,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  paragraph: {
    marginBottom: SPACING.m,
    textAlign: 'justify',
    lineHeight: 24,
  },
});
