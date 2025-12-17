import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/molecules/SectionHeader';
import Typography from '../components/atoms/Typography';
import { COLORS, SPACING } from '../constants/theme';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function MentionsLegalesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader
        showBackButton={true}
        useImageTitle={true}
        showFavorite={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITRE DE LA PAGE */}
        <Typography variant="h1" style={styles.pageTitle}>
          Mentions légales
        </Typography>

        {/* --- SECTION 1 : RESPONSABILITÉ --- */}
        <View style={styles.section}>
          <Typography variant="h2">Responsabilité éditoriale</Typography>

          <Typography variant="body" style={styles.paragraph}>
            La Ferme du Buisson{'\n'}
            Établissement Public de Coopération Culturelle{'\n'}
            Allée de la Ferme - Noisiel{'\n'}
            77448 Marne-la-Vallée Cedex 2{'\n'}
            01 64 62 77 00{'\n'}
            SIRET : 752 136 523 000 12{'\n'}
            APE : 90001Z{'\n'}
            TVA intracommunautaire : FR 43 752 136 523
          </Typography>

          <Typography variant="caption" style={styles.paragraph}>
            La Ferme du Buisson subventionnée par la Communauté d'agglomération
            Paris - Vallée de la Marne, le Ministère de la Culture - Direction
            régionale des affaires culturelles d'Île-de-France, le Conseil
            départemental de Seine-et-Marne et la Région Île-de-France. Elle
            reçoit le soutien de l'EPAmarne - Établissement public d'aménagement
            de Marne-la-Vallée et du Ministère chargé de la Ville. Dalkia est
            partenaire de la Ferme du Buisson.
          </Typography>
        </View>

        {/* --- SECTION 2 : CONCEPTION --- */}
        <View style={styles.section}>
          <Typography variant="h2">Conception et réalisation</Typography>

          <Typography variant="body" style={styles.paragraph}>
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

          <Typography variant="body" style={styles.paragraph}>
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

          <Typography variant="body" style={styles.paragraph}>
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

        {/* --- SECTION 3 : PROPRIÉTÉ INTELLECTUELLE --- */}
        <View style={styles.section}>
          <Typography variant="h2">Propriété intellectuelle</Typography>
          <Typography variant="body" style={styles.paragraph}>
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

        {/* --- SECTION 4 : CONFIDENTIALITÉ --- */}
        <View style={styles.section}>
          <Typography variant="h2">
            Protection de la vie privée et confidentialité
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            En application des articles 27 et 34 de la loi dite "Informatique et
            libertés" n° 78-17 du 6 janvier 1978, vous disposez d’un droit de
            modification ou de suppression des données qui vous concernent. Si
            vous souhaitez exercer ce droit, vous pouvez, à tout moment,
            supprimer votre inscription à notre lettre d’information
            électronique via le lien de désinscription, ou nous écrire. Les
            informations collectées et intrégrées à nos bases de données font
            l’objet d'une utilisation uniquement à des fins d'informations pour
            la Ferme du Buisson, ou sont exceptionnellement cédées à nos
            partenaires culturels lorsque vous en avez donné l'autorisation.
          </Typography>
        </View>

        {/* --- SECTION 5 : RESPONSABILITÉ --- */}
        <View style={styles.section}>
          <Typography variant="h2">Responsabilité</Typography>
          <Typography variant="body" style={styles.paragraph}>
            Les liens hypertextes mis en place dans le cadre du présent site
            Internet en direction d’autres ressources présentes sur le réseau
            Internet ne sauraient engager la responsabilité de la Ferme du
            Buisson.
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            Nous ne garantissons pas que ce site soit exempt de défaut, d'erreur
            ou d’omission et qu'il corresponde exactement à l'usage auquel
            l'utilisateur le destine. Nous ne pouvons en aucun cas être tenus
            responsables des éventuels défauts, erreurs ou omissions existant
            sur ce site.
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            Chaque utilisateur est seul responsable de l'usage qu’il fait des
            informations fournies par le site Internet de la Ferme du Buisson,
            qui ne pourra en aucun cas être tenue responsable de tous dommages
            directs ou indirects découlant de l'utilisation de ces informations
            par l'utilisateur.
          </Typography>
        </View>

        {/* --- SECTION 6 : LIENS HYPERTEXTES --- */}
        <View style={styles.section}>
          <Typography variant="h2">Liens hypertextes</Typography>
          <Typography variant="body" style={styles.paragraph}>
            La Ferme du Buisson autorise la mise en place d'un lien hypertexte
            pointant vers son contenu dès lors qu'il ne crée pas de confusion
            sur la source des services et/ou contenus produits et/ou détenus par
            la Ferme du Buisson.
          </Typography>
        </View>

        {/* Espace vide en bas pour le scroll confortable */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
