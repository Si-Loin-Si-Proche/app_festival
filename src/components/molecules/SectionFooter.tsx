import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import FooterBackground from '../../assets/footer_background.svg';
import FooterBackgroundDark from '../../assets/footer_sombre.svg';

export default function SectionFooter() {
  const { colors } = useTheme();

  const isDarkMode =
    colors.text === '#FFFFFF' ||
    colors.text === '#fff' ||
    colors.text === '#F5F5F5';

  const openExternalLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (_error) {
      Alert.alert('Erreur', "Impossible d'ouvrir ce lien");
      /* eslint-disable-next-line no-console */
      console.error(_error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        {isDarkMode ? (
          <FooterBackgroundDark
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          />
        ) : (
          <FooterBackground
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.horizontalRow}>
          <TouchableOpacity
            onPress={() =>
              openExternalLink('https://www.lafermedubuisson.com/newsletter')
            }
          >
            <Typography
              variant="body"
              style={[styles.newsletterText, { color: colors.text }]}
            >
              s’inscrire à la newsletter
            </Typography>
          </TouchableOpacity>

          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() =>
                openExternalLink('https://www.facebook.com/fermedubuisson')
              }
            >
              <Icon name="facebook" size={30} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openExternalLink('https://www.instagram.com/lafermedubuisson/')
              }
            >
              <Icon name="instagram" size={30} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <Typography
          variant="caption"
          style={[styles.versionText, { color: colors.text }]}
        >
          v1.4.2 - 2026 Ferme du Buisson©
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.l,
    position: 'relative',
    paddingBottom: 70,
    marginBottom: -SPACING.l,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  content: {
    paddingHorizontal: SPACING.l,
    paddingTop: 40,
    paddingBottom: 50,
    alignItems: 'center',
    gap: 15,
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    flexWrap: 'wrap',
  },
  newsletterText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  versionText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
