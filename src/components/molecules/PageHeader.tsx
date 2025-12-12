import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import Separator from '../atoms/Separator';
import { COLORS, SPACING } from '../../constants/theme';
import { IconName } from '../../constants/icons';

interface PageHeaderProps {
  title: string;
  iconName?: IconName;
  backgroundColor?: string;
  onBack?: () => void;
  style?: ViewStyle;
}

export default function PageHeader({
  title,
  iconName,
  backgroundColor = COLORS.secondary,
  onBack,
  style,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log("Retour impossible (pas d'historique)");
        }
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <View style={styles.content}>
        {/* 1. Bouton Retour */}
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Agrandit la zone de clic
        >
          <Icon name="back" size={32} color={COLORS.text} />
        </TouchableOpacity>

        {/* 2. Groupe Titre + Icône */}
        <View style={styles.titleContainer}>
          {iconName && (
            <Icon
              name={iconName}
              size={28}
              color={COLORS.text}
              fill={COLORS.text}
              style={{ marginRight: 10 }}
            />
          )}
          <Typography variant="h2" style={styles.title}>
            {title}
          </Typography>
        </View>
      </View>

      {/* 3. Séparateur */}
      <Separator color={COLORS.text} thickness={2} marginVertical={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.m,
    paddingVertical: 29,
  },
  backButton: {
    position: 'absolute',
    left: SPACING.m, // Collé à gauche
    zIndex: 10, // Passe au-dessus du reste si besoin
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 0,
  },
});
