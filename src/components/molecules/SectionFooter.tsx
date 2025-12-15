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
import FooterBackground from '../../assets/footer_background.svg';
import { COLORS, SPACING } from '../../constants/theme';

export default function SectionFooter() {
  const router = useRouter();

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
      <View style={styles.backgroundContainer}>
        <FooterBackground
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        />
      </View>

      <View style={styles.content}>
        {/* CONTENU PRINCIPAL */}
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <TouchableOpacity onPress={() => navigateTo('/mentions')}>
              <Typography variant="caption" style={styles.linkText}>
                Mentions légales
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/confidentialite')}>
              <Typography variant="caption" style={styles.linkText}>
                Politique de confidentialité
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/cgu')}>
              <Typography variant="caption" style={styles.linkText}>
                CGU
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/partenaires')}>
              <Typography variant="caption" style={styles.linkText}>
                Partenaires
              </Typography>
            </TouchableOpacity>
          </View>

          <View style={styles.verticalSeparator} />

          <View style={styles.rightColumn}>
            <TouchableOpacity
              onPress={() =>
                openExternalLink('https://www.facebook.com/fermedubuisson')
              }
            >
              <Icon name="facebook" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openExternalLink(
                  'https://www.instagram.com/lafermedubuisson/?hl=fr'
                )
              }
            >
              <Icon name="instagram" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Typography variant="caption" style={styles.versionText}>
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
    flex: 1,
    gap: 12,
    alignItems: 'flex-start',
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'none',
  },
  verticalSeparator: {
    width: 1.5,
    height: 100,
    backgroundColor: 'white',
    marginHorizontal: SPACING.l,
    opacity: 1,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  versionText: {
    textAlign: 'center',
    color: '#CCCCCC',
    opacity: 0.7,
  },
});
