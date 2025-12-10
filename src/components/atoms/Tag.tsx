import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Typography from './Typography';
import Icon from './Icon';
import { COLORS, FONTS } from '../../constants/theme';
import { IconName } from '../../constants/icons';

interface TagProps {
  label: string;
  iconName?: IconName;
  backgroundColor?: string;
  style?: ViewStyle;
}

export default function Tag({
  label,
  iconName,
  backgroundColor = COLORS.background,
  style,
}: TagProps) {
  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColor }, style]}
    >
      {/* Icône */}
      {iconName && (
        <Icon
          name={iconName}
          size={14}
          color={COLORS.text}
          style={styles.icon}
        />
      )}

      {/* Texte */}
      <Typography variant="caption" style={styles.text}>
        {label.toUpperCase()}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',

    paddingVertical: 6,
    paddingHorizontal: 12,

    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: COLORS.text,

    gap: 6,
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.text,
    lineHeight: undefined,
  },
  icon: {
    // Ajustements si nécessaire
  },
});
