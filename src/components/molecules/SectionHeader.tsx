import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import Typography from '../atoms/Typography';
import FavoriteButton from '../atoms/LikeButton';
import Separator from '../atoms/Separator';
import Icon from '../atoms/Icon';
import { SPACING, COLORS } from '../../constants/theme';

import TitleLogo from '../../assets/logo_si_loin_si_proche.svg';

interface SectionHeaderProps {
  title?: string;
  logoSource?: ImageSourcePropType;
  useImageTitle?: boolean;
  showBackButton?: boolean;
  showFavorite?: boolean;
  onBack?: () => void;
  style?: ViewStyle;
}

export default function SectionHeader({
  title,
  logoSource,
  useImageTitle = false,
  showBackButton = false,
  showFavorite = true,
  onBack,
  style,
}: SectionHeaderProps) {
  const router = useRouter();

  // Gestion du retour en arrière
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // Gestion du clic sur le logo (Retour Home)
  const handleLogoPress = () => {
    router.replace('/');
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.contentRow}>
        {/* === GAUCHE : LOGO ou RETOUR === */}
        {showBackButton ? (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.leftAction}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Icon
              name="arrowRight"
              size={32}
              color={COLORS.text}
              style={{ transform: [{ rotate: '180deg' }] }} // Flèche retour
            />
          </TouchableOpacity>
        ) : (
          logoSource && (
            <TouchableOpacity
              onPress={handleLogoPress}
              activeOpacity={0.7}
              style={styles.leftAction}
            >
              <Image
                source={logoSource}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )
        )}

        {/* === CENTRE : TITRE TEXTE ou IMAGE SVG === */}
        <View style={styles.centerContainer}>
          {useImageTitle ? (
            <TitleLogo width={160} height={50} />
          ) : (
            <Typography variant="h2" style={styles.title}>
              {title || ''}
            </Typography>
          )}
        </View>

        {/* === DROITE : FAVORI === */}
        {showFavorite && (
          <View style={styles.rightAction}>
            <FavoriteButton
              size="large"
              // 1. Fond pêche
              backgroundColor={COLORS.secondary}
              // 2. Cœur noir
              activeColor={COLORS.text}
              // 3. L'ASTUCE : On force "isLiked" pour que le cœur soit rempli (fill) et utilise activeColor
              isLiked={true}
            />
          </View>
        )}
      </View>

      <Separator thickness={2} marginVertical={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', backgroundColor: 'white', zIndex: 10 },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    position: 'relative',
    minHeight: 80,
  },
  leftAction: {
    position: 'absolute',
    left: SPACING.m,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 40,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '60%',
  },
  title: { textAlign: 'center', marginBottom: 0 },
  rightAction: { position: 'absolute', right: SPACING.m, zIndex: 10 },
});
