import { StatusBar } from "expo-status-bar";
import { Dimensions, SectionList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNavBar } from "../../components/BottomNavBar";
import { colors, spacing, typography } from "../../theme/colors";
import { testImage1 } from "../../utils/topicImages";
import { CourseCard } from "./components/CourseCard";
import { TopNav } from "./components/TopNav";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Course {
  id: string;
  title: string;
  imageSource?: any;
}

interface Subtopic {
  id: string;
  title: string;
  subtitle: string;
  courses: Course[];
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface SubtopicSection {
  id: string;
  topicTitle: string;
  subtopicTitle: string;
  subtitle: string;
  isFirstSubtopic: boolean;
  data: Course[][];
}

const generateCourses = (count: number, startId: number, topicName: string): Course[] => {
  const courseTitles: Record<string, string[]> = {
    history: [
      "Ancient Civilizations",
      "World War II: A Comprehensive Study",
      "The Renaissance Era",
      "Medieval Europe",
      "Ancient Egypt",
      "The Industrial Revolution",
      "Cold War History",
      "The Roman Empire",
    ],
    economics: [
      "Macroeconomics Fundamentals",
      "Microeconomics Principles",
      "Global Markets and Trade",
      "Economic Policy",
      "Financial Markets",
      "Behavioral Economics",
      "Development Economics",
      "International Trade",
    ],
    philosophy: [
      "Essential Philosophy: Theories and Thinkers",
      "Ethics and Moral Philosophy",
      "Eastern Philosophy Traditions",
      "Existentialism",
      "Stoicism",
      "Political Philosophy",
      "Philosophy of Mind",
      "Metaphysics",
    ],
    culture: [
      "World Cultures and Traditions",
      "Cultural Anthropology",
      "Modern Cultural Movements",
      "Indigenous Cultures",
      "Urban Culture",
      "Food Culture",
      "Religious Traditions",
      "Festivals Around the World",
    ],
    art: [
      "History of Classical Music",
      "Modern Art Movements",
      "Jazz and Blues History",
      "Rap Music Evolution",
      "Painting Styles Through History",
      "Sculpture and Architecture",
      "Digital Art",
      "Opera and Theater",
    ],
    politics: [
      "Political Systems Around the World",
      "Democracy and Governance",
      "International Relations",
      "UK Political History",
      "US Leaders and Presidents",
      "China and Asia Politics",
      "European Union",
      "Middle East Politics",
    ],
    science: [
      "The Science Behind Andrew Huberman's Morning Routine",
      "Quantum Physics Explained",
      "Climate Science and Sustainability",
      "Neuroscience Basics",
      "Astrophysics",
      "Biology and Evolution",
      "Chemistry Fundamentals",
      "Environmental Science",
    ],
  };

  const titles = courseTitles[topicName.toLowerCase()] || [];
  return Array.from({ length: count }, (_, i) => ({
    id: `${startId + i}`,
    title: titles[i % titles.length] || `${topicName} Course ${i + 1}`,
    imageSource: testImage1,
  }));
};

const mockTopics: Topic[] = [
  {
    id: "history",
    title: "History",
    subtopics: [
      {
        id: "history-1",
        title: "Ancient Civilizations",
        subtitle: "Explore the foundations of human civilization",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 1, "history"),
      },
      {
        id: "history-2",
        title: "World Wars",
        subtitle: "Understanding the conflicts that shaped the modern world",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 10, "history"),
      },
      {
        id: "history-3",
        title: "European History",
        subtitle: "From the Renaissance to modern Europe",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 20, "history"),
      },
    ],
  },
  {
    id: "economics",
    title: "Economics",
    subtopics: [
      {
        id: "economics-1",
        title: "Macroeconomics",
        subtitle: "Understanding economies at the national level",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 30, "economics"),
      },
      {
        id: "economics-2",
        title: "Microeconomics",
        subtitle: "Individual and business economic decisions",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 40, "economics"),
      },
      {
        id: "economics-3",
        title: "Global Markets",
        subtitle: "International trade and finance",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 50, "economics"),
      },
    ],
  },
  {
    id: "philosophy",
    title: "Philosophy",
    subtopics: [
      {
        id: "philosophy-1",
        title: "Western Philosophy",
        subtitle: "From ancient Greece to modern thinkers",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 60, "philosophy"),
      },
      {
        id: "philosophy-2",
        title: "Eastern Philosophy",
        subtitle: "Buddhist, Taoist, and Confucian traditions",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 70, "philosophy"),
      },
      {
        id: "philosophy-3",
        title: "Ethics",
        subtitle: "Moral philosophy and ethical reasoning",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 80, "philosophy"),
      },
    ],
  },
  {
    id: "culture",
    title: "Culture",
    subtopics: [
      {
        id: "culture-1",
        title: "World Traditions",
        subtitle: "Cultural practices from around the globe",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 90, "culture"),
      },
      {
        id: "culture-2",
        title: "Modern Culture",
        subtitle: "Contemporary cultural movements and trends",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 100, "culture"),
      },
      {
        id: "culture-3",
        title: "Anthropology",
        subtitle: "The study of human societies and cultures",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 110, "culture"),
      },
    ],
  },
  {
    id: "art",
    title: "Art & Music",
    subtopics: [
      {
        id: "art-1",
        title: "Rap Music",
        subtitle: "The evolution and impact of hip-hop culture",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 120, "art"),
      },
      {
        id: "art-2",
        title: "Painting Styles",
        subtitle: "From classical to contemporary painting techniques",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 130, "art"),
      },
      {
        id: "art-3",
        title: "Classical Music",
        subtitle: "Masterpieces and composers through the ages",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 140, "art"),
      },
      {
        id: "art-4",
        title: "Jazz and Blues",
        subtitle: "The roots of American music",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 150, "art"),
      },
    ],
  },
  {
    id: "politics",
    title: "Politics",
    subtopics: [
      {
        id: "politics-1",
        title: "UK Political History",
        subtitle: "From monarchy to modern democracy",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 160, "politics"),
      },
      {
        id: "politics-2",
        title: "US Leaders",
        subtitle: "Presidents and their impact on American history",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 170, "politics"),
      },
      {
        id: "politics-3",
        title: "China and Asia",
        subtitle: "Political systems and leaders across Asia",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 180, "politics"),
      },
      {
        id: "politics-4",
        title: "International Relations",
        subtitle: "Global politics and diplomacy",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 190, "politics"),
      },
    ],
  },
  {
    id: "science",
    title: "Science",
    subtopics: [
      {
        id: "science-1",
        title: "Neuroscience",
        subtitle: "Understanding the brain and nervous system",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 200, "science"),
      },
      {
        id: "science-2",
        title: "Physics",
        subtitle: "From quantum mechanics to astrophysics",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 210, "science"),
      },
      {
        id: "science-3",
        title: "Climate Science",
        subtitle: "Environmental science and sustainability",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 220, "science"),
      },
      {
        id: "science-4",
        title: "Biology",
        subtitle: "Life sciences and evolution",
        courses: generateCourses(Math.floor(Math.random() * 5) + 1, 230, "science"),
      },
    ],
  },
];

export default function CoursesScreen() {
  const insets = useSafeAreaInsets();

  const flattenTopicsToSections = (topics: Topic[]): SubtopicSection[] => {
    const sections: SubtopicSection[] = [];
    topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic, subtopicIndex) => {
        const rows: Course[][] = [];
        subtopic.courses.forEach((course, index) => {
          if (index % 2 === 0) {
            rows.push([course]);
          } else {
            rows[rows.length - 1].push(course);
          }
        });
        sections.push({
          id: subtopic.id,
          topicTitle: topic.title,
          subtopicTitle: subtopic.title,
          subtitle: subtopic.subtitle,
          isFirstSubtopic: subtopicIndex === 0,
          data: rows,
        });
      });
    });
    return sections;
  };

  const sections = flattenTopicsToSections(mockTopics);

  const renderSectionHeader = ({ section }: { section: SubtopicSection }) => {
    return (
      <View>
        {section.isFirstSubtopic && (
          <View style={styles.topicHeader}>
            <Text style={styles.topicTitle}>{section.topicTitle}</Text>
          </View>
        )}
        <View style={styles.subtopicHeader}>
          <Text style={styles.subtopicTitle}>{section.subtopicTitle}</Text>
          <Text style={styles.subtitle}>{section.subtitle}</Text>
        </View>
      </View>
    );
  };

  const renderCourseRow = ({ item }: { item: Course[] }) => {
    return (
      <View style={styles.row}>
        {item.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            imageSource={course.imageSource}
          />
        ))}
        {item.length === 1 && <View style={{ width: (SCREEN_WIDTH - spacing.lg * 3) / 2 }} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.topNavContainer, { paddingTop: insets.top }]}>
        <TopNav />
      </View>
      <SectionList
        sections={sections}
        renderItem={renderCourseRow}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => `row-${index}`}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  topNavContainer: {
    backgroundColor: colors.background.primary,
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: spacing.lg,
  },
  topicHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.md,
  },
  topicTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  subtopicHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  subtopicTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
});
