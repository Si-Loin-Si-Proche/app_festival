import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
  StyleProp,
} from 'react-native';
import Typography from './Typography';
import Icon from './Icon';
import { FONTS } from '../../constants/theme';
import { IconName } from '../../constants/icons';
import { useTheme } from '../../context/ThemeContext';

interface TagProps extends TouchableOpacityProps {
  label: string;
  iconName?: IconName;
  isSelected?: boolean;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
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
  const { colors } = useTheme();

  const currentBackgroundColor = isSelected
    ? colors.filtreSelected
    : backgroundColor || 'transparent';

  const currentBorderWidth = isSelected ? 2.5 : 1.5;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
      style={[
        styles.container,
        {
          backgroundColor: currentBackgroundColor,
          borderWidth: currentBorderWidth,
          borderColor: colors.text,
        },
        style,
      ]}
      {...props}
    >
      {iconName && (
        <Icon
          name={iconName}
          size={14}
          color={colors.text}
          style={styles.icon}
        />
      )}

      <Typography
        variant="caption"
        style={[styles.text, { color: colors.text }]}
      >
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
    gap: 6,
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    lineHeight: undefined,
  },
  icon: {},
});
