import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Typography from '../atoms/Typography';
import FavoriteButton from '../atoms/LikeButton';
import Separator from '../atoms/Separator';
import { SPACING, COLORS } from '../../constants/theme';

interface SectionHeaderProps {
  title: string;
  logoSource: ImageSourcePropType;
}

export default function SectionHeader({
  title,
  logoSource,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      {/* PARTIE HAUTE : CONTENU (Logo, Titre, Bouton) */}
      <View style={styles.contentRow}>
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />

        <View style={styles.titleContainer}>
          <Typography variant="h2" style={styles.title}>
            {title}
          </Typography>
        </View>

        <FavoriteButton
          size="large"
          backgroundColor={COLORS.secondary}
          activeColor={COLORS.text}
        />
      </View>

      {/* PARTIE BASSE : LE SÉPARATEUR */}
      <Separator thickness={2} marginVertical={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
  },
  logo: {
    width: 70,
    height: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 0,
  },
});
