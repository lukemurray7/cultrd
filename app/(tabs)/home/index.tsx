import { useState } from "react";
import { mockCategories } from "../../../__mocks__/courses";
import { useRecommendedCourses, useTrendingCourses } from "../../../lib/queries/courses";
import { Category } from "../../../types/courses";
import { Box } from "../../../ui/components/Box";
import { CategoryChip } from "../../../ui/components/CategoryChip";
import { Pressable } from "../../../ui/components/Pressable";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { SearchBar } from "../../../ui/components/SearchBar";
import { Text } from "../../../ui/components/Text";
import { FeaturedCard } from "../../../ui/pages/home/components/FeaturedCard";
import { HomeHeader } from "../../../ui/pages/home/components/HomeHeader";
import { RecommendedCard } from "../../../ui/pages/home/components/RecommendedCard";
import { TrendingCard } from "../../../ui/pages/home/components/TrendingCard";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("For You");
  const { data: trendingCourses } = useTrendingCourses();
  const { data: recommendedCourses } = useRecommendedCourses();

  return (
    <SafeAreaView edges={["top"]} bg="primary">
      <Box bg="primary" border pb={0}>
        <HomeHeader />
        <Box px={4} pb={4}>
          <SearchBar />
        </Box>
      </Box>
      <ScrollView flex pt={4} pb={12} showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pl={4}
          pr={4}
          gap={2}
          mb={6}
        >
          {mockCategories.map((category: Category, index: number) => (
            <CategoryChip
              key={category}
              label={category}
              icon={index === 0 ? "star" : undefined}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        <Box px={4} mb={6}>
          <Box row between mb={3}>
            <Text size="lg" weight="bold">
              Featured Today
            </Text>
          </Box>
          <FeaturedCard />
        </Box>

        <Box mb={6}>
          <Box row between px={4} mb={3}>
            <Text size="lg" weight="bold">
              Trending Now
            </Text>
            <Pressable>
              <Text size="sm" weight="semibold" variant="brand">
                See all
              </Text>
            </Pressable>
          </Box>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pl={4}
            pr={4}
            gap={4}
          >
            {trendingCourses?.map((course, index) => (
              <TrendingCard key={course.id} course={course} showBookmark={index === 0} />
            ))}
          </ScrollView>
        </Box>

        <Box px={4}>
          <Box row between mb={3}>
            <Text size="lg" weight="bold">
              Recommended For You
            </Text>
          </Box>
          <Box gap={4}>
            {recommendedCourses?.map((course) => (
              <RecommendedCard key={course.id} course={course} />
            ))}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
