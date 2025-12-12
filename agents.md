# Agent Rules

## File Structure

All pages must be organized in the following structure:
- `app/pages/[subfolder]/[pagenamefolder]/index.tsx`

Example:
- Splash screen: `app/pages/splash/index.tsx`
- Onboarding screen: `app/pages/onboarding/index.tsx`

## Components

Reusable components are located in `app/components/` and must:
- Export both named exports (for direct imports) and default exports (required by Expo Router)
- Follow the pattern: `export function ComponentName() { ... }` followed by `export default ComponentName;`

Example:
```typescript
export function MyComponent() {
  return <View>...</View>;
}

export default MyComponent;
```

Components in `app/components/`:
- `ProgressBar` - Progress indicator with optional back button
- `ContinueButton` - Gradient button with disabled state
- `OptionButton` - Single-selection button component
- `CheckboxOption` - Multi-selection button with checkbox

## Page Components

Reusable page components are located in `app/components/pages/` and provide complete page layouts for common patterns. **Always use these components instead of creating similar pages from scratch.**

### ButtonQuestionPage

Use for single-selection question pages (e.g., gender selection, age selection, referral source).

**Location:** `app/components/pages/ButtonQuestionPage.tsx`

**Props:**
- `title: string` - The question/title displayed at the top
- `options: string[]` - Array of option labels
- `progress: number` - Progress percentage (0-100) for the progress bar
- `nextRoute: string` - Route to navigate to when Continue is pressed
- `onContinue?: (selected: string) => void` - Optional callback with selected value

**Example:**
```typescript
import { ButtonQuestionPage } from "../../../components/pages/ButtonQuestionPage";

export default function GenderScreen() {
  return (
    <ButtonQuestionPage
      title="What best describes you?"
      options={["Male", "Female", "Non-binary", "Prefer not to say"]}
      progress={80}
      nextRoute="/pages/onboarding/age"
    />
  );
}
```

**Used by:** `gender`, `age`, `referral` pages

### CheckboxQuestionPage

Use for multi-selection question pages (e.g., topic selection, interest selection).

**Location:** `app/components/pages/CheckboxQuestionPage.tsx`

**Props:**
- `title: string` - The question/title displayed at the top
- `subtitle?: string` - Optional subtitle text (e.g., instructions)
- `options: string[]` - Array of option labels
- `progress: number` - Progress percentage (0-100) for the progress bar
- `nextRoute: string` - Route to navigate to when Continue is pressed
- `maxSelections?: number` - Optional maximum number of selections allowed
- `requireSelection?: boolean` - Whether at least one selection is required (default: `true`)
- `onContinue?: (selected: Set<string>) => void` - Optional callback with selected values

**Example:**
```typescript
import { CheckboxQuestionPage } from "../../../components/pages/CheckboxQuestionPage";

export default function TopicsScreen() {
  return (
    <CheckboxQuestionPage
      title="Which of these topics interest you?"
      subtitle="(Select up to 5 to start. You can always explore more later.)"
      options={["History", "Science & Technology", "Philosophy"]}
      progress={90}
      nextRoute="/pages/onboarding/referral"
      maxSelections={5}
    />
  );
}
```

**Used by:** `topics`, `science-topics`, `philosophy-topics` pages

**Important:** When creating new onboarding question pages, check if they match these patterns and use the appropriate reusable component instead of building from scratch.

## Component Organization

### Page-Specific Components

Components that are only used by a specific page should be placed in:
- `app/pages/[pagename]/components/[ComponentName].tsx`

**Example:**
- Home page components: `app/pages/home/components/StreakView.tsx`
- Home page components: `app/pages/home/components/ExploreTopics.tsx`

**Import pattern:**
```typescript
import { StreakView } from "./components/StreakView";
```

### Reusable Components

Components that can be used across multiple pages should be placed in:
- `app/components/[ComponentName].tsx`

**Examples:**
- `Carousel` - Used in multiple pages
- `CourseCard` - Used in multiple pages
- `BottomNavBar` - Used globally

## Styling Patterns

### Theme System - CRITICAL RULE

**NEVER use hardcoded values for colors, spacing, typography, borders, or border radius.** All styling values MUST come from the theme system.

**Import pattern:**
```typescript
import { colors, fonts, spacing, typography, borders } from "../theme/colors";
```

### Theme Structure

The theme file (`app/theme/colors.ts`) provides:

#### Colors
```typescript
colors.background.primary
colors.text.primary
colors.accent.blue
colors.success.green
colors.error.red
colors.border.lightGray
// ... etc
```

#### Spacing
All padding and margin values must use spacing tokens:
```typescript
spacing.xs      // 4px
spacing.sm      // 8px
spacing.md      // 12px
spacing.lg      // 16px
spacing.xl      // 20px
spacing.xxl     // 24px
spacing.xxxl    // 32px
spacing.xxxxl   // 40px
spacing.xxxxxl  // 50px
spacing.xxxxxxl // 60px
```

**Example:**
```typescript
// ✅ CORRECT
paddingHorizontal: spacing.xl,
marginBottom: spacing.lg,
padding: spacing.md,

// ❌ WRONG - Never do this
paddingHorizontal: 20,
marginBottom: 16,
padding: 12,
```

#### Typography

**Font Sizes:**
```typescript
typography.fontSize.xs         // 12px
typography.fontSize.sm         // 14px
typography.fontSize.base      // 16px
typography.fontSize.lg         // 18px
typography.fontSize.xl         // 20px
typography.fontSize.xxl        // 24px
typography.fontSize.xxxl       // 26px
typography.fontSize.title      // 28px
typography.fontSize.titleLarge // 32px
typography.fontSize.display    // 40px
```

**Font Weights:**
```typescript
typography.fontWeight.regular  // "400"
typography.fontWeight.medium    // "500"
typography.fontWeight.semibold  // "600"
typography.fontWeight.bold      // "700"
```

**Example:**
```typescript
// ✅ CORRECT
fontSize: typography.fontSize.base,
fontWeight: typography.fontWeight.semibold,

// ❌ WRONG - Never do this
fontSize: 16,
fontWeight: "600",
```

#### Borders

**Border Widths:**
```typescript
borders.width.hairline  // 0.5px
borders.width.thin      // 1px
borders.width.medium    // 2px
borders.width.thick     // 3px
```

**Border Radius:**
```typescript
borders.radius.none     // 0
borders.radius.xs       // 2px
borders.radius.sm       // 4px
borders.radius.md       // 6px
borders.radius.base     // 12px
borders.radius.lg       // 16px
borders.radius.xl       // 20px
borders.radius.xxl      // 24px
borders.radius.circle   // 100px
```

**Example:**
```typescript
// ✅ CORRECT
borderWidth: borders.width.thin,
borderRadius: borders.radius.base,

// ❌ WRONG - Never do this
borderWidth: 1,
borderRadius: 12,
```

#### Fonts
```typescript
fonts.ubuntu.regular  // "Ubuntu_400Regular"
fonts.ubuntu.medium   // "Ubuntu_500Medium"
fonts.ubuntu.bold     // "Ubuntu_700Bold"
```

### Complete Style Example

```typescript
import { colors, spacing, typography, borders } from "../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxxxl,
  },
  title: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.black,
    marginBottom: spacing.xxxl,
  },
  button: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borders.radius.base,
    borderWidth: borders.width.thin,
    borderColor: colors.border.lightGray,
  },
  buttonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
});
```

### StyleSheet Pattern

1. Define styles at the bottom of the file using `StyleSheet.create()`
2. Use descriptive style names (e.g., `container`, `button`, `buttonDisabled`)
3. Apply conditional styles using array syntax:
   ```typescript
   style={[styles.base, condition && styles.conditional]}
   ```
4. **Always import theme values** at the top of the file

### Responsive Design

For responsive layouts, use `Dimensions.get("window")` with theme spacing:
```typescript
import { Dimensions } from "react-native";
import { spacing } from "../theme/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - spacing.xxl * 2; // Account for margins
const GAP = spacing.sm;
const CARD_WIDTH = (CONTAINER_WIDTH - GAP) / 2;
```

**Note:** Even in calculations, prefer theme spacing values over hardcoded numbers.

## TypeScript Patterns

### Interface Naming

- Component props: `ComponentNameProps` (e.g., `ContinueButtonProps`)
- Data types: Descriptive names (e.g., `NavItem`, `Profile`)

### Props Interface Pattern

```typescript
interface ComponentNameProps {
  requiredProp: string;
  optionalProp?: number;
  onPress?: () => void;
}
```

### Default Parameters

Use default parameters in function signatures:
```typescript
export function Component({
  prop1 = "default",
  prop2 = false,
}: ComponentProps) {
  // ...
}
```

## Navigation Patterns

### Expo Router Usage

- Import: `import { router } from "expo-router";`
- Navigate: `router.push("/pages/[route]")`
- Replace: `router.replace("/pages/[route]")` (for redirects)

### Route Structure

Routes follow the file structure:
- File: `app/pages/home/index.tsx` → Route: `/pages/home`
- File: `app/pages/settings/account/index.tsx` → Route: `/pages/settings/account`

### Navigation Best Practices

- Use `router.push()` for normal navigation
- Use `router.replace()` when you don't want back navigation (e.g., after login)
- Check current route before navigating to avoid unnecessary navigation

## Import Organization

Order imports in this sequence:

1. **External libraries** (expo, react-native, etc.)
2. **React/React Native core** (hooks, components)
3. **Internal components** (from `../../components/` or `./components/`)
4. **Theme/utilities** (colors, fonts, etc.)

**Example:**
```typescript
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomNavBar } from "../../components/BottomNavBar";
import { colors } from "../../theme/colors";
```

## StatusBar Pattern

Always include StatusBar with appropriate style:
```typescript
import { StatusBar } from "expo-status-bar";

// In component:
<StatusBar style="light" /> // or "dark" based on background
```

- Use `style="light"` for dark backgrounds
- Use `style="dark"` for light backgrounds

## Component Export Pattern

All components must export both named and default exports:

```typescript
export function ComponentName() {
  return <View>...</View>;
}

export default ComponentName;
```

This pattern is required for Expo Router compatibility.

## Safe Area Handling

For pages with ScrollView, use `useSafeAreaInsets()`:

```typescript
import { useSafeAreaInsets } from "react-native-safe-area-context";

const insets = useSafeAreaInsets();

// In contentContainerStyle:
contentContainerStyle={[
  styles.scrollContent,
  { paddingBottom: insets.bottom + 80, paddingTop: insets.top + 8 },
]}
```

## Grid Layout Patterns

### Bento Grid Layout

For complex grid layouts with varying card sizes:
- Use nested `View` components with `flexDirection: "row"` and `flexWrap: "wrap"`
- Use explicit column/row structure for precise control
- Calculate card widths using `Dimensions.get("window")`

**Example structure:**
```typescript
<View style={styles.grid}>
  <View style={styles.row}>
    <View style={styles.column}>
      {/* Tall card */}
    </View>
    <View style={styles.column}>
      {/* Medium cards stacked */}
    </View>
  </View>
</View>
```

## Conditional Rendering Patterns

Use conditional rendering with logical operators:
```typescript
{condition && <Component />}
{error && <Text>{error}</Text>}
{label && <Text>{label}</Text>}
```

For conditional styles:
```typescript
style={[styles.base, isActive && styles.active, isDisabled && styles.disabled]}
```

## Icon Usage

Use Ionicons from `@expo/vector-icons`:
```typescript
import { Ionicons } from "@expo/vector-icons";

<Ionicons name="arrow-forward" size={18} color={colors.text.primary} />
```

Common icon naming pattern:
- Outline icons: `"icon-name-outline"`
- Filled icons: `"icon-name"`

