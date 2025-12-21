import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { PathOfTheWeek } from "../../../../../types/paths";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

interface PathOfTheWeekCardProps {
  path: PathOfTheWeek;
}

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  }
  return `${mins}m`;
};

export const PathOfTheWeekCard = ({ path }: PathOfTheWeekCardProps) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Pressable
      borderRadius="xl"
      bg="surfaceLight"
      border
      overflow="hidden"
      shadow="sm"
      onPress={() => router.push(`/path/${path.id}`)}
    >
      <Box position="relative" width="100%" aspectRatio={16 / 12}>
        <Image
          source={{ uri: path.imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          style={{
            paddingTop: theme.spacing[3],
            paddingLeft: theme.spacing[3],
          }}
        >
          <Box
            borderRadius="md"
            px={2}
            py={1}
            style={{
              backgroundColor: theme.colors.brand.accent,
            }}
          >
            <Text
              size="xs"
              weight="bold"
              style={{
                color: theme.colors.text.black,
              }}
              textTransform="uppercase"
              letterSpacing={0.5}
            >
              Path of the Week
            </Text>
          </Box>
        </Box>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={4}
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <Text size="xl" weight="bold" mb={2} style={{ color: theme.colors.text.white }}>
            {path.title}
          </Text>
          <Box row center gap={3} mb={3}>
            <Box row center gap={1}>
              <MaterialIcons
                name="school"
                size={16}
                color={theme.colors.text.white}
              />
              <Text size="sm" style={{ color: theme.colors.text.white }}>
                {path.totalCourses} Courses
              </Text>
            </Box>
            <Box row center gap={1}>
              <MaterialIcons
                name="schedule"
                size={16}
                color={theme.colors.text.white}
              />
              <Text size="sm" style={{ color: theme.colors.text.white }}>
                {formatDuration(path.totalDuration)}
              </Text>
            </Box>
          </Box>
          <Pressable
            row
            center
            gap={1}
            borderRadius="md"
            px={4}
            py={2}
            style={{
              backgroundColor: theme.colors.text.white,
              alignSelf: "flex-start",
            }}
            onPress={(e) => {
              e.stopPropagation();
              router.push(`/path/${path.id}`);
            }}
          >
            <MaterialIcons
              name="play-arrow"
              size={20}
              color={theme.colors.text.black}
            />
            <Text
              size="sm"
              weight="bold"
              style={{
                color: theme.colors.text.black,
              }}
            >
              Start Now
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
};

