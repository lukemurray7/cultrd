import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing, typography, borders } from "../../theme/colors";

interface NavItem {
  name: string;
  iconOutline: keyof typeof Ionicons.glyphMap;
  iconFilled: keyof typeof Ionicons.glyphMap;
  route: string;
}

const navItems: NavItem[] = [
  { name: "Home", iconOutline: "home-outline", iconFilled: "home", route: "/pages/home" },
  { name: "Courses", iconOutline: "book-outline", iconFilled: "book", route: "/pages/courses" },
  { name: "Library", iconOutline: "bookmark-outline", iconFilled: "bookmark", route: "/pages/library" },
  { name: "Awards", iconOutline: "medal-outline", iconFilled: "medal", route: "/pages/awards" },
];

export function BottomNavBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const handlePress = (route: string) => {
    if (route === pathname) {
      return;
    }
    router.push(route as any);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {navItems.map((item) => {
        const isActive = pathname === item.route;
        const iconName = isActive ? item.iconFilled : item.iconOutline;
        return (
          <Pressable
            key={item.name}
            style={styles.navItem}
            onPress={() => handlePress(item.route)}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isActive ? colors.accent.blue : colors.text.secondary}
            />
            <Text
              style={[
                styles.navLabel,
                isActive && styles.navLabelActive,
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default BottomNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background.navBar,
    borderTopWidth: borders.width.thin,
    borderTopColor: colors.border.light,
    paddingTop: spacing.md,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeight.medium,
  },
  navLabelActive: {
    color: colors.accent.blue,
  },
});
