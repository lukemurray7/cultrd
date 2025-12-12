import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

export function AlertDialog({
  visible,
  title,
  message,
  buttonText = 'OK',
  onClose,
}: AlertDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default AlertDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.text.tertiary,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent.blueLight,
  },
});
