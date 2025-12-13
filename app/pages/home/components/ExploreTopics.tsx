import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useTopics } from "../../../../lib/queries/topics";
import { borders, colors, spacing, typography } from "../../../theme/colors";
import { topicImages } from "../../../utils/topicImages";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - spacing.xxl * 2;
const GAP = spacing.sm;
const CARD_HEIGHT = 100;
const TALL_CARD_HEIGHT = CARD_HEIGHT * 2 + GAP;
const MEDIUM_CARD_WIDTH = (CONTAINER_WIDTH - GAP) / 2;
const LARGE_CARD_WIDTH = CONTAINER_WIDTH;

export function ExploreTopics() {
  const { data: topicsData = [], isLoading } = useTopics();

  const handleTopicPress = () => {
    router.push("/pages/courses");
  };

  const getTopicBySlug = (slug: string) => {
    return topicsData.find((topic) => topic.slug === slug);
  };

  const renderHistoryCard = () => {
    const topic = getTopicBySlug("history");
    if (!topic) return null;
    const bgImage = topic.slug in topicImages ? topic.slug : "history";
    return (
      <Pressable
        style={[styles.cardHistory]}
        onPress={handleTopicPress}
      >
        <Image
          source={topicImages[bgImage]}
          style={styles.cardHistoryImage}
          contentFit="contain"
        />
        <Text style={styles.cardHistoryText}>
          {topic.name}
        </Text>
      </Pressable>
    );
  };

  const renderEconomicsCard = () => {
    const topic = getTopicBySlug("economics");
    if (!topic) return null;
    const bgImage = topic.slug in topicImages ? topic.slug : "economics";
    return (
      <Pressable
        style={[styles.cardEconomics]}
        onPress={handleTopicPress}
      >
        <Image
          source={topicImages[bgImage]}
          style={styles.cardEconomicsImage}
          contentFit="contain"
        />
        <Text style={styles.cardEconomicsText}>
          {topic.name}
        </Text>
      </Pressable>
    );
  };

  const renderPhilosophyCard = () => {
    const topic = getTopicBySlug("philosophy");
    if (!topic) return null;
    const bgImage = topic.slug in topicImages ? topic.slug : "philosophy";
    return (
      <Pressable
        style={[styles.cardPhilosophy]}
        onPress={handleTopicPress}
      >
        <Image
          source={topicImages[bgImage]}
          style={styles.cardPhilosophyImage}
          contentFit="contain"
        />
        <Text style={styles.cardPhilosophyText}>
          {topic.name}
        </Text>
      </Pressable>
    );
  };

  const renderCultureCard = () => {
    const topic = getTopicBySlug("culture");
    if (!topic) return null;
    const bgImage = topic.slug in topicImages ? topic.slug : "culture";
    return (
      <Pressable
        style={[styles.cardCulture]}
        onPress={handleTopicPress}
      >
        <Image
          source={topicImages[bgImage]}
          style={styles.cardCultureImage}
          contentFit="contain"
        />
        <Text style={styles.cardCultureText}>
          {topic.name}
        </Text>
      </Pressable>
    );
  };

  const renderArtCard = () => {
    const topic = getTopicBySlug("art");
    if (!topic) return null;
    const bgImage = topic.slug in topicImages ? topic.slug : "art";
    return (
      <Pressable
        style={[styles.cardArt]}
        onPress={handleTopicPress}
      >
        <Image
          source={topicImages[bgImage]}
          style={styles.cardArtImage}
          contentFit="contain"
        />
        <Text style={styles.cardArtText}>
          {topic.name}
        </Text>
      </Pressable>
    );
  };

  const renderPoliticsCard = () => {
    const topic = getTopicBySlug("politics");
    if (!topic) return null;
    const bgImage = topic.slug in topicImages ? topic.slug : "politics";
    return (
      <Pressable
        style={[styles.cardPolitics]}
        onPress={handleTopicPress}
      >
        <Text style={styles.cardPoliticsText}>
          {topic.name}
        </Text>
        <Image
          source={topicImages[bgImage]}
          style={styles.cardPoliticsImage}
          contentFit="contain"
        />
      </Pressable>
    );
  };

  const renderScienceCard = () => {
    const topic = getTopicBySlug("science");
    if (!topic) return null;
    const bgImage = topic.slug in topicImages ? topic.slug : "science";
    return (
      <Pressable
        style={[styles.cardScience]}
        onPress={handleTopicPress}
      >
        <Image
          source={topicImages[bgImage]}
          style={styles.cardScienceImage}
          contentFit="contain"
        />
        <Text style={styles.cardScienceText}>
          {topic.name}
        </Text>
      </Pressable>
    );
  };

  if (isLoading) {
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.accent.blue} />
        </View>
      </View>
    );
  }

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
  loadingContainer: {
    paddingVertical: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
});

