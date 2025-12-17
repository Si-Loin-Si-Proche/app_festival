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
import { COLORS, SPACING, FONTS } from '../../constants/theme';

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
          {/* COLONNE GAUCHE */}
          <View style={styles.leftColumn}>
            <TouchableOpacity onPress={() => navigateTo('/mentions_legales')}>
              <Typography variant="caption" style={styles.linkText}>
                Mentions légales
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('/politiques_conf')}>
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

          {/* SÉPARATEUR VERTICAL AGRANDI */}
          <View style={styles.verticalSeparator} />

          {/* COLONNE DROITE (Newsletter + Réseaux) */}
          <View style={styles.rightColumn}>
            {/* 1. LIEN NEWSLETTER */}
            <TouchableOpacity
              onPress={() =>
                openExternalLink('https://www.lafermedubuisson.com/newsletter')
              }
            >
              <Typography variant="body" style={styles.newsletterText}>
                s’inscrire à la newsletter
              </Typography>
            </TouchableOpacity>

            {/* 2. RÉSEAUX SOCIAUX (Côte à côte) */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                onPress={() =>
                  openExternalLink('https://www.facebook.com/fermedubuisson')
                }
              >
                <Icon name="facebook" size={32} color={COLORS.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  openExternalLink(
                    'https://www.instagram.com/lafermedubuisson/?hl=fr'
                  )
                }
              >
                <Icon name="instagram" size={32} color={COLORS.text} />
              </TouchableOpacity>
            </View>
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
    alignItems: 'center', // Centre verticalement par rapport au séparateur
    marginBottom: SPACING.l,
  },
  leftColumn: {
    flex: 0,
    gap: 12,
    alignItems: 'flex-start',
  },

  linkText: {
    color: COLORS.text,
    textDecorationLine: 'none',
  },

  verticalSeparator: {
    width: 2,
    height: 120,
    backgroundColor: COLORS.text,
    marginHorizontal: SPACING.l, // J'ai réduit un peu la marge (l -> m) pour gagner de la place
    opacity: 1,
  },

  rightColumn: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },

  newsletterText: {
    color: COLORS.text,
    textDecorationLine: 'underline', // Souligné comme sur la photo
    fontWeight: 'bold', // Gras comme sur la photo
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row', // Les icônes restent côte à côte
    gap: 20,
  },
  versionText: {
    textAlign: 'center',
    color: COLORS.text,
    opacity: 0.7,
  },
});
