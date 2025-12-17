// import React from 'react';
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Linking,
//   TouchableOpacity,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // --- COMPOSANTS ---
// import Typography from '../components/atoms/Typography';
// import Separator from '../components/atoms/Separator';
// import Button from '../components/atoms/Button';
// import SectionHeader from '../components/molecules/SectionHeader';
// import SectionFooter from '../components/molecules/SectionFooter';
// import MapBlock from '../components/organism/MapBlock';

// // --- THEME & ICONS ---
// import { COLORS, SPACING } from '../constants/theme';
// import { ICONS } from '../constants/icons';

// const logoImg = require('../assets/logo_ferme_du_buisson.png');

// export default function InfosScreen() {
//   const handlePress = (url: string) =>
//     Linking.openURL(url).catch(console.error);

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <SectionHeader
//         logoSource={logoImg}
//         useImageTitle={true}
//         showFavorite={true}
//       />

//       <ScrollView
//         bounces={false}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollBody}
//       >
//         {/* --- SECTION PLAN --- */}
//         <View style={styles.planSection}>
//           <Typography variant="h2" style={styles.upper}>
//             — PLAN DU SITE
//           </Typography>

//           <TouchableOpacity
//             style={styles.addressBar}
//             onPress={() =>
//               handlePress('https://www.google.com/maps/search/?api=1&query=Allee+De+La+Ferme+77186+Noisiel')
//             }
//           >
//             <ICONS.location size={16} color={COLORS.text} />
//             <Typography variant="body" style={styles.underline}>
//               Allée De La Ferme, 77186 Noisiel
//             </Typography>
//           </TouchableOpacity>

//           <MapBlock />
//         </View>

//         {/* --- SECTION PRINCIPALE --- */}
//         <View style={styles.bottomSheet}>
          
//           {/* RÉSERVATION */}
//           <Typography variant="h2" style={styles.upper}>
//             — INFOS ET RÉSERVATION
//           </Typography>
          
//           <View style={styles.btnStack}>
//             <Button
//               label="réserver en ligne"
//               onPress={() => handlePress('https://www.lafermedubuisson.com')}
//               color={COLORS.filtreSelected}
//               icon="ticket"
//               withBorder
//               style={styles.capsule}
//             />
//             <Button
//               label="réserver par téléphone"
//               onPress={() => handlePress('tel:0164627777')}
//               color={COLORS.filtreSelected}
//               icon="info"
//               withBorder
//               style={styles.capsule}
//             />
//           </View>

//           <Separator marginVertical={SPACING.l} color={COLORS.tabBarInactive} />

//           {/* TARIFS */}
//           <Typography variant="h2" style={styles.lower}>
//             — tarifs
//           </Typography>
          
//           <View style={styles.sectionGap}>
//             <Typography variant="h3" style={styles.subTitle}>• film à l'unité</Typography>
//             {[
//               { p: '4,50 €', t: 'buissonnier' },
//               { p: '7,50 €', t: 'plein' },
//               { p: '6 €', t: 'réduit' },
//               { p: '5,50 €', t: 'moins de 26 ans / minima sociaux' },
//               { p: '4 €', t: 'enfant' },
//             ].map((item, i) => (
//               <Typography key={i} variant="body">
//                 <Typography variant="body" style={styles.bold}>{item.p}</Typography>{' '}
//                 <Typography variant="body" style={styles.italic}>{item.t}</Typography>
//               </Typography>
//             ))}

//             <Typography variant="h3" style={[styles.subTitle, { marginTop: SPACING.m }]}>
//               • forfaits festival
//             </Typography>
//             <Typography variant="body">3 films : <Typography style={styles.bold}>12 €</Typography></Typography>
//             <Typography variant="body">5 films : <Typography style={styles.bold}>15 €</Typography></Typography>
//             <Typography variant="body">10 films : <Typography style={styles.bold}>30 €</Typography></Typography>
//           </View>

//           <Separator marginVertical={SPACING.l} color={COLORS.tabBarInactive} />

//           {/* PRATIQUE */}
//           <Typography variant="h2" style={styles.lower}>
//             — infos pratiques
//           </Typography>
//           <View style={styles.sectionGap}>
//             <Typography variant="body">
//               films en <Typography style={styles.bold}>VOSTFR</Typography>
//             </Typography>
//             <View style={styles.rowIcon}>
//               <ICONS.info size={24} color={COLORS.text} />
//               <ICONS.eye size={24} color={COLORS.text} />
//             </View>
//           </View>

//           <Separator marginVertical={SPACING.l} color={COLORS.tabBarInactive} />

//           {/* CONTACTS */}
//           <Typography variant="h2" style={styles.lower}>
//             — contacts
//           </Typography>
          
//           <View style={styles.sectionGap}>
//             <Typography variant="h3" style={styles.subTitle}>• billetterie</Typography>
//             <Typography variant="body" style={styles.indent}>du mardi au samedi : 14h - 19h</Typography>
//             <Typography
//               variant="body"
//               style={[styles.indent, styles.underline]}
//               onPress={() => handlePress('tel:0164627777')}
//             >
//               tél : 01 64 62 77 77
//             </Typography>

//             <Typography variant="h3" style={[styles.subTitle, { marginTop: SPACING.m }]}>
//               • administration
//             </Typography>
//             <Typography variant="body" style={styles.indent}>
//               le lundi · de 9h30 à 13h et de 14h à 18h{'\n'}
//               du mardi au vendredi · de 9h30 à 13h et de 14h à 19h
//             </Typography>
//             <Typography
//               variant="body"
//               style={[styles.indent, styles.underline]}
//               onPress={() => handlePress('tel:0164627700')}
//             >
//               tél : 01 64 62 77 00
//             </Typography>
//             <Typography
//               variant="caption"
//               style={[styles.indent, styles.email]}
//               onPress={() => handlePress('mailto:contact@lafermedubuisson.com')}
//             >
//               courriel : contact@lafermedubuisson.com
//             </Typography>
//           </View>

//           <View style={styles.footerWrap}>
//             <SectionFooter />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   scrollBody: { backgroundColor: COLORS.secondary, flexGrow: 1 },
//   planSection: { padding: SPACING.m, paddingBottom: SPACING.xl },
//   bottomSheet: {
//     backgroundColor: COLORS.background,
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     borderWidth: 2,
//     borderColor: COLORS.text,
//     padding: SPACING.m,
//     marginTop: -SPACING.m,
//     minHeight: 600,
//   },
//   upper: { textTransform: 'uppercase' },
//   lower: { textTransform: 'lowercase', marginBottom: SPACING.m },
//   subTitle: { marginBottom: SPACING.xs },
//   addressBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: SPACING.m,
//     gap: SPACING.s,
//   },
//   btnStack: { gap: SPACING.m, marginTop: SPACING.m },
//   capsule: { width: '100%', height: 54, borderRadius: 27 },
//   sectionGap: { gap: SPACING.xs },
//   indent: { marginLeft: SPACING.m },
//   email: {
//     marginTop: SPACING.xs,
//     textDecorationLine: 'underline',
//   },
//   rowIcon: { flexDirection: 'row', gap: SPACING.m, marginTop: SPACING.s },
//   footerWrap: {
//     marginTop: SPACING.xl,
//     marginHorizontal: -SPACING.m,
//     marginBottom: -SPACING.m,
//   },
//   bold: { fontWeight: 'bold' },
//   italic: { fontStyle: 'italic', opacity: 0.8 },
//   underline: { textDecorationLine: 'underline' },
// });




import React from 'react';
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
import Separator from '../components/atoms/Separator';
import Button from '../components/atoms/Button';
import SectionHeader from '../components/molecules/SectionHeader';
import SectionFooter from '../components/molecules/SectionFooter';
import MapBlock from '../components/organism/MapBlock';

// --- THEME & ICONS ---
import { COLORS, SPACING, SIZES, FONTS } from '../constants/theme';
import { ICONS } from '../constants/icons';

const logoImg = require('../assets/logo_ferme_du_buisson.png');

export default function InfosScreen() {
  const handlePress = (url: string) =>
    Linking.openURL(url).catch(console.error);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader
        logoSource={logoImg}
        useImageTitle={true}
        showFavorite={true}
      />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollBody}
      >
        {/* --- SECTION PLAN --- */}
        <View style={styles.planSection}>
          <Typography variant="h2" style={styles.titleUpper}>
            — PLAN DU SITE
          </Typography>

          <TouchableOpacity
            style={styles.addressBar}
            onPress={() =>
              handlePress('https://maps.google.com/?q=Allee+De+La+Ferme+77186+Noisiel')
            }
          >
            <ICONS.location size={14} color={COLORS.text} />
            <Typography variant="body" style={styles.underline}>
              Allee De La Ferme, 77186 Noisiel
            </Typography>
          </TouchableOpacity>

          <MapBlock />
        </View>

        {/* --- SECTION PRINCIPALE --- */}
        <View style={styles.bottomSheet}>
          <Typography variant="h2" style={styles.titleUpper}>
            — INFOS ET RÉSERVATION
          </Typography>
          
          <View style={styles.btnStack}>
            <Button
              label="réserver en ligne"
              onPress={() => handlePress('https://www.lafermedubuisson.com')}
              color={COLORS.filtreSelected}
              icon="ticket"
              withBorder
              style={styles.capsule}
            />
            <Button
              label="réserver par téléphone"
              onPress={() => handlePress('tel:0164627777')}
              color={COLORS.filtreSelected}
              icon="info"
              withBorder
              style={styles.capsule}
            />
          </View>

          <Separator marginVertical={SPACING.l} color={COLORS.tabBarInactive} />

          <Typography variant="h2" style={styles.titleLower}>
            — tarifs
          </Typography>
          
          <View style={styles.sectionGap}>
            <Typography variant="body" style={styles.bold}>• film à l'unité</Typography>
            {[
              { p: '4,50 €', t: 'buissonnier' },
              { p: '7,50 €', t: 'plein' },
              { p: '6 €', t: 'réduit' },
              { p: '5,50 €', t: 'moins de 26 ans / minima sociaux' },
              { p: '4 €', t: 'enfant' },
            ].map((item, i) => (
              <Typography key={i} variant="body">
                <Typography variant="body" style={styles.bold}>{item.p}</Typography>{' '}
                <Typography variant="body" style={styles.priceDesc}>{item.t}</Typography>
              </Typography>
            ))}

            {/* Ici on utilise l'objet fusionné pour éviter l'erreur de tableau de styles */}
            <Typography variant="body" style={{ ...styles.bold, marginTop: SPACING.m }}>
              • forfaits festival
            </Typography>
            <Typography variant="body">3 films : <Typography style={styles.bold}>12 €</Typography></Typography>
            <Typography variant="body">5 films : <Typography style={styles.bold}>15 €</Typography></Typography>
            <Typography variant="body">10 films : <Typography style={styles.bold}>30 €</Typography></Typography>
          </View>

          <Separator marginVertical={SPACING.l} color={COLORS.tabBarInactive} />

          <Typography variant="h2" style={styles.titleLower}>
            — infos pratiques
          </Typography>
          <View style={styles.sectionGap}>
            <Typography variant="body">
              films en <Typography style={styles.bold}>VOSTFR</Typography>
            </Typography>
            <View style={styles.rowIcon}>
              <ICONS.info size={24} color={COLORS.text} />
              <ICONS.eye size={24} color={COLORS.text} />
            </View>
          </View>

          <Separator marginVertical={SPACING.l} color={COLORS.tabBarInactive} />

          <Typography variant="h2" style={styles.titleLower}>
            — contacts
          </Typography>
          
          <View style={styles.sectionGap}>
            <Typography variant="body" style={styles.bold}>• billetterie</Typography>
            <Typography variant="body" style={styles.indent}>du mardi au samedi : 14h - 19h</Typography>
            <Typography
              variant="body"
              style={{ ...styles.indent, ...styles.underline }}
              onPress={() => handlePress('tel:0164627777')}
            >
              tél : 01 64 62 77 77
            </Typography>

            <Typography variant="body" style={{ ...styles.bold, marginTop: SPACING.m }}>
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
              onPress={() => handlePress('mailto:contact@lafermedubuisson.com')}
            >
              courriel : contact@lafermedubuisson.com
            </Typography>
          </View>

          <View style={styles.footerWrap}>
            <SectionFooter />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollBody: { backgroundColor: COLORS.secondary, flexGrow: 1 },
  planSection: { padding: SPACING.m, paddingBottom: SPACING.xl },
  bottomSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.text,
    padding: SPACING.m,
    marginTop: -SPACING.m,
    minHeight: 600,
  },
  titleUpper: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.h1,
    textTransform: 'uppercase',
  },
  titleLower: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.h1,
    textTransform: 'lowercase',
    marginBottom: SPACING.m,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.m,
    gap: SPACING.s,
  },
  btnStack: { gap: SPACING.m, marginTop: SPACING.m },
  capsule: { width: '100%', height: 54, borderRadius: 27 },
  sectionGap: { gap: SPACING.xs },
  priceDesc: { fontFamily: FONTS.italic, fontSize: SIZES.small, opacity: 0.8 },
  indent: { marginLeft: SPACING.m },
  email: {
    marginLeft: SPACING.m,
    textDecorationLine: 'underline',
    marginTop: SPACING.xs,
  },
  rowIcon: { flexDirection: 'row', gap: SPACING.m, marginTop: SPACING.s },
  footerWrap: {
    marginTop: SPACING.xl,
    marginHorizontal: -SPACING.m,
    marginBottom: -SPACING.m,
  },
  bold: { fontWeight: 'bold' },
  underline: { textDecorationLine: 'underline' },
});
