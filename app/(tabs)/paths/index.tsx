import { useRouter } from "expo-router";
import {
    useContinueLearningPaths,
    useExplorePaths,
    usePathOfTheWeek,
} from "../../../lib/queries/paths";
import { useTheme } from "../../../theme/ThemeProvider";
import { Box } from "../../../ui/components/Box";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { ContinueLearningCard } from "../../../ui/pages/paths/components/ContinueLearningCard";
import { ExplorePathCard } from "../../../ui/pages/paths/components/ExplorePathCard";
import { PathOfTheWeekCard } from "../../../ui/pages/paths/components/PathOfTheWeekCard";
import { PathsHeader } from "../../../ui/pages/paths/components/PathsHeader";

export default function PathsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { data: pathOfTheWeek } = usePathOfTheWeek();
  const { data: continueLearningPaths } = useContinueLearningPaths();
  const { data: explorePaths } = useExplorePaths();

  return (
    <>
      <StatusBar />
      <SafeAreaView edges={["top"]} bg="primary">
        <ScrollView flex pb={12} showsVerticalScrollIndicator={false}>
          <Box bg="primary" pb={0} mb={4}>
            <PathsHeader />
          </Box>

          {pathOfTheWeek && (
            <Box px={4} mb={6}>
              <PathOfTheWeekCard path={pathOfTheWeek} />
            </Box>
          )}

          {continueLearningPaths && continueLearningPaths.length > 0 && (
            <Box px={4} mb={6}>
              <Box row between mb={3}>
                <Text size="lg" weight="bold">
                  Continue Learning
                </Text>
                <Pressable onPress={() => router.push("/(tabs)/paths/all")}>
                  <Text
                    size="sm"
                    weight="semibold"
                    style={{ color: theme.colors.brand.accent }}
                  >
                    See all
                  </Text>
                </Pressable>
              </Box>
              <Box gap={3}>
                {continueLearningPaths.slice(0, 3).map((path) => (
                  <ContinueLearningCard key={path.id} path={path} />
                ))}
              </Box>
            </Box>
          )}

          {explorePaths && explorePaths.length > 0 && (
            <Box px={4}>
              <Text size="lg" weight="bold" mb={3}>
                Explore Paths
              </Text>
              <Box gap={3}>
                {explorePaths.map((path) => (
                  <ExplorePathCard key={path.id} path={path} />
                ))}
              </Box>
            </Box>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

