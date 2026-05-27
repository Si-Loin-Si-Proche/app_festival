import React from 'react';
import { ScrollView, StyleSheet, Image, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/molecules/SectionHeader';
import Typography from '../components/atoms/Typography';
import { SPACING } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

// Import des assets
const partnerImg1 = require('../assets/partenaire1.png');
const partnerImg2 = require('../assets/partenaire2.png');
const partnerImg3 = require('../assets/partenaire3.png');
const partnerImg4 = require('../assets/partenaire4.png');
const partnerImg5 = require('../assets/partenaire5.png');
const partnerImg6 = require('../assets/partenaire6.png');

const FullWidthImage = ({ source }: { source: any }) => {
  if (Platform.OS === 'web') {
    return (
      <Image
        source={source}
        style={{ width: '100%', height: undefined, aspectRatio: 2 }}
        resizeMode="contain"
      />
    );
  }

  const { width, height } = Image.resolveAssetSource(source);
  const ratio = width / height;

  return (
    <Image
      source={source}
      style={{
        width: '100%',
        aspectRatio: ratio,
        height: undefined,
      }}
      resizeMode="contain"
    />
  );
};

export default function PartenairesScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <SectionHeader
        showBackButton={true}
        useImageTitle={true}
        showFavorite={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Typography
          variant="h1"
          style={[styles.pageTitle, { color: colors.text }]}
        >
          Nos partenaires
        </Typography>

        {/* 1. Subventions */}
        <View style={styles.section}>
          <Typography
            variant="h3"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            La Ferme du Buisson est subventionnée par
          </Typography>
          <FullWidthImage source={partnerImg1} />
        </View>

        {/* 2. Soutien */}
        <View style={styles.section}>
          <Typography
            variant="h3"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Elle reçoit le soutien de
          </Typography>
          <FullWidthImage source={partnerImg2} />
        </View>

        {/* 3. Centre d'art */}
        <View style={styles.section}>
          <Typography
            variant="h3"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Partenaires du Centre d'art
          </Typography>
          <FullWidthImage source={partnerImg3} />
        </View>

        {/* 4. Cinéma */}
        <View style={styles.section}>
          <Typography
            variant="h3"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Partenaires du Cinéma
          </Typography>
          <FullWidthImage source={partnerImg4} />
        </View>

        {/* 5. Territoire */}
        <View style={styles.section}>
          <Typography
            variant="h3"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Partenaires du territoire
          </Typography>
          <FullWidthImage source={partnerImg5} />
        </View>

        {/* 6. Médias */}
        <View style={styles.section}>
          <Typography
            variant="h3"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Partenaires médias
          </Typography>
          <FullWidthImage source={partnerImg6} />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 60,
    gap: SPACING.xl,
  },
  pageTitle: {
    marginTop: SPACING.m,
    marginBottom: SPACING.s,
  },
  section: {
    gap: SPACING.m,
    width: '100%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
