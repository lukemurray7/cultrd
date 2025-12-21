import { Theme } from "../../theme/tokens";
import { Category } from "../../types/courses";

export const getCategoryColor = (category: Category | string, theme: Theme): string => {
  const categoryMap: Record<string, string> = {
    History: theme.colors.topics.history,
    Economics: theme.colors.brand.accent,
    Philosophy: theme.colors.topics.philosophy,
    Culture: theme.colors.topics.culture,
    Music: theme.colors.topics.music,
    Politics: theme.colors.topics.politics,
    Science: theme.colors.topics.science,
    Art: theme.colors.brand.primary,
    "For You": theme.colors.brand.primary,
  };
  return categoryMap[category] || theme.colors.brand.primary;
};

