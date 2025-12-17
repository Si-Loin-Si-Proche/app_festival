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

// Import du SVG pour le titre (Assure-toi que ton config supporte les SVG)
import TitleLogo from '../../assets/logo_si_loin_si_proche.svg';

interface SectionHeaderProps {
  title?: string; // Texte du titre (optionnel si useImageTitle est true)
  logoSource?: ImageSourcePropType; // Logo de gauche (Ferme du Buisson)

  // --- OPTIONS D'AFFICHAGE ---
  useImageTitle?: boolean; // Si true, remplace le texte par le SVG "Si loin si proche"
  showBackButton?: boolean; // Si true, remplace le logo par une flèche retour
  showFavorite?: boolean; // Afficher le cœur à droite ?

  // --- ACTIONS ---
  onBack?: () => void; // Action personnalisée pour le retour
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
            // Affiche le SVG "Si loin si proche"
            <TitleLogo width={160} height={50} />
          ) : (
            // Affiche le texte standard
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
  container: { width: '100%', backgroundColor: 'transparent', zIndex: 10 },
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

  // Conteneur Central
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '60%', // Empêche le chevauchement
  },
  title: { textAlign: 'center', marginBottom: 0 },

  // Élément Droite (Cœur) en absolu
  rightAction: { position: 'absolute', right: SPACING.m, zIndex: 10 },
});
