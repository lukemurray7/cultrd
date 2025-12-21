import { MaterialIcons } from '@expo/vector-icons';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export default function TabLayout() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: `${theme.colors.bg.primary}CC`,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: theme.typography.weight.medium,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size || 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size || 26} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (pathname && pathname.startsWith("/(tabs)/courses/") && pathname !== "/(tabs)/courses/index") {
              e.preventDefault();
              router.replace("/(tabs)/courses/index");
            }
          },
        }}
      />
      <Tabs.Screen
        name="paths/index"
        options={{
          title: 'Paths',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-tree" size={size || 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="paths/all"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="library/index"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bookmarks" size={size || 26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size || 26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
