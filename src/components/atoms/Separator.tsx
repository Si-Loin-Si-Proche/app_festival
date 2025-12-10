import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

interface SeparatorProps {
  color?: string;
  thickness?: number;
  marginVertical?: number; //espace au-dessus et en dessous
}

export default function Separator({
  color = COLORS.text, // Par défaut : le gris de ton thème
  thickness = StyleSheet.hairlineWidth, //la ligne la plus fine possible sur l'écran
  marginVertical = 15, //espacement par défaut
}: SeparatorProps) {
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical: marginVertical,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%', //toute la largeur par défaut
  },
});
