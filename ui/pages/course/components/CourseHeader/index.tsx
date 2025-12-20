import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../../ui/components/Box";
import { Pressable } from "../../../../../ui/components/Pressable";

export const CourseHeader = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box row between center mx={4} my={1}>
      <Pressable
        onPress={() => router.back()}
        bg="surfaceLight"
        borderRadius="pill"
        border
        center
        shadow="sm"
        width={40}
        height={40}
      >
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={theme.colors.text.primary}
        />
      </Pressable>
      <Box row gap={4}>
        <Pressable
          bg="surfaceLight"
          borderRadius="pill"
          border
          center
          shadow="sm"
          width={40}
          height={40}
        >
          <MaterialIcons
            name="share"
            size={24}
            color={theme.colors.text.primary}
          />
        </Pressable>
        <Pressable
          bg="surfaceLight"
          borderRadius="pill"
          border
          shadow="sm"
          center
          width={40}
          height={40}
        >
          <MaterialIcons
            name="bookmark-border"
            size={24}
            color={theme.colors.text.primary}
          />
        </Pressable>
      </Box>
    </Box>
  );
};
