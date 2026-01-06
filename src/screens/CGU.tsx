import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/molecules/SectionHeader';
import Typography from '../components/atoms/Typography';
import { SPACING } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function CGUScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <SectionHeader
        showBackButton={true}
        useImageTitle={true}
        showFavorite={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Typography
          variant="h1"
          style={[styles.pageTitle, { color: colors.text }]}
        >
          Conditions Générales d'Utilisation
        </Typography>

        <View style={styles.section}>
          <Typography variant="h2" style={{ color: colors.text }}>
            Propriété intellectuelle
          </Typography>
          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            Toute reproduction, toute représentation totale ou partielle, toute
            utilisation, toute adaptation, toute mise à disposition ou
            modification de ces éléments par quelque procédé que ce soit, par
            quelque personne que ce soit et par quelque moyen que ce soit
            (notamment la vente, la commercialisation, la location, etc.) sans
            l’autorisation expresse de la Ferme du Buisson, des éventuels
            auteurs ou de leurs ayant droits est strictement interdite et
            constitue un délit de contrefaçon au sens du code de la propriété
            intellectuelle.
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={{ color: colors.text }}>
            Responsabilité
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            Les liens hypertextes mis en place dans le cadre du présent site
            Internet en direction d’autres ressources présentes sur le réseau
            Internet ne sauraient engager la responsabilité de la Ferme du
            Buisson.
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            Nous ne garantissons pas que ce site soit exempt de défaut, d'erreur
            ou d’omission et qu'il corresponde exactement à l'usage auquel
            l'utilisateur le destine. Nous ne pouvons en aucun cas être tenus
            responsables des éventuels défauts, erreurs ou omissions existant
            sur ce site.
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            Chaque utilisateur est seul responsable de l'usage qu’il fait des
            informations fournies par le site Internet de la Ferme du Buisson,
            qui ne pourra en aucun cas être tenue responsable de tous dommages
            directs ou indirects découlant de l'utilisation de ces informations
            par l'utilisateur.
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 60,
  },
  pageTitle: {
    marginBottom: SPACING.l,
    marginTop: SPACING.m,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  paragraph: {
    marginBottom: SPACING.m,
    textAlign: 'justify',
    lineHeight: 24,
  },
});
