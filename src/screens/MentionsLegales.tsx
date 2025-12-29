import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/molecules/SectionHeader';
import Typography from '../components/atoms/Typography';
import { SPACING } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function MentionsLegalesScreen() {
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
          Mentions légales
        </Typography>

        <View style={styles.section}>
          <Typography variant="h2" style={{ color: colors.text }}>
            Responsabilité éditoriale
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            La Ferme du Buisson{'\n'}
            Établissement Public de Coopération Culturelle{'\n'}
            Allée de la Ferme - Noisiel{'\n'}
            77448 Marne-la-Vallée Cedex 2{'\n'}
            01 64 62 77 00{'\n'}
            SIRET : 752 136 523 000 12{'\n'}
            APE : 90001Z{'\n'}
            TVA intracommunautaire : FR 43 752 136 523
          </Typography>

          <Typography
            variant="caption"
            style={[styles.paragraph, { color: colors.text }]}
          >
            La Ferme du Buisson subventionnée par la Communauté d'agglomération
            Paris - Vallée de la Marne, le Ministère de la Culture - Direction
            régionale des affaires culturelles d'Île-de-France, le Conseil
            départemental de Seine-et-Marne et la Région Île-de-France. Elle
            reçoit le soutien de l'EPAmarne - Établissement public d'aménagement
            de Marne-la-Vallée et du Ministère chargé de la Ville. Dalkia est
            partenaire de la Ferme du Buisson.
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={{ color: colors.text }}>
            Conception et réalisation
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Conception, réalisation :
            </Typography>{' '}
            artishoc{'\n'}
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Création Graphique :
            </Typography>{' '}
            Damien Behar{'\n'}
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Ce site est hébergé :
            </Typography>{' '}
            artishoc{'\n'}
            Artishoc - 6 cité joly 75011 - artishoc.com
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              D'après l'identité visuelle de :
            </Typography>{' '}
            Claude Grétillat - Atelier Poste 4{'\n'}
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Conception en interne :
            </Typography>{' '}
            équipe de la communication{'\n'}
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Rédaction du cahier des charges :
            </Typography>{' '}
            Sébastien Broquère - Edicit
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Direction de la publication :
            </Typography>{' '}
            Marion Fouilland-Bousquet{'\n'}
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Coordination et animation éditoriale :
            </Typography>{' '}
            équipe de la communication{'\n'}
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Visuels :
            </Typography>{' '}
            créations graphiques par Atelier Poste 4, équipe de la
            communication, artistes et compagnies invité·.es{'\n'}
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Textes :
            </Typography>{' '}
            équipe de la communication (avec la collaboration de
            rédacteurs·rices extérieur·es), du Centre d'art et du Cinéma{'\n'}
            <Typography variant="body" style={{ fontWeight: 'bold' }}>
              Polices :
            </Typography>{' '}
            typographie Main Gauche par Vincent Broquaire et caractère Bau par
            Christian Schwartz
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={{ color: colors.text }}>
            Liens hypertextes
          </Typography>
          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            La Ferme du Buisson autorise la mise en place d'un lien hypertexte
            pointant vers son contenu dès lors qu'il ne crée pas de confusion
            sur la source des services et/ou contenus produits et/ou détenus par
            la Ferme du Buisson.
          </Typography>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
  },
});
