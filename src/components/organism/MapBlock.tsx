import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Typography from '../atoms/Typography';
import { SPACING, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { MAP_IMAGE_SOURCE } from '../../constants/mapData';
import { useAppHaptics } from '../../hooks/useAppHaptics';

export default function MapBlock() {
  const router = useRouter();
  const { colors } = useTheme();
  const { medium } = useAppHaptics();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          medium();
          router.push('/map');
        }}
        style={[
          styles.cardContainer,
          {
            backgroundColor: colors.card,
            borderColor: colors.text,
          },
        ]}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={MAP_IMAGE_SOURCE}
            style={StyleSheet.absoluteFillObject}
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
    borderRadius: 20,
    borderWidth: 2,
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
