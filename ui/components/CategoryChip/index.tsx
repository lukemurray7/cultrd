import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";

interface CategoryChipProps {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  selected?: boolean;
  onPress?: () => void;
}

export const CategoryChip = ({ label, icon, selected = false, onPress }: CategoryChipProps) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing[2],
        borderRadius: theme.radii.md,
        paddingLeft: theme.spacing[4],
        paddingRight: theme.spacing[4],
        backgroundColor: selected ? theme.colors.brand.primary : theme.colors.bg.surfaceLight,
        borderWidth: selected ? 0 : 1,
        borderColor: theme.colors.border,
      }}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={18}
          color={selected ? theme.colors.text.primary : theme.colors.text.primary}
        />
      )}
      <Text
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.size.sm,
          fontWeight: selected ? theme.typography.weight.semibold : theme.typography.weight.medium,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

