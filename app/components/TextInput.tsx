import { TextInput as RNTextInput, StyleSheet, Text, TextInputProps, View } from 'react-native';
import { colors } from '../theme/colors';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function TextInput({ label, error, style, ...props }: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.text.placeholder}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default TextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text.black,
  },
  inputError: {
    borderColor: colors.error.red,
  },
  errorText: {
    fontSize: 12,
    color: colors.error.red,
    marginTop: 4,
  },
});
