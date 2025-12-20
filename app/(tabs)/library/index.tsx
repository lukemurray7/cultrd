import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useLibraryCourses } from "../../../lib/queries/courses";
import { Course } from "../../../types/courses";
import { Box } from "../../../ui/components/Box";
import { LibraryCourseCard } from "../../../ui/components/LibraryCourseCard";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { SearchBar } from "../../../ui/components/SearchBar";
import { LibraryFilterPills } from "../../../ui/pages/library/components/LibraryFilterPills";

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

export default function LibraryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("in-progress");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allCourses } = useLibraryCourses();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 16) / 2;

  const filteredByType = allCourses
    ? filterCourses(allCourses, selectedFilter)
    : [];

  const filteredCourses = searchQuery.trim()
    ? filteredByType.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByType;

  const courseRows: Course[][] = [];
  filteredCourses.forEach((course, index) => {
    if (index % 2 === 0) {
      courseRows.push([course]);
    } else {
      courseRows[courseRows.length - 1].push(course);
    }
  });

  return (
    <SafeAreaView edges={["top"]} bg="primary">
      <ScrollView flex pb={12} showsVerticalScrollIndicator={false}>
        <Box px={4} pt={4} pb={2}>
          <Box mb={4}>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          </Box>
          <LibraryFilterPills
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </Box>
        <Box px={4} pt={4}>
          {courseRows.map((row, rowIndex) => (
            <Box key={rowIndex} row gap={4} mb={4}>
              {row.map((course) => (
                <LibraryCourseCard key={course.id} course={course} width={cardWidth} />
              ))}
              {row.length === 1 && <Box width={cardWidth} />}
            </Box>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
