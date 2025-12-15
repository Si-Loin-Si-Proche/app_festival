import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Typography from '../atoms/Typography';
import { COLORS, SPACING, SHADOWS } from '../../constants/theme';
import { MAP_IMAGE_SOURCE } from '../../constants/mapData';

export default function MapBlock() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Titre avec le style "- plan du site" */}
      <Typography variant="h2" style={styles.title}>
        — plan du site
      </Typography>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push('/map')}
        style={styles.cardContainer}
      >
        {/* L'image est contenue et coupée (overflow hidden) pour respecter les bords ronds */}
        <View style={styles.imageWrapper}>
          <Image
            source={MAP_IMAGE_SOURCE}
            style={styles.mapImage}
            resizeMode="cover"
          />

          <View style={styles.overlay}>
            <Typography
              variant="caption"
              style={{ color: 'white', fontWeight: 'bold' }}
            >
              Toucher pour agrandir
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.l,
  },
  title: {
    marginTop: SPACING.s,
    marginBottom: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  cardContainer: {
    marginHorizontal: SPACING.m,
    height: 180,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.text,

    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
});
