import React from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/molecules/SectionHeader';
import Typography from '../components/atoms/Typography';
import { SPACING } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

const partnerImg1 = require('../assets/partenaires_1.png');
const partnerImg2 = require('../assets/partenaires_2.png');
const partnerImg3 = require('../assets/partenaires_3.png');

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

        <View style={styles.imageWrapper}>
          <Image
            source={partnerImg1}
            style={styles.partnerImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={partnerImg2}
            style={styles.partnerImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={partnerImg3}
            style={styles.partnerImage}
            resizeMode="contain"
          />
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
  },
  pageTitle: {
    marginTop: SPACING.m,
    marginBottom: SPACING.s,
  },
  imageWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  partnerImage: {
    width: '100%',
    height: 300,
  },
});
