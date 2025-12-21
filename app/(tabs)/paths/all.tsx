import { useAllUserPaths } from "../../../lib/queries/paths";
import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { ContinueLearningCard } from "../../../ui/pages/paths/components/ContinueLearningCard";

export default function AllPathsScreen() {
  const { data: allPaths } = useAllUserPaths();

  return (
    <>
      <StatusBar />
      <SafeAreaView edges={["top"]} bg="primary">
        <ScrollView flex pb={12} showsVerticalScrollIndicator={false}>
          <Box px={4} pt={4} pb={4}>
            <Text size="2xl" weight="bold" mb={1}>
              My Learning Paths
            </Text>
            <Text variant="secondary" size="sm" mb={4}>
              Continue your learning journey
            </Text>
          </Box>
          {allPaths && allPaths.length > 0 && (
            <Box px={4}>
              <Box gap={3}>
                {allPaths.map((path) => (
                  <ContinueLearningCard key={path.id} path={path} />
                ))}
              </Box>
            </Box>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

