import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useAllUserPaths } from "../../../lib/queries/paths";
import { useTheme } from "../../../theme/ThemeProvider";
import { LearningPathProgress } from "../../../types/paths";
import { Box } from "../../../ui/components/Box";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { SearchBar } from "../../../ui/components/SearchBar";
import { StatusBar } from "../../../ui/components/StatusBar";
import { ContinueLearningCard } from "../../../ui/pages/paths/components/ContinueLearningCard";
import { PathFilterPills } from "../../../ui/pages/paths/components/PathFilterPills";

type FilterType = "in-progress" | "completed" | "all";

const filterPaths = (
  paths: LearningPathProgress[],
  filter: FilterType
): LearningPathProgress[] => {
  if (filter === "all") {
    return paths;
  }
  if (filter === "completed") {
    return paths.filter((path) => path.progressPercentage === 100);
  }
  return paths.filter(
    (path) => path.progressPercentage > 0 && path.progressPercentage < 100
  );
};

export default function AllPathsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("in-progress");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allPaths } = useAllUserPaths();

  const filteredByType = allPaths ? filterPaths(allPaths, selectedFilter) : [];

  const filteredPaths = searchQuery.trim()
    ? filteredByType.filter((path) =>
        path.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByType;

  return (
    <>
      <StatusBar />
      <SafeAreaView edges={["top"]} bg="primary">
        <ScrollView flex pb={12} showsVerticalScrollIndicator={false}>
          <Box px={4} pt={4} pb={2}>
            <Box row gap={3} center mb={4}>
              <Pressable
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back();
                  } else {
                    router.replace("/(tabs)/paths");
                  }
                }}
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
              <Box flex>
                <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
              </Box>
            </Box>
            <PathFilterPills
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </Box>
          {filteredPaths.length > 0 && (
            <Box px={4} pt={4}>
              <Box gap={3}>
                {filteredPaths.map((path) => (
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

