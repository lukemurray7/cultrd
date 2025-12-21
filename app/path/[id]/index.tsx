import { useLocalSearchParams } from "expo-router";
import { usePath } from "../../../lib/queries/paths";
import { Box } from "../../../ui/components/Box";
import { SafeAreaView } from "../../../ui/components/SafeAreaView";
import { StatusBar } from "../../../ui/components/StatusBar";
import { Text } from "../../../ui/components/Text";

export default function PathDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: path } = usePath(id || "");

  if (!path) {
    return (
      <>
        <StatusBar />
        <SafeAreaView edges={["top"]} bg="primary">
          <Box p={4}>
            <Text>Path not found</Text>
          </Box>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar />
      <SafeAreaView edges={["top"]} bg="primary">
        <Box p={4}>
          <Text size="xl" weight="bold" mb={2}>
            {path.title}
          </Text>
          <Text variant="secondary">{path.description}</Text>
        </Box>
      </SafeAreaView>
    </>
  );
}

