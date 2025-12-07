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

