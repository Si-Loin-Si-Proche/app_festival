import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import Typography from '../atoms/Typography';
import { FONTS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  visible,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const { colors } = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <Typography variant="h2" style={styles.title}>
            Voulez vous vraiment supprimer vos données ?
          </Typography>

          <View style={styles.buttonRow}>
            {/* BOUTON OUI (Vert) */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: colors.on,
                  borderColor: colors.text,
                },
              ]}
              onPress={onConfirm}
            >
              <Typography variant="h2" style={styles.btnText}>
                oui
              </Typography>
            </TouchableOpacity>

            {/* BOUTON NON (Rouge) */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: colors.off,
                  borderColor: colors.text,
                },
              ]}
              onPress={onCancel}
            >
              <Typography variant="h2" style={styles.btnText}>
                non
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 40,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderWidth: 2,
  },
  btnText: {
    marginBottom: 0,
    fontFamily: FONTS.bold,
  },
});
