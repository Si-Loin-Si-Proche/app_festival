import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- COMPOSANTS ---
import Typography from '../components/atoms/Typography';
import Button from '../components/atoms/Button';
import SectionHeader from '../components/molecules/SectionHeader';
import SectionFooter from '../components/molecules/SectionFooter';
import MapBlock from '../components/organism/MapBlock';

// --- THEME & ICONS ---
import { COLORS, SPACING } from '../constants/theme';
import { ICONS } from '../constants/icons';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function InfosScreen() {
  const [topSectionHeight, setTopSectionHeight] = useState(400);

  const handlePress = (url: string) =>
    Linking.openURL(url).catch(console.error);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader
        logoSource={logoImg}
        useImageTitle={true}
        showFavorite={true}
        style={{ backgroundColor: COLORS.background, zIndex: 100 }}
      />

      <View style={{ flex: 1, position: 'relative' }}>
        {/* 1. ARRIÈRE-PLAN FIXE (PLAN DU SITE) */}
        <View
          style={styles.fixedBackgroundLayer}
          onLayout={(event) =>
            setTopSectionHeight(event.nativeEvent.layout.height)
          }
        >
          <View style={styles.planSection}>
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
              <ICONS.location size={16} color={COLORS.text} />
              <Typography variant="body" style={styles.underline}>
                Allée De La Ferme, 77186 Noisiel
              </Typography>
            </TouchableOpacity>

            <MapBlock />
          </View>
        </View>

        {/* 2. ZONE DE SCROLL (CONTENU BLANC) */}
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEventThrottle={16}
        >
          {/* Espaceur pour la parallaxe */}
          <View
            style={{
              height: topSectionHeight - 20,
              backgroundColor: 'transparent',
            }}
          />

          <View style={styles.bottomSheet}>
            <View style={styles.sheetContent}>
              {/* BLOC : RÉSERVATION */}
              <View style={styles.blockSection}>
                <Typography variant="h2" style={styles.upper}>
                  — INFOS ET RÉSERVATION
                </Typography>
                <View style={styles.btnStack}>
                  <Button
                    label="Réserver en ligne"
                    onPress={() =>
                      handlePress('https://www.lafermedubuisson.com')
                    }
                    color={COLORS.filtreSelected}
                    icon="ticket"
                    withBorder
                    style={styles.capsule}
                  />
                  <Button
                    label="Réserver par téléphone"
                    onPress={() => handlePress('tel:0164627777')}
                    color={COLORS.filtreSelected}
                    icon="phone"
                    withBorder
                    style={styles.capsule}
                  />
                </View>
              </View>

              {/* BLOC : TARIFS */}
              <View style={styles.blockSection}>
                <Typography variant="h2" style={styles.lower}>
                  — tarifs
                </Typography>
                {/* Ajout du marginLeft sur la View interne */}
                <View style={[styles.sectionGap, { marginLeft: SPACING.m }]}>
                  <Typography variant="body" style={styles.bold}>
                    • film à l'unité
                  </Typography>
                  {[
                    { p: '4,50 €', t: 'buissonnier' },
                    { p: '7,50 €', t: 'plein' },
                    { p: '6 €', t: 'réduit' },
                    { p: '5,50 €', t: 'moins de 26 ans / minima sociaux' },
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
                  <Typography variant="body">
                    10 films : <Typography style={styles.bold}>30 €</Typography>
                  </Typography>
                </View>
              </View>

              {/* BLOC : PRATIQUE */}
              <View style={styles.blockSection}>
                <Typography variant="h2" style={styles.lower}>
                  — infos pratiques
                </Typography>
                {/* Ajout du marginLeft sur la View interne */}
                <View style={[styles.sectionGap, { marginLeft: SPACING.m }]}>
                  <Typography variant="body">
                    films en <Typography style={styles.bold}>VOSTFR</Typography>
                  </Typography>
                  <View style={styles.rowIcon}>
                    <ICONS.earOff size={24} color={COLORS.text} />
                    <ICONS.eye size={24} color={COLORS.text} />
                  </View>
                </View>
              </View>

              {/* BLOC : CONTACTS */}
              <View style={styles.blockSection}>
                <Typography variant="h2" style={styles.lower}>
                  — contacts
                </Typography>
                {/* Ajout du marginLeft sur la View interne */}
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
                  <Typography variant="body" style={styles.indent}>
                    le lundi · de 9h30 à 13h et de 14h à 18h{'\n'}
                    du mardi au vendredi · de 9h30 à 13h et de 14h à 19h
                  </Typography>
                  <Typography
                    variant="body"
                    style={{ ...styles.indent, ...styles.underline }}
                    onPress={() => handlePress('tel:0164627700')}
                  >
                    tél : 01 64 62 77 00
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ ...styles.indent, ...styles.email }}
                    onPress={() =>
                      handlePress('mailto:contact@lafermedubuisson.com')
                    }
                  >
                    courriel : contact@lafermedubuisson.com
                  </Typography>
                </View>
              </View>
            </View>

            {/* FOOTER */}
            <View style={styles.footerContainer}>
              <SectionFooter />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  fixedBackgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    zIndex: 0,
  },
  planSection: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.m,
    paddingBottom: 40,
  },
  bottomSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.text,
    borderBottomWidth: 0,
    marginTop: -20,
    minHeight: 600,
    overflow: 'hidden',
  },
  sheetContent: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.xl,
  },
  blockSection: {
    marginBottom: SPACING.xl,
  },
  upper: { textTransform: 'uppercase', marginBottom: SPACING.s },
  lower: { textTransform: 'lowercase', marginBottom: SPACING.s },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.m,
    gap: SPACING.s,
  },
  btnStack: { gap: SPACING.m, marginTop: SPACING.m },
  capsule: { width: '100%', height: 54, borderRadius: 27 },
  sectionGap: { gap: SPACING.xs },
  indent: { marginLeft: SPACING.m },
  email: {
    marginTop: SPACING.xs,
    textDecorationLine: 'underline',
  },
  rowIcon: { flexDirection: 'row', gap: SPACING.m, marginTop: SPACING.s },
  footerContainer: {
    marginHorizontal: -2,
    marginBottom: -2,
    marginTop: SPACING.m,
  },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic', opacity: 0.8 },
  underline: { textDecorationLine: 'underline' },
});
