import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

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
  { name: "Settings", iconOutline: "settings-outline", iconFilled: "settings", route: "/pages/settings/account" },
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
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: 12,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
    fontWeight: "500",
  },
  navLabelActive: {
    color: colors.accent.blue,
  },
});
