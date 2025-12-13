import { TextInput as RNTextInput, StyleSheet, Text, TextInputProps, View } from 'react-native';
import { borders, colors, spacing, typography } from '../../theme/colors';

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
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
    fontWeight: typography.fontWeight.medium,
  },
  input: {
    backgroundColor: colors.background.white,
    borderWidth: borders.width.thin,
    borderColor: colors.border.lightGray,
    borderRadius: borders.radius.base,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    fontSize: typography.fontSize.base,
    color: colors.text.black,
  },
  inputError: {
    borderColor: colors.error.red,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.error.red,
    marginTop: spacing.xs,
  },
});
