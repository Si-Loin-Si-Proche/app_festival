import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  color?: string;
  weight?: TextStyle['fontWeight'];
}