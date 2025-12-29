/**
 * THEME DU FESTIVAL
 * Ce fichier centralise toute l'identité visuelle de l'application.
 * Pour changer le design pour une nouvelle édition ou un autre festival,
 * il suffit de modifier les valeurs ici.
 */

export const PALETTE = {
  light: {
    primary: '#E63946',
    secondary: '#FFCCBC', // Rose
    background: '#F1FAEE', // Blanc cassé
    card: '#FFFFFF',
    text: '#000000',
    textLight: '#A8DADC',
    error: '#FF0000',
    success: '#4CAF50',
    tabBarActive: '#E63946',
    tabBarInactive: '#8D99AE',
    tag: '#F5F294',
    filtreSelected: '#B3E5FC',
    off: '#E57373',
    on: '#8BC34A',
    border: '#E0E0E0',
    icon: '#000000',
  },
  dark: {
    primary: '#FF5A5F',
    secondary: '#333333',
    background: '#121212',
    card: '#1E1E1E', // Gris anthracite
    text: '#FFFFFF', // Blanc
    textLight: '#AAAAAA', // Gris clair
    error: '#FF5252',
    success: '#66BB6A',
    tabBarActive: '#FF5A5F',
    tabBarInactive: '#666666',
    tag: '#37474F', // Tag sombre
    filtreSelected: '#37474F',
    off: '#D32F2F',
    on: '#689F38',
    border: '#333333',
    icon: '#FFFFFF',
  },
};

// VARIABLE DE TRANSITION
export const COLORS = PALETTE.light;

// 2. TAILLES DE POLICE
// Mode Normal
export const SIZES = {
  h1: 24,
  h2: 20,
  h3: 16,
  body: 14,
  small: 12,
  xsmall: 8,
};

// Mode Accessibilité +25%
export const SIZES_ACCESSIBILITY = {
  h1: 30,
  h2: 25,
  h3: 20,
  body: 18,
  small: 15,
  xsmall: 10,
};

// Espacements
export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

export const FONTS = {
  regular: 'AtkinsonHyperlegible_400Regular',
  bold: 'AtkinsonHyperlegible_700Bold',
  italic: 'AtkinsonHyperlegible_400Regular_Italic',
  boldItalic: 'AtkinsonHyperlegible_700Bold_Italic',
};

export const SHADOWS = {
  light: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
};

const theme = {
  PALETTE,
  COLORS,
  SIZES,
  SIZES_ACCESSIBILITY,
  SPACING,
  FONTS,
  SHADOWS,
};

export default theme;
