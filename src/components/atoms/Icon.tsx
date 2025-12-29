import React from 'react';
import { ICONS, IconName } from '../../constants/icons';
import { useTheme } from '../../context/ThemeContext';
import { LucideProps } from 'lucide-react-native';

interface IconProps extends LucideProps {
  name: IconName;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 24, color, ...props }: IconProps) {
  const { colors } = useTheme();
  const IconComponent = ICONS[name];

  if (!IconComponent) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn(
        `⚠️ Icône introuvable : "${name}". Vérifie src/constants/icons.ts`
      );
    }
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      color={color || colors.text}
      {...props}
    />
  );
}
