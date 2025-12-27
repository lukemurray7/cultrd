import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Share } from "react-native";
import { useAuth } from "../../../../../lib/auth/AuthProvider";
import { useAddCourseToLibrary, useRemoveCourseFromLibrary } from "../../../../../lib/mutations/library";
import { useLibraryCourses } from "../../../../../lib/queries/library";
import { Course } from "../../../../../types/courses";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../../ui/components/Box";
import { Pressable } from "../../../../../ui/components/Pressable";

interface CourseHeaderProps {
  courseId: string;
  course: Course;
}

export const CourseHeader = ({ courseId, course }: CourseHeaderProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuth();
  const { data: libraryCourses } = useLibraryCourses();
  const addToLibrary = useAddCourseToLibrary();
  const removeFromLibrary = useRemoveCourseFromLibrary();

  const isInLibrary = libraryCourses?.some((c) => c.id === courseId) ?? false;

  const handleShare = async () => {
    try {
      const courseUrl = Linking.createURL(`/course/${courseId}`);
      await Share.share({
        message: `Check out this course: ${course.title} - ${courseUrl}`,
        title: "Share Course",
        url: courseUrl,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleToggleLibrary = async () => {
    if (!user) return;
    try {
      if (isInLibrary) {
        await removeFromLibrary.mutateAsync(courseId);
      } else {
        await addToLibrary.mutateAsync(courseId);
      }
    } catch (error) {
      console.error("Error toggling library:", error);
    }
  };

  return (
    <Box row between center mx={4} my={1}>
      <Pressable
        onPress={() => router.back()}
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
      <Box row gap={4}>
        <Pressable
          onPress={handleShare}
          bg="surfaceLight"
          borderRadius="pill"
          border
          center
          shadow="sm"
          width={40}
          height={40}
        >
          <MaterialIcons
            name="share"
            size={24}
            color={theme.colors.text.primary}
          />
        </Pressable>
        {user && (
          <Pressable
            onPress={handleToggleLibrary}
            bg="surfaceLight"
            borderRadius="pill"
            border
            shadow="sm"
            center
            width={40}
            height={40}
          >
            <MaterialIcons
              name={isInLibrary ? "bookmark" : "bookmark-border"}
              size={24}
              color={isInLibrary ? theme.colors.brand.primary : theme.colors.text.primary}
            />
          </Pressable>
        )}
      </Box>
    </Box>
  );
};
