import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import { SPACING } from '../../constants/theme';
import { IconName } from '../../constants/icons';
import { useTheme } from '../../context/ThemeContext';

interface EmptyStateProps {
  message?: string;
  iconName?: IconName;
  style?: ViewStyle;
}

export default function EmptyState({
  message = 'Aucun résultat',
  iconName = 'search',
  style,
}: EmptyStateProps) {
  const { colors } = useTheme();
  const greyColor = colors.text;

  return (
    <View style={[styles.container, style]}>
      <Icon
        name={iconName}
        size={48}
        color={greyColor}
        style={{ marginBottom: SPACING.s }}
      />

      <Typography
        variant="body"
        style={{ color: greyColor, textAlign: 'center' }}
      >
        {message}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.l,
  },
});
