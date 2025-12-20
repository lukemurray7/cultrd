import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, useWindowDimensions } from "react-native";
import { useCourse } from "../../../lib/queries/courses";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { data: course, isLoading } = useCourse(id || "");
  const { height } = useWindowDimensions();

  if (isLoading || !course) {
    return (
      <SafeAreaView bg="primary" flex center>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const imageHeight = height * 0.6;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView bg="primary" flex>
        <Box flex>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex={10}
            style={{
              paddingTop: theme.spacing[4],
              paddingBottom: theme.spacing[2],
              paddingHorizontal: theme.spacing[4],
              backgroundColor: `${theme.colors.bg.primary}95`,
            }}
          >
            <Box
              row
              between
              center
            >
              <Pressable
                onPress={() => router.back()}
                center
                style={{
                  width: 48,
                  height: 48,
                }}
              >
                <MaterialIcons name="arrow-back" size={24} color={theme.colors.text.white} />
              </Pressable>
              <Box row gap={4}>
                <Pressable
                  center
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                >
                  <MaterialIcons name="share" size={24} color={theme.colors.text.white} />
                </Pressable>
                <Pressable
                  center
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                >
                  <MaterialIcons name="bookmark-border" size={24} color={theme.colors.text.white} />
                </Pressable>
              </Box>
            </Box>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Box position="relative" width="100%" height={imageHeight} overflow="hidden">
              <Image
                source={{ uri: course.imageUrl }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                contentPosition="center"
              />
              <LinearGradient
                colors={[
                  "transparent",
                  `${theme.colors.bg.primary}99`,
                  theme.colors.bg.primary,
                ]}
                locations={[0, 0.6, 1]}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                }}
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                style={{
                  padding: theme.spacing[6],
                  paddingBottom: theme.spacing[8],
                }}
              >
                <Text
                  size="2xl"
                  weight="bold"
                  style={{
                    color: theme.colors.text.white,
                    marginBottom: theme.spacing[2],
                  }}
                >
                  {course.title}
                </Text>
                <Text
                  size="lg"
                  weight="medium"
                  style={{
                    color: theme.colors.text.white,
                    opacity: 0.9,
                  }}
                  numberOfLines={2}
                >
                  {course.description}
                </Text>
              </Box>
            </Box>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </>
  );
}

