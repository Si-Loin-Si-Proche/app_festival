import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, SIZES, SPACING, FONTS } from '../constants/theme';
import Input from '../components/atoms/Input';
import Icon from '../components/atoms/Icon';
import RemoteImage from '../components/atoms/RemoteImage';

export default function InfosScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Icon name="settings" size={32} color={COLORS.primary} />
          <Text style={styles.title}>UI Kit & Tests</Text>
        </View>

        {/* 1. TEST REMOTE IMAGE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Images Distantes</Text>

          <Text style={styles.label}>Image Valide (Unsplash) :</Text>
          <RemoteImage
            url="https://plus.unsplash.com/premium_photo-1693227521269-d90b70e3ee06?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style={styles.bigImage}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: SPACING.s }}>
              <Text style={styles.label}>URL Cassée :</Text>
              <RemoteImage
                url="https://site-qui-nexiste-pas.com/image.jpg"
                style={styles.smallImage}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>URL Null :</Text>
              <RemoteImage url={null} style={styles.smallImage} />
            </View>
          </View>
        </View>

        {/* 2. TEST INPUTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Inputs</Text>

          <Input
            label="Recherche"
            placeholder="Chercher un artiste..."
            leftIcon="search"
          />

          <Input
            label="Mot de passe"
            placeholder="••••••••••"
            leftIcon="lock"
            rightIcon={showPassword ? 'eyeOff' : 'eye'}
            secureTextEntry={!showPassword}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Input
            label="Erreur Test"
            value="Mauvaise valeur"
            leftIcon="info"
            error="Ce champ est invalide"
          />
        </View>

        {/* 3. TEST TYPO & ICONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Typographie</Text>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.h1,
              color: COLORS.text,
            }}
          >
            Titre H1
          </Text>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.h2,
              color: COLORS.text,
            }}
          >
            Titre H2
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.body,
              color: COLORS.text,
            }}
          >
            Paragraphe standard avec la police du thème.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SPACING.m,
              gap: SPACING.m,
            }}
          >
            <Icon name="favorite" color={COLORS.primary} />
            <Icon name="calendar" color={COLORS.textLight} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.m,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.h1,
    color: COLORS.secondary,
    marginLeft: SPACING.s,
  },
  section: {
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.m,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: SPACING.xs,
  },
  label: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    marginBottom: SPACING.xs,
    color: COLORS.text,
  },
  bigImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: SPACING.m,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
});
