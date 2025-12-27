import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Share } from "react-native";
import { useAuth } from "../../../../../lib/auth/AuthProvider";
import { useAddPathToLibrary, useRemovePathFromLibrary } from "../../../../../lib/mutations/library";
import { useLibraryPaths } from "../../../../../lib/queries/library";
import { LearningPath, LearningPathProgress } from "../../../../../types/paths";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";

interface PathHeaderProps {
  pathId: string;
  path: LearningPath | LearningPathProgress;
}

export const PathHeader = ({ pathId, path }: PathHeaderProps) => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuth();
  const { data: libraryPaths } = useLibraryPaths();
  const addToLibrary = useAddPathToLibrary();
  const removeFromLibrary = useRemovePathFromLibrary();

  const isInLibrary = libraryPaths?.some((p) => p.id === pathId) ?? false;

  const handleShare = async () => {
    try {
      const pathUrl = Linking.createURL(`/path/${pathId}`);
      await Share.share({
        message: `Check out this learning path: ${path.title} - ${pathUrl}`,
        title: "Share Path",
        url: pathUrl,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleToggleLibrary = async () => {
    if (!user) return;
    try {
      if (isInLibrary) {
        await removeFromLibrary.mutateAsync(pathId);
      } else {
        await addToLibrary.mutateAsync(pathId);
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
