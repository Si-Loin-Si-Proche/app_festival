import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import SectionHeader from '../components/molecules/SectionHeader';
import SectionFooter from '../components/molecules/SectionFooter';
import MapBlock from '../components/organism/MapBlock';
import { SPACING } from '../constants/theme';
import { ICONS } from '../constants/icons';
import { useTheme } from '../context/ThemeContext';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function InfosScreen() {
  const { colors } = useTheme();

  const handlePress = (url: string) =>
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err)
    );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <SectionHeader
        logoSource={logoImg}
        useImageTitle={true}
        showFavorite={true}
        style={{ backgroundColor: colors.background }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Typography variant="h2" style={styles.upper}>
            — PLAN DU SITE
          </Typography>

          <TouchableOpacity
            style={styles.addressBar}
            onPress={() =>
              handlePress(
                'https://maps.google.com/?q=Allee+De+La+Ferme+77186+Noisiel'
              )
            }
          >
            <ICONS.location size={16} color={colors.text} />
            <Typography variant="body" style={styles.underline}>
              Allée De La Ferme, 77186 Noisiel
            </Typography>
          </TouchableOpacity>

          <MapBlock />
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={styles.upper}>
            — INFOS ET RÉSERVATION
          </Typography>
          <View style={styles.btnStack}>
            <Button
              label="Réserver en ligne"
              onPress={() =>
                handlePress(
                  'https://lafermedubuisson.notre-billetterie.com/formulaire?dial=sommaire2526aa'
                )
              }
              color={colors.filtreSelected}
              icon="ticket"
              withBorder
              style={styles.capsule}
            />
            <Button
              label="Réserver par téléphone"
              onPress={() => handlePress('tel:0164627777')}
              color={colors.filtreSelected}
              icon="phone"
              withBorder
              style={styles.capsule}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={styles.lower}>
            — tarifs
          </Typography>
          <View style={[styles.sectionGap, { marginLeft: SPACING.m }]}>
            <Typography variant="body" style={styles.bold}>
              • film à l'unité
            </Typography>
            {[
              { p: '4,50 €', t: 'buissonnier' },
              { p: '7,50 €', t: 'plein' },
              { p: '6 €', t: 'réduit' },
              { p: '4 €', t: 'enfant' },
            ].map((item, i) => (
              <Typography key={i} variant="body">
                <Typography style={styles.bold}>{item.p}</Typography>{' '}
                <Typography style={styles.italic}>{item.t}</Typography>
              </Typography>
            ))}

            <Typography
              variant="body"
              style={{ ...styles.bold, marginTop: SPACING.m }}
            >
              • forfaits festival
            </Typography>
            <Typography variant="body">
              3 films : <Typography style={styles.bold}>12 €</Typography>
            </Typography>
            <Typography variant="body">
              5 films : <Typography style={styles.bold}>15 €</Typography>
            </Typography>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={styles.lower}>
            — contacts
          </Typography>
          <View style={[styles.sectionGap, { marginLeft: SPACING.m }]}>
            <Typography variant="body" style={styles.bold}>
              • billetterie
            </Typography>
            <Typography variant="body" style={styles.indent}>
              du mardi au samedi : 14h - 19h
            </Typography>
            <Typography
              variant="body"
              style={{ ...styles.indent, ...styles.underline }}
              onPress={() => handlePress('tel:0164627777')}
            >
              tél : 01 64 62 77 77
            </Typography>

            <Typography
              variant="body"
              style={{ ...styles.bold, marginTop: SPACING.m }}
            >
              • administration
            </Typography>
            <Typography
              variant="caption"
              style={{ ...styles.indent, ...styles.email }}
              onPress={() => handlePress('mailto:contact@lafermedubuisson.com')}
            >
              courriel : contact@lafermedubuisson.com
            </Typography>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <SectionFooter />
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
    paddingVertical: SPACING.m,
  },
  section: {
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.xl,
  },
  upper: { textTransform: 'uppercase', marginBottom: SPACING.s },
  lower: { textTransform: 'lowercase', marginBottom: SPACING.s },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic', opacity: 0.8 },
  underline: { textDecorationLine: 'underline' },
  indent: { marginLeft: SPACING.m },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
    gap: SPACING.s,
  },
  btnStack: {
    gap: SPACING.m,
    marginTop: SPACING.s,
  },
  capsule: {
    width: '100%',
    height: 54,
    borderRadius: 27,
  },
  sectionGap: {
    gap: SPACING.xs,
  },
  email: {
    marginTop: SPACING.xs,
    textDecorationLine: 'underline',
  },
  footerContainer: {
    marginHorizontal: -SPACING.m,
    marginBottom: -SPACING.m,
  },
});
