import { IconName } from './icons';
import { COLORS } from './theme';
import { Image, Platform } from 'react-native';

export const MAP_IMAGE_SOURCE =
  Platform.OS === 'web'
    ? require('../assets/plan_web.png')
    : require('../assets/plan.png');

const getMapDimensions = (): { width: number; height: number } => {
  if (Platform.OS === 'web') {
    return { width: 440, height: 370 };
  }
  return Image.resolveAssetSource(MAP_IMAGE_SOURCE);
};

export const MAP_DIMENSIONS = getMapDimensions();

export interface MapPoint {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: IconName;
  color: string;
  category: 'scene' | 'food' | 'wc' | 'autre';
  description?: string;
}

export const MAP_POINTS: MapPoint[] = [
  {
    id: 'wc1',
    x: 375,
    y: 315,
    label: 'WC',
    icon: 'wc',
    category: 'wc',
    description: '',
    color: COLORS.tabBarInactive,
  },
  {
    id: 'wc2',
    x: 20,
    y: 185,
    label: 'WC',
    icon: 'wc',
    category: 'wc',
    description: '',
    color: COLORS.tabBarInactive,
  },
  {
    id: 'wc3',
    x: 45,
    y: 320,
    label: 'WC',
    icon: 'wc',
    category: 'wc',
    description: '',
    color: COLORS.tabBarInactive,
  },
  {
    id: 'cinema',
    x: 40,
    y: 170,
    label: 'Cinéma',
    icon: 'cinema',
    category: 'scene',
    description: 'WC / Accueil / Billetterie / Projections',
    color: COLORS.primary,
  },
  {
    id: 'salon-bonus',
    x: 40,
    y: 200,
    label: 'Salon des bonus',
    icon: 'meeting',
    category: 'scene',
    description:
      'À l’étage du cinéma : exposition / rencontres / postes de visionnages et d’écoute',
    color: COLORS.primary,
  },
  {
    id: 'caravanserail',
    x: 110,
    y: 100,
    label: 'Caravansérail',
    icon: 'bar',
    category: 'food',
    description:
      'Bar et restauration / Ateliers / Librairie / Stands associatifs',
    color: COLORS.primary,
  },
  {
    id: 'exterieurs-caravanserail',
    x: 110,
    y: 130,
    label: 'Extérieurs Caravansérail',
    icon: 'coffee',
    category: 'food',
    description:
      'Ca phe et pâtisseries vietnamiennes, espace de repos chill avec transats…',
    color: COLORS.primary,
  },
  {
    id: 'grenier',
    x: 360,
    y: 310,
    label: 'Grenier',
    icon: 'workshop',
    category: 'scene',
    description: 'Ateliers',
    color: COLORS.primary,
  },
  {
    id: 'abreuvoir',
    x: 365,
    y: 55,
    label: 'Abreuvoir',
    icon: 'concert',
    category: 'scene',
    description: 'Concert',
    color: COLORS.primary,
  },
  {
    id: 'mediatheque',
    x: 360,
    y: 255,
    label: 'Médiathèque',
    icon: 'library',
    category: 'autre',
    description: 'Espace calme et lecture',
    color: COLORS.primary,
  },
];
