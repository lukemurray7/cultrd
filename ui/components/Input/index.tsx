import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../Box";
import { Text } from "../Text";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  containerStyle?: TextInputProps["style"];
}

export const Input = ({ label, error, containerStyle, ...props }: InputProps) => {
  const theme = useTheme();

  return (
    <Box>
      {label && (
        <Text size="sm" weight="medium" mb={1}>
          {label}
        </Text>
      )}
      <TextInput
        style={{
          height: 48,
          backgroundColor: theme.colors.bg.surfaceLight,
          borderColor: error ? theme.colors.brand.danger : theme.colors.border,
          borderWidth: 1,
          borderRadius: theme.radii.md,
          paddingHorizontal: theme.spacing[4],
          color: theme.colors.text.primary,
          fontSize: theme.typography.size.md,
          fontFamily: theme.typography.fontFamily.regular,
        }}
        placeholderTextColor={theme.colors.text.muted}
        {...props}
      />
      {error && (
        <Text size="xs" color={theme.colors.brand.danger} mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};

