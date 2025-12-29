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
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

// 1. IMPORT DES DEUX SVG
import TitleLogoBlack from '../../assets/logo_si_loin_si_proche.svg';
import TitleLogoWhite from '../../assets/logo_slsp_blanc.svg';

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
  const { colors } = useTheme();

  const isDarkMode =
    colors.text === '#FFFFFF' ||
    colors.text === '#fff' ||
    colors.text === '#F5F5F5';

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

  const handleLogoPress = () => {
    router.replace('/');
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
    >
      <View style={styles.contentRow}>
        {/* === GAUCHE === */}
        {showBackButton ? (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.leftAction}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Icon
              name="arrowRight"
              size={32}
              color={colors.text}
              style={{ transform: [{ rotate: '180deg' }] }}
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
                style={[styles.logo, { tintColor: colors.text }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )
        )}

        {/* === CENTRE === */}
        <View style={styles.centerContainer}>
          {useImageTitle ? (
            // 3. AFFICHAGE CONDITIONNEL DU SVG
            isDarkMode ? (
              <TitleLogoWhite width={160} height={50} />
            ) : (
              <TitleLogoBlack width={160} height={50} />
            )
          ) : (
            <Typography variant="h2" style={styles.title}>
              {title || ''}
            </Typography>
          )}
        </View>

        {/* === DROITE === */}
        {showFavorite && (
          <View style={styles.rightAction}>
            <FavoriteButton
              size="large"
              backgroundColor={colors.secondary}
              activeColor={colors.text}
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
  container: {
    width: '100%',
    zIndex: 10,
  },
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
  title: {
    textAlign: 'center',
    marginBottom: 0,
  },
  rightAction: {
    position: 'absolute',
    right: SPACING.m,
    zIndex: 10,
  },
});
