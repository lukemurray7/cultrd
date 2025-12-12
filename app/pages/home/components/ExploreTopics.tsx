import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - spacing.xxl * 2;
const GAP = spacing.sm;
const CARD_HEIGHT = 100;
const TALL_CARD_HEIGHT = CARD_HEIGHT * 2 + GAP;
const MEDIUM_CARD_WIDTH = (CONTAINER_WIDTH - GAP) / 2;
const LARGE_CARD_WIDTH = CONTAINER_WIDTH;

const topicImages: Record<string, any> = {
  "history-icon.png": require("../../../../assets/images/econ-icon.png"),
  "econ-icon.png": require("../../../../assets/images/econ-icon.png"),
  "philosophy-icon.png": require("../../../../assets/images/econ-icon.png"),
  "culture-icon.png": require("../../../../assets/images/econ-icon.png"),
  "art-icon.png": require("../../../../assets/images/econ-icon.png"),
  "politics-icon.png": require("../../../../assets/images/econ-icon.png"),
  "science-icon.png": require("../../../../assets/images/econ-icon.png"),
};

const topics = [
  { name: "History", size: "large", color: colors.accent.blue, bgImage: 'history-icon.png' },
  { name: "Economics", size: "medium", color: colors.accent.yellow, bgImage: 'econ-icon.png' },
  { name: "Philosophy", size: "medium", color: colors.accent.red, bgImage: 'philosophy-icon.png' },
  { name: "Culture", size: "medium", color: colors.accent.teal, bgImage: 'culture-icon.png' },
  { name: "Art & Music", size: "tall", color: colors.accent.purpleDark, bgImage: 'art-icon.png' },
  { name: "Politics", size: "large", color: colors.accent.orange, bgImage: 'politics-icon.png' },
  { name: "Science", size: "medium", color: colors.accent.green, bgImage: 'science-icon.png' },
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

  const renderCard = (topic: typeof topics[0]) => {
    const cardStyle = getCardStyle(topic.size);

    return (
      <Pressable
        key={topic.name}
        style={[
          styles.card,
          {
            width: cardStyle.width,
            height: cardStyle.height,
            borderColor: topic.color,
          },
        ]}
        onPress={handleTopicPress}
      >
        <Image
          source={topicImages[topic.bgImage]}
          style={styles.cardImage}
          contentFit="contain"
        />
        <Text style={styles.cardText}>
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
    marginHorizontal: spacing.xxl,
    marginTop: spacing.xxxl,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  grid: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  column: {
    gap: spacing.sm,
  },
  card: {
    borderRadius: borders.radius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    flex: 1,
    marginBottom: spacing.sm,
  },
  cardText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
});

