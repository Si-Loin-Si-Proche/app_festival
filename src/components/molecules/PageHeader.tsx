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
      return;
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <View style={styles.content}>
        {/* 1. Bouton Retour */}
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          activeOpacity={0.6}
        >
          <Icon
            name="arrowRight"
            size={32}
            color={COLORS.text}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
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
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centre le titre
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: SPACING.m,
    zIndex: 20,
    padding: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
  },
  title: {
    marginBottom: 0,
    textAlign: 'center',
  },
});
