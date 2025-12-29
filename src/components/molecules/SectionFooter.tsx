import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import FooterBackground from '../../assets/footer_background.svg';
import FooterBackgroundDark from '../../assets/footer_sombre.svg';

export default function SectionFooter() {
  const router = useRouter();
  const { colors } = useTheme();

  const isDarkMode =
    colors.text === '#FFFFFF' ||
    colors.text === '#fff' ||
    colors.text === '#F5F5F5';

  const openExternalLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erreur', "Impossible d'ouvrir ce lien : " + url);
    }
  };

  const navigateTo = (path: string) => {
    router.push(path as any);
  };

  return (
    <View style={styles.container}>
      {/* 3. AFFICHAGE CONDITIONNEL DU SVG DE FOND */}
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
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <TouchableOpacity onPress={() => navigateTo('/mentions_legales')}>
              <Typography
                variant="caption"
                style={[styles.linkText, { color: colors.text }]}
              >
                Mentions légales
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/politiques_conf')}>
              <Typography
                variant="caption"
                style={[styles.linkText, { color: colors.text }]}
              >
                Politique de confidentialité
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/cgu')}>
              <Typography
                variant="caption"
                style={[styles.linkText, { color: colors.text }]}
              >
                CGU
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/partenaires')}>
              <Typography
                variant="caption"
                style={[styles.linkText, { color: colors.text }]}
              >
                Partenaires
              </Typography>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.verticalSeparator, { backgroundColor: colors.text }]}
          />

          <View style={styles.rightColumn}>
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

            <View style={styles.socialRow}>
              <TouchableOpacity
                onPress={() =>
                  openExternalLink('https://www.facebook.com/fermedubuisson')
                }
              >
                <Icon name="facebook" size={32} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  openExternalLink(
                    'https://www.instagram.com/lafermedubuisson/?hl=fr'
                  )
                }
              >
                <Icon name="instagram" size={32} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Typography
          variant="caption"
          style={[styles.versionText, { color: colors.text }]}
        >
          v0.0 - 2026 Ferme du Buisson©
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: SPACING.l,
    position: 'relative',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  content: {
    paddingHorizontal: SPACING.l,
    paddingTop: 60,
    paddingBottom: 110,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  leftColumn: {
    flex: 0,
    gap: 12,
    alignItems: 'flex-start',
  },
  linkText: {
    textDecorationLine: 'none',
  },
  verticalSeparator: {
    width: 2,
    height: 120,
    marginHorizontal: SPACING.l,
    opacity: 1,
  },
  rightColumn: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  newsletterText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 20,
  },
  versionText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
