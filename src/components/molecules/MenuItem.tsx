import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Typography from '../atoms/Typography';
import Icon from '../atoms/Icon';
import CustomSwitch from '../atoms/Switch';
import { COLORS, SPACING, FONTS } from '../../constants/theme';

interface MenuItemProps {
  label: string;
  type: 'switch' | 'dropdown' | 'link';
  value?: boolean;
  onValueChange?: (val: boolean) => void;
  selectedValue?: string;
  options?: string[];
  isExpanded?: boolean;
  onSelectOption?: (option: string) => void;
  onPress?: () => void;
}

export default function MenuItem({
  label,
  type,
  value,
  onValueChange,
  selectedValue,
  options,
  isExpanded,
  onSelectOption,
  onPress,
}: MenuItemProps) {
  return (
    <View style={{ zIndex: isExpanded ? 100 : 1 }}>
      <TouchableOpacity
        style={styles.container}
        onPress={type !== 'switch' ? onPress : undefined}
        activeOpacity={type === 'switch' ? 1 : 0.7}
        disabled={type === 'switch'}
      >
        <Typography variant="h2" style={styles.label}>
          {label}
        </Typography>

        <View style={styles.rightContent}>
          {/* CAS 1 : CUSTOM SWITCH */}
          {type === 'switch' && value !== undefined && onValueChange && (
            <CustomSwitch value={value} onValueChange={onValueChange} />
          )}

          {/* CAS 2 : DROPDOWN STYLÉ */}
          {type === 'dropdown' && (
            <View
              style={[
                styles.dropdownBox,
                isExpanded && styles.dropdownBoxActive,
              ]}
            >
              <Typography variant="h2" style={styles.dropdownText}>
                {selectedValue}
              </Typography>
              <View
                style={{
                  transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
                }}
              >
                <Icon name="arrowDown" size={18} color={COLORS.text} />
              </View>
            </View>
          )}

          {/* CAS 3 : LIEN */}
          {type === 'link' && (
            <Icon name="arrowRight" size={24} color={COLORS.text} />
          )}
        </View>
      </TouchableOpacity>

      {/* LISTE DÉROULANTE STYLÉE */}
      {type === 'dropdown' && isExpanded && options && (
        <View style={styles.optionsListContainer}>
          {options.map((opt, index) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionItem,
                // Enlève la bordure du dernier élément pour faire joli
                index === options.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => onSelectOption && onSelectOption(opt)}
            >
              <Typography variant="body" style={{ fontFamily: FONTS.bold }}>
                {opt}
              </Typography>
              {selectedValue === opt && (
                <Icon
                  name="check"
                  size={22}
                  color="#8BC34A" // Vert style "cartoon"
                  strokeWidth={3} // Trait bien gras
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
    width: '100%',
  },
  label: { marginBottom: 0 },
  rightContent: { flexDirection: 'row', alignItems: 'center' },

  // --- STYLE DU DROPDOWN FERMÉ ---
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2, // Bordure épaisse
    borderColor: COLORS.text, // Noir
    borderRadius: 12, // Coins ronds
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white', // Fond blanc
  },
  dropdownBoxActive: {
    backgroundColor: '#F5F5F5', // Légèrement gris quand ouvert
  },
  dropdownText: {
    marginBottom: 0,
    fontFamily: FONTS.bold,
  },

  // --- STYLE DE LA LISTE DÉROULANTE ---
  optionsListContainer: {
    borderWidth: 2,
    borderColor: COLORS.text,
    borderRadius: 12,
    backgroundColor: 'white',
    marginTop: -5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 2, // Séparateur épais entre les options
    borderBottomColor: '#E0E0E0',
  },
});
