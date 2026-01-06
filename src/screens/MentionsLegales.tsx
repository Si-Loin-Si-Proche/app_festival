import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
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
            <Typography style={{ fontWeight: 'bold' }}>
              Conception, réalisation :
            </Typography>{' '}
            artishoc{'\n'}
            <Typography style={{ fontWeight: 'bold' }}>
              Création Graphique :
            </Typography>{' '}
            Damien Behar{'\n'}
            <Typography style={{ fontWeight: 'bold' }}>
              Ce site est hébergé :
            </Typography>{' '}
            artishoc{'\n'}
            Artishoc{'\n'}6 cité joly 75011{'\n'}
            artishoc.com
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              D'après l'identité visuelle de :
            </Typography>{' '}
            Claude Grétillat - Atelier Poste 4{'\n'}
            <Typography style={{ fontWeight: 'bold' }}>
              Conception en interne :
            </Typography>{' '}
            équipe de la communication{'\n'}
            <Typography style={{ fontWeight: 'bold' }}>
              Rédaction du cahier des charges :
            </Typography>{' '}
            Sébastien Broquère - Edicit
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              Direction de la publication :
            </Typography>{' '}
            Marion Fouilland-Bousquet{'\n'}
            <Typography style={{ fontWeight: 'bold' }}>
              Coordination et animation éditoriale :
            </Typography>{' '}
            équipe de la communication{'\n'}
            <Typography style={{ fontWeight: 'bold' }}>
              Visuels :
            </Typography>{' '}
            créations graphiques par Atelier Poste 4, équipe de la
            communication, artistes et compagnies invité·.es{'\n'}
            <Typography style={{ fontWeight: 'bold' }}>
              Textes :
            </Typography>{' '}
            équipe de la communication (avec la collaboration de
            rédacteurs·rices extérieur·es), du Centre d'art et du Cinéma{'\n'}
            <Typography style={{ fontWeight: 'bold' }}>
              Polices :
            </Typography>{' '}
            typographie Main Gauche par Vincent Broquaire et caractère Bau par
            Christian Schwartz
          </Typography>
        </View>

        {/* LIENS HYPERTEXTES */}
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

        {/* POLITIQUE RSO */}
        <View style={styles.section}>
          <Typography variant="h2" style={{ color: colors.text }}>
            Notre politique RSO
          </Typography>
          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            Face aux grandes transformations de son époque, la Ferme du Buisson
            est attentive à l’impact de ses activités artistiques et
            culturelles. Ainsi, au fil des années, elle s’est engagée dans une
            démarche de Responsabilité Sociale des Organisations, la laissant
            transparaître dans toutes ses réflexions pour faire face aux défis
            environnementaux, économiques, sociaux et sociétaux que notre
            planète traverse.{'\n'}
            La Ferme du Buisson est une organisation culturelle de service
            public qui a toujours prôné la transmission et le vivre ensemble à
            l’instar de sa programmation. A ce titre, elle reconnaît pleinement
            sa responsabilité de mettre en lumière ces enjeux dans l'espace
            public et d’agir à son échelle.
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              Les engagements
            </Typography>
            {'\n'}
            La démarche RSO de la Ferme du Buisson traverse tous les défis et
            questionnements de notre société d’aujourd’hui. Elle l’engage à :
            {'\n'}
            améliorer son fonctionnement en suivant des principes de dialogue et
            de transparence de son action,{'\n'}
            garantir la santé et la sécurité de ses salarié·es,
            collaborateur·ices et publics,{'\n'}
            renforcer sa pratique de réemploi, d’éco-conception et de mise en
            œuvre des normes environnementales en vigueur, pour elle-même et ses
            prestataires,{'\n'}
            et enfin à défendre, pour toutes et tous, le droit à la dignité des
            personnes.
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              Le fonctionnement
            </Typography>
            {'\n'}
            Un diagnostic a été mené, conduisant à un plan d’action global et à
            l’instauration d’indicateurs précis pour mesurer l’efficacité des
            changements. Un référent RSO au sein de la structure a été nommé. Un
            groupe de travail RSO, composé de salariés des différents services
            de la Ferme du Buisson, se réunit tous les deux mois depuis janvier
            2022.
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              La sécurité et la santé des personnes
            </Typography>
            {'\n'}
            L’établissement public de coopération culturelle de la Ferme du
            Buisson produit un document unique d’évaluation des risques
            professionnels faisant office de schéma d’orientation et de mode
            d’emploi pour garantir la santé et la sécurité des équipes. Pour
            prévenir les risques psycho-sociaux et lutter contre les violences
            et le harcèlement sexiste et sexuel au travail, l’ensemble des
            équipes ont bénéficié d’une formation et un protocole de signalement
            et d’enquête indépendante ainsi que la désignation d’une responsable
            au sein de l’équipe sur ces questions ont été mis en place.
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              La responsabilité environnementale
            </Typography>
            {'\n'}
            L’établissement s’est engagé à supprimer le recours aux consommables
            plastiques, à recycler les déchets et à valoriser sa pratique de
            réemploi d’éléments de construction et de scénographie. La sobriété
            est encouragée matériellement avec la réduction des quantités de
            supports de communication imprimés, et numériquement avec la gestion
            des stocks de données au plus juste. Le parc de lumières de
            l’institution a été renouvelé et remplacé par un système d’ampoules
            de basse consommation. L’établissement s’engage à la réduction de
            son empreinte carbone en privilégiant les transports
            éco-responsables pour ses équipes comme ses collaborateur·ices lors
            de leurs déplacements. La mise en œuvre d’une prime à la mobilité
            douce pour les salarié·es a été actée.
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              Le droit à la dignité des personnes
            </Typography>
            {'\n'}
            L’accès égal à l’emploi guide la Ferme du Buisson dans ses
            recrutements, menés avec un souci de diversité et d’inclusion. Par
            ailleurs, la Ferme du Buisson s’engage à faciliter le recrutement de
            femmes dans des filières traditionnellement masculines. La parité
            dans la programmation est un objectif défendu par la gouvernance de
            l’établissement et ses directions artistiques (scène nationale,
            centre d’art contemporain, cinéma) et se déploie concrètement chaque
            saison.
          </Typography>

          <Typography
            variant="body"
            style={[styles.paragraph, { color: colors.text }]}
          >
            Si la Ferme du Buisson met cette démarche au cœur de ses réflexions,
            elle est toujours dans un processus de transition qui nécessite un
            travail continu. De ce fait et dans une volonté de progresser, elle
            évolue au fur et à mesure en agissant de la meilleure manière en
            fonction des défis auxquels nous faisons face.
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
    paddingBottom: 20,
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
  logoContainer: {
    marginBottom: SPACING.m,
    alignItems: 'flex-start',
  },
  logoArtishoc: {
    width: 150,
    height: 60,
  },
});
