import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../Box";
import { Pressable } from "../Pressable";
import { Text } from "../Text";

interface EmptyCourseCardProps {
  width?: number;
}

export const EmptyCourseCard = ({ width = 160 }: EmptyCourseCardProps) => {
  const theme = useTheme();

  return (
    <Pressable
      width={width}
      height={288}
      bg="surface"
      borderRadius="xl"
      border
      center
      gap={2}
    >
      <MaterialIcons
        name="add"
        size={32}
        color={theme.colors.text.secondary}
      />
      <Text size="sm" weight="medium" variant="secondary" style={{ textAlign: "center" }}>
        Suggest a course
      </Text>
    </Pressable>
  );
};

