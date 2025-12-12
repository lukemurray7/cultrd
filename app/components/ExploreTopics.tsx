import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - 48;
const GAP = 8;
const CARD_HEIGHT = 100;
const TALL_CARD_HEIGHT = CARD_HEIGHT * 2 + GAP;
const MEDIUM_CARD_WIDTH = (CONTAINER_WIDTH - GAP) / 2;
const LARGE_CARD_WIDTH = CONTAINER_WIDTH;

const topics = [
  { name: "History", size: "large", color: "#6369D1" },
  { name: "Economics", size: "medium", color: "#F7EEDC" },
  { name: "Philosophy", size: "medium", color: "#E83F6F" },
  { name: "Culture", size: "medium", color: "#4ECDC4" },
  { name: "Art & Music", size: "tall", color: "#9B59B6" },
  { name: "Politics", size: "large", color: "#F39C12" },
  { name: "Science", size: "medium", color: "#2ECC71" },
];

export function ExploreTopics() {
  const handleTopicPress = () => {
    router.push("/pages/courses");
  };

  const getCardStyle = (size: string) => {
    switch (size) {
      case "large":
        return { width: LARGE_CARD_WIDTH, height: CARD_HEIGHT };
      case "tall":
        return { width: MEDIUM_CARD_WIDTH, height: TALL_CARD_HEIGHT };
      case "medium":
        return { width: MEDIUM_CARD_WIDTH, height: CARD_HEIGHT };
      default:
        return { width: MEDIUM_CARD_WIDTH, height: CARD_HEIGHT };
    }
  };

  const getTextColor = (bgColor: string) => {
    const lightColors = ["#F7EEDC", "#F39C12"];
    return lightColors.includes(bgColor) ? "#000000" : "#FFFFFF";
  };

  const renderCard = (topic: typeof topics[0]) => {
    const cardStyle = getCardStyle(topic.size);
    const textColor = getTextColor(topic.color);

    return (
      <Pressable
        key={topic.name}
        style={[
          styles.card,
          {
            width: cardStyle.width,
            height: cardStyle.height,
            backgroundColor: topic.color,
          },
        ]}
        onPress={handleTopicPress}
      >
        <Text style={[styles.cardText, { color: textColor }]}>
          {topic.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Explore All Topics{" "}
        <Ionicons
          name="arrow-forward"
          size={18}
          color={colors.text.primary}
        />
      </Text>
      <View style={styles.grid}>
        <View style={styles.row}>
          {renderCard(topics[1])}
          {renderCard(topics[2])}
        </View>
        {renderCard(topics[0])}
        <View style={styles.row}>
          <View style={styles.column}>
            {renderCard(topics[4])}
          </View>
          <View style={styles.column}>
            {renderCard(topics[3])}
            {renderCard(topics[6])}
          </View>
        </View>
        {renderCard(topics[5])}
      </View>
    </View>
  );
}

export default ExploreTopics;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
  },
  grid: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  column: {
    gap: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

