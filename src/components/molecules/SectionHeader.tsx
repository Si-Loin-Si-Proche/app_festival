import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Typography from '../atoms/Typography';
import FavoriteButton from '../atoms/LikeButton';
import Separator from '../atoms/Separator';
import { SPACING, COLORS } from '../../constants/theme';

interface SectionHeaderProps {
  title: string;
  logoSource: ImageSourcePropType;
  showFavorite?: boolean;
}

export default function SectionHeader({
  title,
  logoSource,
  showFavorite = true,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contentRow}>
        {/* LOGO*/}
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />

        {/* TITRE*/}
        <View style={styles.titleContainer}>
          <Typography variant="h2" style={styles.title}>
            {title}
          </Typography>
        </View>

        {/* BOUTON*/}
        {showFavorite && (
          <View style={styles.rightAction}>
            <FavoriteButton
              size="large"
              backgroundColor={COLORS.secondary}
              activeColor={COLORS.text}
            />
          </View>
        )}
      </View>

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
    justifyContent: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    position: 'relative',
    minHeight: 60,
  },
  logo: {
    width: 70,
    height: 40,
    position: 'absolute',
    left: SPACING.m,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    maxWidth: '60%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 0,
  },

  rightAction: {
    position: 'absolute',
    right: SPACING.m,
    zIndex: 1,
  },
});
