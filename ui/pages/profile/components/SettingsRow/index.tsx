import { MaterialIcons } from "@expo/vector-icons";
import { Switch } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../../ui/components/Box";
import { Pressable } from "../../../../../ui/components/Pressable";
import { Text } from "../../../../../ui/components/Text";

interface SettingsRowProps {
  icon: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  rightContent?: "arrow" | "text" | "button" | "toggle";
  rightText?: string;
  rightButtonText?: string;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  onPress?: () => void;
  isExternal?: boolean;
  danger?: boolean;
}

export const SettingsRow = ({
  icon,
  iconColor,
  title,
  subtitle,
  rightContent = "arrow",
  rightText,
  rightButtonText,
  toggleValue,
  onToggleChange,
  onPress,
  isExternal = false,
  danger = false,
}: SettingsRowProps) => {
  const theme = useTheme();

  const textColor = danger ? theme.colors.brand.danger : theme.colors.text.primary;
  const iconBgColor = danger ? theme.colors.brand.danger : iconColor;

  const content = (
    <Box row between center py={3}>
      <Box row center gap={3} flex>
        <Box
          width={40}
          height={40}
          borderRadius="md"
          center
          style={{
            backgroundColor: iconBgColor,
          }}
        >
          <MaterialIcons name={icon as any} size={20} color={theme.colors.text.white} />
        </Box>
        <Box flex gap={1}>
          <Text size="md" weight="medium" style={{ color: textColor }}>
            {title}
          </Text>
          {subtitle && (
            <Text size="sm" variant="secondary">
              {subtitle}
            </Text>
          )}
        </Box>
      </Box>
      <Box row center gap={2}>
        {rightContent === "text" && rightText && (
          <Text size="sm" variant="secondary">
            {rightText}
          </Text>
        )}
        {rightContent === "button" && rightButtonText && (
          <Pressable
            bg="surfaceLight"
            borderRadius="md"
            px={3}
            py={1}
            onPress={onPress}
          >
            <Text size="sm" weight="medium">
              {rightButtonText}
            </Text>
          </Pressable>
        )}
        {rightContent === "toggle" && (
          <Switch
            value={toggleValue}
            onValueChange={onToggleChange}
            trackColor={{
              false: theme.colors.bg.surfaceLight,
              true: theme.colors.brand.primary,
            }}
            thumbColor={theme.colors.bg.primary}
          />
        )}
        {(rightContent === "arrow" || isExternal) && (
          <MaterialIcons
            name={isExternal ? "open-in-new" : "chevron-right"}
            size={24}
            color={danger ? theme.colors.brand.danger : theme.colors.text.secondary}
          />
        )}
      </Box>
    </Box>
  );

  if (onPress && rightContent !== "toggle" && rightContent !== "button") {
    return (
      <Pressable onPress={onPress} px={2}>
        {content}
      </Pressable>
    );
  }

  return (
    <Box px={2}>
      {content}
    </Box>
  );
};

