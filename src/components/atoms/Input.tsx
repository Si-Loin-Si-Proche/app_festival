import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from './Icon';
import { IconName } from '../../constants/icons';
import { COLORS, SIZES, SPACING, FONTS } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? COLORS.error
    : isFocused
      ? COLORS.primary
      : COLORS.tabBarInactive;

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, { borderColor }]}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            <Icon name={leftIcon} size={20} color={COLORS.secondary} />
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.textLight}
          cursorColor={COLORS.primary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={styles.rightIcon}
          >
            <Icon name={rightIcon} size={20} color={COLORS.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m, // 16
    width: '100%',
  },
  label: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.body,
    marginBottom: SPACING.s,
    color: COLORS.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.m,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: FONTS.regular,
    fontSize: SIZES.h3,
    color: COLORS.text,
  },
  leftIcon: {
    marginRight: SPACING.s,
  },
  rightIcon: {
    marginLeft: SPACING.s,
  },
  errorText: {
    marginTop: SPACING.xs,
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.error,
  },
});
