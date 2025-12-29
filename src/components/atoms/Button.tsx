import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FONTS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import IconComponent from './Icon';
import { IconName } from '../../constants/icons';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  color?: string;
  withBorder?: boolean;
}

export default function Button({
  label,
  variant = 'primary',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  color,
  withBorder = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { colors, sizes } = useTheme();
  const isDisabled = disabled || isLoading;

  const getVariantStyles = (): {
    container: ViewStyle;
    text: TextStyle;
    indicator: string;
  } => {
    if (isDisabled) {
      return {
        container: {
          backgroundColor: colors.tabBarInactive,
          borderColor: colors.tabBarInactive,
          borderWidth: 0,
        },
        text: { color: colors.card },
        indicator: colors.card,
      };
    }

    const primaryBorder = withBorder
      ? {
          borderWidth: 2.5,
          borderColor: colors.text,
        }
      : {
          borderWidth: 0,
        };

    if (color) {
      switch (variant) {
        case 'outline':
          return {
            container: {
              backgroundColor: 'transparent',
              borderWidth: 1.5,
              borderColor: color,
            },
            text: { color: color },
            indicator: color,
          };
        case 'ghost':
          return {
            container: {
              backgroundColor: 'transparent',
              borderWidth: 0,
            },
            text: { color: color },
            indicator: color,
          };
        case 'primary':
        default:
          return {
            container: {
              backgroundColor: color,
              ...primaryBorder,
            },
            text: { color: colors.card },
            indicator: colors.card,
          };
      }
    }

    switch (variant) {
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: colors.primary,
          },
          text: { color: colors.primary },
          indicator: colors.primary,
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 0,
          },
          text: { color: colors.text },
          indicator: colors.text,
        };
      case 'primary':
      default:
        return {
          container: {
            backgroundColor: colors.primary,
            ...primaryBorder,
          },
          text: { color: colors.card },
          indicator: colors.card,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.container,
        variantStyles.container,
        fullWidth ? styles.fullWidth : null,
        style,
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={variantStyles.indicator} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <IconComponent
              name={icon}
              size={20}
              color={variantStyles.text.color as string}
              style={{ marginRight: SPACING.s }}
            />
          )}

          <Text
            style={[styles.text, { fontSize: sizes.h3 }, variantStyles.text]}
          >
            {label}
          </Text>

          {icon && iconPosition === 'right' && (
            <IconComponent
              name={icon}
              size={20}
              color={variantStyles.text.color as string}
              style={{ marginLeft: SPACING.s }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: SPACING.l,
    borderRadius: 12,
    minHeight: 50,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
});
