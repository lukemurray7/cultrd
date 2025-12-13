import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../../theme/colors";
import { topicImages } from "../../../utils/topicImages";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - spacing.xxl * 2;
const GAP = spacing.sm;
const CARD_HEIGHT = 100;
const TALL_CARD_HEIGHT = CARD_HEIGHT * 2 + GAP;
const MEDIUM_CARD_WIDTH = (CONTAINER_WIDTH - GAP) / 2;
const LARGE_CARD_WIDTH = CONTAINER_WIDTH;

const topics = [
  { name: "History", size: "large", color: colors.accent.blue, bgImage: 'history' },
  { name: "Economics", size: "medium", color: colors.accent.yellow, bgImage: 'economics' },
  { name: "Philosophy", size: "medium", color: colors.accent.red, bgImage: 'philosophy' },
  { name: "Culture", size: "medium", color: colors.accent.teal, bgImage: 'culture' },
  { name: "Art & Music", size: "tall", color: colors.accent.red, bgImage: 'art' },
  { name: "Politics", size: "large", color: colors.accent.blue, bgImage: 'politics' },
  { name: "Science", size: "medium", color: colors.accent.green, bgImage: 'science' },
];

export function ExploreTopics() {
  const handleTopicPress = () => {
    router.push("/pages/courses");
  };

  const renderHistoryCard = () => (
    <Pressable
      style={[styles.cardHistory]}
      onPress={handleTopicPress}
    >
      <Image
        source={topicImages["history"]}
        style={styles.cardHistoryImage}
        contentFit="contain"
      />
      <Text style={styles.cardHistoryText}>
        {topics[0].name}
      </Text>
    </Pressable>
  );

  const renderEconomicsCard = () => (
    <Pressable
      style={[styles.cardEconomics]}
      onPress={handleTopicPress}
    >
      <Image
        source={topicImages["economics"]}
        style={styles.cardEconomicsImage}
        contentFit="contain"
      />
      <Text style={styles.cardEconomicsText}>
        {topics[1].name}
      </Text>
    </Pressable>
  );

  const renderPhilosophyCard = () => (
    <Pressable
      style={[styles.cardPhilosophy]}
      onPress={handleTopicPress}
    >
      <Image
        source={topicImages["philosophy"]}
        style={styles.cardPhilosophyImage}
        contentFit="contain"
      />
      <Text style={styles.cardPhilosophyText}>
        {topics[2].name}
      </Text>
    </Pressable>
  );

  const renderCultureCard = () => (
    <Pressable
      style={[styles.cardCulture]}
      onPress={handleTopicPress}
    >
      <Image
        source={topicImages["culture"]}
        style={styles.cardCultureImage}
        contentFit="contain"
      />
      <Text style={styles.cardCultureText}>
        {topics[3].name}
      </Text>
    </Pressable>
  );

  const renderArtCard = () => (
    <Pressable
      style={[styles.cardArt]}
      onPress={handleTopicPress}
    >
      <Image
        source={topicImages["art"]}
        style={styles.cardArtImage}
        contentFit="contain"
      />
      <Text style={styles.cardArtText}>
        {topics[4].name}
      </Text>
    </Pressable>
  );

  const renderPoliticsCard = () => (
    <Pressable
      style={[styles.cardPolitics]}
      onPress={handleTopicPress}
    >
      <Text style={styles.cardPoliticsText}>
        {topics[5].name}
      </Text>
      <Image
        source={topicImages["politics"]}
        style={styles.cardPoliticsImage}
        contentFit="contain"
      />
    </Pressable>
  );

  const renderScienceCard = () => (
    <Pressable
      style={[styles.cardScience]}
      onPress={handleTopicPress}
    >
      <Image
        source={topicImages["science"]}
        style={styles.cardScienceImage}
        contentFit="contain"
      />
      <Text style={styles.cardScienceText}>
        {topics[6].name}
      </Text>
    </Pressable>
  );

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
          {renderEconomicsCard()}
          {renderPhilosophyCard()}
        </View>
        {renderHistoryCard()}
        <View style={styles.row}>
          <View style={styles.column}>
            {renderArtCard()}
          </View>
          <View style={styles.column}>
            {renderCultureCard()}
            {renderScienceCard()}
          </View>
        </View>
        {renderPoliticsCard()}
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
    fontSize: typography.fontSize.sm,
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
  cardHistory: {
    width: LARGE_CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borders.radius.xxl,
    borderColor: "rgba(255, 215, 0, 0.5)",
    backgroundColor: "rgba(255, 215, 0, 0.1)", // 20% opacity for gold
    padding: spacing.lg,
    borderWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHistoryImage: {
    width: 100,
    height: 100,
    marginRight: spacing.md,
  },
  cardHistoryText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
  },
  cardEconomics: {
    width: MEDIUM_CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borders.radius.xxl,
    backgroundColor: colors.accent.purple,
    borderColor: colors.accent.purpleDark,
    borderWidth: 4,
    padding: spacing.md,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardEconomicsImage: {
    width: "100%",
    height: 50,
  },
  cardEconomicsText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  cardPhilosophy: {
    width: MEDIUM_CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borders.radius.xxl,
    backgroundColor: colors.accent.red,
    borderColor: colors.accent.red,
    borderWidth: 4,
    padding: spacing.md,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardPhilosophyImage: {
    width: "100%",
    height: 50,
  },
  cardPhilosophyText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  cardCulture: {
    width: MEDIUM_CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borders.radius.xxl,
    backgroundColor: colors.accent.teal,
    borderColor: colors.accent.teal,
    borderWidth: 4,
    padding: spacing.md,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardCultureImage: {
    width: "100%",
    height: 50,
  },
  cardCultureText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  cardArt: {
    width: MEDIUM_CARD_WIDTH,
    height: TALL_CARD_HEIGHT,
    borderRadius: borders.radius.xxl,
    backgroundColor: "rgba(232, 63, 111, 0.3)",
    borderColor: colors.accent.red,
    padding: spacing.lg,
    borderWidth: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardArtImage: {
    width: "100%",
    height: 140,
    marginBottom: spacing.xs,
  },
  cardArtText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  cardPolitics: {
    width: LARGE_CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borders.radius.xxl,
    backgroundColor: colors.accent.blue,
    borderColor: colors.accent.red,
    padding: spacing.lg,
    borderWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardPoliticsImage: {
    width: 100,
    height: 100,
    marginRight: spacing.md,
  },
  cardPoliticsText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
    textAlign: "right",
    marginRight: spacing.xxxxl,
  },
  cardScience: {
    width: MEDIUM_CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borders.radius.xxl,
    backgroundColor: "rgba(46, 204, 113, 0.3)",
    padding: spacing.lg,
    borderWidth: 4,
    borderColor: colors.accent.green,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardScienceImage: {
    width: "100%",
    height: 50,
  },
  cardScienceText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
});

