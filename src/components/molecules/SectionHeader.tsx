import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Typography from '../atoms/Typography';
import FavoriteButton from '../atoms/LikeButton'; // Ou 'FavoriteButton' selon ton nom de fichier
import Separator from '../atoms/Separator'; // <--- 1. Import du Séparateur
import { SPACING, COLORS } from '../../constants/theme';

interface SectionHeaderProps {
  title: string;
  logoSource: ImageSourcePropType;
}

export default function SectionHeader({
  title,
  logoSource,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      {/* PARTIE HAUTE : CONTENU (Logo, Titre, Bouton) */}
      <View style={styles.contentRow}>
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />

        <View style={styles.titleContainer}>
          <Typography variant="h2" style={styles.title}>
            {title}
          </Typography>
        </View>

        <FavoriteButton
          size="large"
          backgroundColor={COLORS.secondary}
          activeColor={COLORS.text}
        />
      </View>

      {/* PARTIE BASSE : LE SÉPARATEUR */}
      {/* marginVertical={0} pour qu'il soit bien collé sans espace supplémentaire */}
      <Separator thickness={2} marginVertical={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Le conteneur principal devient une colonne par défaut
    width: '100%',
    backgroundColor: 'transparent',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
  },
  logo: {
    width: 70,
    height: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 0,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     backgroundColor: 'transparent',
//   },
//   contentRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // CHANGEMENT MAJEUR : On centre tout par défaut
//     justifyContent: 'center',
//     paddingHorizontal: SPACING.m,
//     // On met exactement le même padding vertical que PageHeader
//     paddingVertical: SPACING.l,
//     position: 'relative', // Important pour les enfants en absolu
//   },

//   logo: {
//     width: 60,
//     height: 40,
//     // MAGIE : On le sort du flux pour le coller à gauche
//     position: 'absolute',
//     left: SPACING.m,
//     zIndex: 10,
//   },

//   titleContainer: {
//     // Plus besoin de flex: 1
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   title: {
//     textAlign: 'center',
//     marginBottom: 0,
//   },

//   // Nouveau style pour le conteneur du bouton à droite
//   rightAction: {
//     position: 'absolute',
//     right: SPACING.m, // Collé à droite
//     zIndex: 10,
//   }
// });
