import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import Typography from './Typography';
import Icon from './Icon';
import { COLORS, FONTS } from '../../constants/theme';
import { IconName } from '../../constants/icons';

interface TagProps extends TouchableOpacityProps {
  label: string;
  iconName?: IconName;
  isSelected?: boolean;
  backgroundColor?: string;
  style?: ViewStyle;
}

export default function Tag({
  label,
  iconName,
  isSelected = false,
  backgroundColor,
  style,
  onPress,
  ...props
}: TagProps) {
  // LOGIQUE DE STYLE INTELLIGENTE
  // 1. Si "isSelected" est vrai, on force le BLEU CIEL (Filtre actif)
  // 2. Sinon, si une "backgroundColor" est fournie, on l'utilise (Catégorie)
  // 3. Sinon, c'est transparent (Filtre inactif)
  const currentBackgroundColor = isSelected
    ? COLORS.filtreSelected
    : backgroundColor || 'transparent';

  const currentBorderWidth = isSelected ? 2.5 : 1.5;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      // On désactive le clic si on n'a pas passé de fonction onPress
      disabled={!onPress}
      style={[
        styles.container,
        {
          backgroundColor: currentBackgroundColor,
          borderWidth: currentBorderWidth,
        },
        style,
      ]}
      {...props}
    >
      {iconName && (
        <Icon
          name={iconName}
          size={14}
          color={COLORS.text}
          style={styles.icon}
        />
      )}

      <Typography variant="caption" style={styles.text}>
        {label.toUpperCase()}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderColor: COLORS.text,
    gap: 6,
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.text,
    lineHeight: undefined,
  },
  icon: {},
});
