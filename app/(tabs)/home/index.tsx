import Animated, { FadeIn } from "react-native-reanimated";
import {
  useRecommendedCourses,
  useTrendingCourses,
} from "../../../lib/queries/courses";
import { Box } from "../../../ui/components/Box";
import { CourseCardSkeleton } from "../../../ui/components/CourseCardSkeleton";
import { HorizontalScrollableCourses } from "../../../ui/components/HorizontalScrollableCourses";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { ScrollView } from "../../../ui/components/ScrollView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";
import { CourseCardSkeleton as RecommendedCardSkeleton } from "../../../ui/pages/home/components/CourseCardSkeleton";
import { FeaturedCard } from "../../../ui/pages/home/components/FeaturedCard";
import { HomeHeader } from "../../../ui/pages/home/components/HomeHeader";
import { RecommendedCard } from "../../../ui/pages/home/components/RecommendedCard";
import { TrendingCard } from "../../../ui/pages/home/components/TrendingCard";

export default function HomeScreen() {
  const { data: trendingCourses, isLoading: isLoadingTrending } = useTrendingCourses();
  const { data: recommendedCourses, isLoading: isLoadingRecommended } = useRecommendedCourses();

  const showTrendingSkeletons = !trendingCourses && isLoadingTrending;
  const showRecommendedSkeletons = !recommendedCourses && isLoadingRecommended;

  return (
    <>
      <StatusBar />
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
            isLoading={showTrendingSkeletons}
            renderCard={(course, index) => (
              <TrendingCard course={course} showBookmark={index === 0} index={index} />
            )}
            renderSkeleton={() => <CourseCardSkeleton />}
            showSeeAll={false}
          />

          <Box px={4}>
            <Animated.View entering={FadeIn.delay(300).duration(400)}>
              <Box row between mb={3}>
                <Text size="lg" weight="bold">
                  Recommended For You
                </Text>
              </Box>
            </Animated.View>
            <Box gap={4}>
              {showRecommendedSkeletons ? (
                <>
                  <RecommendedCardSkeleton />
                  <RecommendedCardSkeleton />
                  <RecommendedCardSkeleton />
                </>
              ) : (
                recommendedCourses?.map((course, index) => (
                  <RecommendedCard key={course.id} course={course} index={index} />
                ))
              )}
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
