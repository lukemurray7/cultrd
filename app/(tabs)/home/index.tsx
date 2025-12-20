import {
  useRecommendedCourses,
  useTrendingCourses,
} from "../../../lib/queries/courses";
import { Box } from "../../../ui/components/Box";
import { HorizontalScrollableCourses } from "../../../ui/components/HorizontalScrollableCourses";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { Text } from "../../../ui/components/Text";
import { FeaturedCard } from "../../../ui/pages/home/components/FeaturedCard";
import { HomeHeader } from "../../../ui/pages/home/components/HomeHeader";
import { RecommendedCard } from "../../../ui/pages/home/components/RecommendedCard";
import { TrendingCard } from "../../../ui/pages/home/components/TrendingCard";

export default function HomeScreen() {
  const { data: trendingCourses } = useTrendingCourses();
  const { data: recommendedCourses } = useRecommendedCourses();

  return (
    <SafeAreaView edges={["top"]} bg="primary">
      <ScrollView flex pb={12} showsVerticalScrollIndicator={false}>
        <Box bg="primary" pb={0} mb={4}>
          <HomeHeader />
        </Box>

        <Box px={4} mb={6} shadow="sm">
          <FeaturedCard />
        </Box>

        <HorizontalScrollableCourses
          title="Trending Now"
          courses={trendingCourses}
          renderCard={(course, index) => (
            <TrendingCard
              course={course}
              showBookmark={index === 0}
            />
          )}
          showSeeAll={false}
        />

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
