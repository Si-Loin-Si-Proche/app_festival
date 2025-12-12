import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import { COLORS, SPACING } from '../../constants/theme';
import { IconName } from '../../constants/icons';

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
  const greyColor = COLORS.text;

  return (
    <View style={[styles.container, style]}>
      {/*Icône*/}
      <Icon
        name={iconName}
        size={48}
        color={greyColor}
        style={{ marginBottom: SPACING.s }}
      />

      {/*Message explicatif*/}
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
