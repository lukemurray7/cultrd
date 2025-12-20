import { useTheme } from "../../../../../theme/ThemeProvider";
import { Box } from "../../../../components/Box";
import { Pressable } from "../../../../components/Pressable";
import { Text } from "../../../../components/Text";

type FilterType = "in-progress" | "completed" | "all";

interface LibraryFilterPillsProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const LibraryFilterPills = ({
  selectedFilter,
  onFilterChange,
}: LibraryFilterPillsProps) => {
  const theme = useTheme();

  const filters: { id: FilterType; label: string }[] = [
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "all", label: "All" },
  ];

  return (
    <Box row gap={3} py={3}>
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter.id;
        return (
          <Pressable
            key={filter.id}
            onPress={() => onFilterChange(filter.id)}
            borderRadius="xl"
            py={2}
            flex
            center
            style={{
              backgroundColor: isSelected
                ? theme.colors.brand.primary
                : theme.colors.bg.surfaceLight,
            }}
          >
            <Text
              size="sm"
              weight={isSelected ? "semibold" : "medium"}
              style={{
                color: isSelected
                  ? "#FFFFFF"
                  : theme.colors.text.secondary,
              }}
            >
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
};

