import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useLibraryCourses, useLibraryPaths } from "../../../lib/queries/library";
import { Course } from "../../../types/courses";
import { LearningPath, LearningPathProgress } from "../../../types/paths";
import { Box } from "../../../ui/components/Box";
import { LibraryCourseCard } from "../../../ui/components/LibraryCourseCard";
import { LibraryPathCard } from "../../../ui/components/LibraryPathCard";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { SearchBar } from "../../../ui/components/SearchBar";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { LibraryFilterPills } from "../../../ui/pages/library/components/LibraryFilterPills";
import { useTheme } from "../../../theme/ThemeProvider";

type TabType = "courses" | "paths";
type FilterType = "in-progress" | "completed" | "all";

const filterCourses = (courses: Course[], filter: FilterType): Course[] => {
  if (filter === "all") {
    return courses;
  }
  if (filter === "completed") {
    return courses.filter(
      (course) =>
        course.currentChapter !== undefined &&
        course.totalChapters !== undefined &&
        course.currentChapter === course.totalChapters
    );
  }
  return courses.filter(
    (course) =>
      course.currentChapter === undefined ||
      course.totalChapters === undefined ||
      course.currentChapter < course.totalChapters
  );
};

const filterPaths = (paths: (LearningPath | LearningPathProgress)[], filter: FilterType): (LearningPath | LearningPathProgress)[] => {
  if (filter === "all") {
    return paths;
  }
  if (filter === "completed") {
    return paths.filter(
      (path) =>
        "progressPercentage" in path &&
        (path.progressPercentage === 100 || path.coursesCompleted === path.totalCourses)
    );
  }
  return paths.filter(
    (path) =>
      !("progressPercentage" in path) ||
      (path.progressPercentage < 100 && path.coursesCompleted < path.totalCourses)
  );
};

export default function LibraryScreen() {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState<TabType>("courses");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("in-progress");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allCourses } = useLibraryCourses();
  const { data: allPaths } = useLibraryPaths();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  const filteredCourses = allCourses
    ? filterCourses(allCourses, selectedFilter)
    : [];
  const filteredPaths = allPaths
    ? filterPaths(allPaths, selectedFilter)
    : [];

  const searchFilteredCourses = searchQuery.trim()
    ? filteredCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredCourses;

  const searchFilteredPaths = searchQuery.trim()
    ? filteredPaths.filter((path) =>
        path.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredPaths;

  const courseRows: Course[][] = [];
  searchFilteredCourses.forEach((course, index) => {
    if (index % 2 === 0) {
      courseRows.push([course]);
    } else {
      courseRows[courseRows.length - 1].push(course);
    }
  });

  const pathRows: (LearningPath | LearningPathProgress)[][] = [];
  searchFilteredPaths.forEach((path, index) => {
    if (index % 2 === 0) {
      pathRows.push([path]);
    } else {
      pathRows[pathRows.length - 1].push(path);
    }
  });

  return (
    <>
      <StatusBar />
      <SafeAreaView edges={["top"]} bg="primary">
      <ScrollView flex pb={12} showsVerticalScrollIndicator={false}>
        <Box px={4} pt={4} pb={2}>
          <Box mb={4}>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          </Box>
          <Box row gap={3} mb={3}>
            <Pressable
              onPress={() => setSelectedTab("courses")}
              borderRadius="xl"
              py={2}
              flex
              center
              style={{
                backgroundColor: selectedTab === "courses"
                  ? theme.colors.brand.primary
                  : theme.colors.bg.surfaceLight,
              }}
            >
              <Text
                size="sm"
                weight={selectedTab === "courses" ? "semibold" : "medium"}
                style={{
                  color: selectedTab === "courses"
                    ? "#FFFFFF"
                    : theme.colors.text.secondary,
                }}
              >
                Courses
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedTab("paths")}
              borderRadius="xl"
              py={2}
              flex
              center
              style={{
                backgroundColor: selectedTab === "paths"
                  ? theme.colors.brand.primary
                  : theme.colors.bg.surfaceLight,
              }}
            >
              <Text
                size="sm"
                weight={selectedTab === "paths" ? "semibold" : "medium"}
                style={{
                  color: selectedTab === "paths"
                    ? "#FFFFFF"
                    : theme.colors.text.secondary,
                }}
              >
                Paths
              </Text>
            </Pressable>
          </Box>
          <LibraryFilterPills
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </Box>
        <Box px={4} pt={4}>
          {selectedTab === "courses" && (
            <>
              {courseRows.map((row, rowIndex) => (
                <Box key={rowIndex} row gap={4} mb={4}>
                  {row.map((course) => (
                    <LibraryCourseCard key={course.id} course={course} width={cardWidth} />
                  ))}
                  {row.length === 1 && <Box width={cardWidth} />}
                </Box>
              ))}
              {courseRows.length === 0 && (
                <Box center py={8}>
                  <Text variant="secondary">No courses found</Text>
                </Box>
              )}
            </>
          )}
          {selectedTab === "paths" && (
            <>
              {pathRows.map((row, rowIndex) => (
                <Box key={rowIndex} row gap={4} mb={4}>
                  {row.map((path) => (
                    <LibraryPathCard key={path.id} path={path} width={cardWidth} />
                  ))}
                  {row.length === 1 && <Box width={cardWidth} />}
                </Box>
              ))}
              {pathRows.length === 0 && (
                <Box center py={8}>
                  <Text variant="secondary">No paths found</Text>
                </Box>
              )}
            </>
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
