import { IconName } from './icons';
import { COLORS } from './theme';
import { Image } from 'react-native';

export const MAP_IMAGE_SOURCE = require('../assets/plan.png');

const { width, height } = Image.resolveAssetSource(MAP_IMAGE_SOURCE);

export const MAP_DIMENSIONS = {
  width,
  height,
};

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
    id: 'wc-1',
    x: 370,
    y: 300,
    label: 'Toilettes',
    icon: 'wc',
    category: 'wc',
    description: 'Toilettes accessibles PMR',
    color: COLORS.primary,
  },
  {
    id: 'food-truck',
    x: 50,
    y: 250,
    label: 'Burger Truck',
    icon: 'food',
    category: 'food',
    description: 'Burgers bio et locaux',
    color: COLORS.primary,
  },
];
