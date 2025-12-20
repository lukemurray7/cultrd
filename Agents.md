# Agent Development Guide

This document provides guidance for agents working on this Expo React Native application. Follow these best practices to ensure consistency, maintainability, and adherence to the project's architecture.

## Theme System

### Overview

All styling in this application must reference the theme tokens defined in `theme/tokens.ts`. Never use hardcoded colors, spacing values, or other design tokens directly in components.

### Using Theme Tokens

1. **Import the `useTheme` hook** from `theme/ThemeProvider.tsx`:
```typescript
import { useTheme } from "../theme/ThemeProvider";
```

2. **Access tokens in your component**:
```typescript
const Component = () => {
  const theme = useTheme();
  
  return (
    <View style={{
      backgroundColor: theme.colors.bg.surface,
      padding: theme.spacing[4],
      borderRadius: theme.radii.md,
    }}>
      <Text style={{
        color: theme.colors.text.primary,
        fontSize: theme.typography.size.md,
      }}>
        Hello World
      </Text>
    </View>
  );
};
```

### Available Theme Tokens

The theme system provides the following token categories:

- **Colors**: `theme.colors.bg.*`, `theme.colors.text.*`, `theme.colors.brand.*`, `theme.colors.border`
- **Spacing**: `theme.spacing[0-12]` (numeric scale from 0 to 12)
- **Border Radius**: `theme.radii.sm`, `theme.radii.md`, `theme.radii.lg`, `theme.radii.xl`, `theme.radii.pill`
- **Typography**: `theme.typography.fontFamily.*`, `theme.typography.size.*`, `theme.typography.lineHeight.*`, `theme.typography.weight.*`

### Styling Rules

- ✅ **DO**: Always use theme tokens via `useTheme()` hook
- ✅ **DO**: Reference tokens from `theme/tokens.ts` only
- ❌ **DON'T**: Use hardcoded color values (e.g., `"#FFFFFF"`, `"rgba(255,255,255,0.5)"`)
- ❌ **DON'T**: Use hardcoded spacing values (e.g., `padding: 16`)
- ❌ **DON'T**: Create custom styling values outside the theme system
- ❌ **DON'T**: Use inline styles with hardcoded values

## Component Library Structure

### Base Components

Base components are wrapper components around React Native primitives that provide theme-aware styling. These should be used instead of raw React Native components in screen pages.

#### Available Base Components

- **Box** - Wrapper for `View` with theme-aware spacing, background, borders, and layout props
- **Text** - Wrapper for `Text` with theme-aware typography
- **Pressable** - Wrapper for `Pressable` with theme-aware styling
- **ScrollView** - Wrapper for `ScrollView` with theme-aware styling
- **SafeAreaView** - Wrapper for `SafeAreaView` with theme-aware background

#### Usage Rules

- ✅ **DO**: Use base components (`Box`, `Text`, `Pressable`, etc.) in screen pages
- ✅ **DO**: Use theme props (e.g., `p={4}`, `bg="surface"`, `size="lg"`) instead of inline styles
- ✅ **DO**: Prefer component props over inline styles, even when using theme tokens
- ❌ **DON'T**: Import raw React Native components (`View`, `Text`, etc.) in screen pages
- ❌ **DON'T**: Use inline styles with hardcoded values in screen pages
- ❌ **DON'T**: Use inline styles when equivalent props exist on base components
- ✅ **DO**: Use raw React Native components only within base components or other shared components
- ✅ **DO**: Use minimal inline styles only for properties not supported by component props (e.g., specific Image styles, complex positioning)

#### Box Component Example

```typescript
import { Box } from "../../../ui/components/Box";

<Box p={4} bg="surface" border borderRadius="md" row between>
  <Text size="lg" weight="bold">Title</Text>
</Box>
```

#### Text Component Example

```typescript
import { Text } from "../../../ui/components/Text";

<Text size="md" weight="semibold" variant="secondary">
  Content
</Text>
```

#### Avoiding Inline Styles

Always prefer component props over inline styles, even when using theme tokens:

**Bad Example:**
```typescript
<View style={{
  flexDirection: "row",
  padding: theme.spacing[4],
  backgroundColor: theme.colors.bg.surface,
  borderRadius: theme.radii.md,
}}>
  <Text style={{
    color: theme.colors.text.primary,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.bold,
  }}>
    Content
  </Text>
</View>
```

**Good Example:**
```typescript
<Box row p={4} bg="surface" borderRadius="md">
  <Text size="md" weight="bold">
    Content
  </Text>
</Box>
```

**When Inline Styles Are Acceptable:**
- Component-specific styles not supported by props (e.g., `Image` width/height/borderRadius)
- Complex positioning that requires specific calculations
- Third-party component styling that doesn't accept theme props
- Temporary workarounds for unsupported prop combinations (should be rare)

### Shared Components

All reusable, shared components must live in `ui/components/`.

Each component folder must follow this exact structure:

```
ui/components/
  └── ComponentName/
      - index.tsx          # Main component implementation
```

### Component File Requirements

#### `index.tsx` - Main Component File

- Contains the component implementation
- Must use theme tokens via `useTheme()` hook
- Should be properly typed with TypeScript
- Export the component as the default or named export

Example structure:
```typescript
import { useTheme } from "../../theme/ThemeProvider";
import { View, Text } from "react-native";

export const ComponentName = ({ ...props }) => {
  const theme = useTheme();
  
  return (
    <View style={{ /* use theme tokens */ }}>
      {/* component JSX */}
    </View>
  );
};
```

### Example: Button Component

The `ui/components/Button/` folder serves as a reference implementation:
- `index.tsx` - Button component implementation

## Page-Specific Components

### Location

Components that are specific to a particular page/screen should live in `ui/pages/[pageName]/components/`.

### Structure

Page-specific components follow the same file structure pattern as shared components:

```
ui/pages/
  └── [pageName]/
      └── components/
          └── ComponentName/
              ├── index.tsx
```

### Example

For a home page component:
```
ui/pages/home/components/
  └── HomeHeader/
      ├── index.tsx
```

### When to Use Page-Specific Components

- Use `ui/pages/[pageName]/components/` when a component is only used within a specific page
- Use `ui/components/` when a component is reusable across multiple pages or screens
- If a page-specific component becomes reusable, move it to `ui/components/`

## Component Development Workflow

When creating a new component, follow these steps:

1. **Determine component location**
   - Shared component → `ui/components/[ComponentName]/`
   - Page-specific component → `ui/pages/[pageName]/components/[ComponentName]/`

2. **Create component folder structure**
   - Create the component folder
   - Create `index.tsx`, and `index.stories.tsx` files

3. **Implement the component** (`index.tsx`)
   - Import `useTheme` using relative imports (see Import Guidelines below)
   - Use theme tokens for all styling
   - Implement component logic and JSX
   - Add proper TypeScript types

## Import Guidelines

### Relative Imports Only

All imports must use relative paths. Never use `@/` path aliases.

- ✅ **DO**: Use relative imports like `../../theme/ThemeProvider`
- ❌ **DON'T**: Use path aliases like `@/theme/ThemeProvider`

### Examples

From `ui/components/SearchBar/index.tsx`:
```typescript
import { useTheme } from "../../../theme/ThemeProvider";
```

From `ui/pages/home/components/HomeHeader/index.tsx`:
```typescript
import { useTheme } from "../../../../../theme/ThemeProvider";
import { useUser } from "../../../../../lib/queries/courses";
```

## App Folder Structure

### Page Organization

All pages in the `/app` directory must be organized in their own folders. Each page should have its own folder with an `index.tsx` file.

### Structure Pattern

```
app/
  └── (tabs)/
      ├── _layout.tsx
      ├── index.tsx          # Redirects to default route (home)
      ├── home/
      │   └── index.tsx
      ├── explore/
      │   └── index.tsx
      ├── library/
      │   └── index.tsx
      └── profile/
          └── index.tsx
```

### Default Route

The `(tabs)/index.tsx` file should redirect to the default tab (typically `home`):

```typescript
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/home" />;
}
```

Additionally, set `initialRouteName="home"` in the `Tabs` component in `_layout.tsx` to ensure the home tab is selected by default.

### Rules

- ✅ **DO**: Create a folder for each page/screen
- ✅ **DO**: Place the page component in `[pageName]/index.tsx`
- ✅ **DO**: Use folder names that match the route name
- ✅ **DO**: Create `index.tsx` in `(tabs)/` to redirect to the default route
- ✅ **DO**: Set `initialRouteName` in `Tabs` component to specify default tab
- ❌ **DON'T**: Place page component files directly in `(tabs)/` (except `index.tsx` for redirect)
- ❌ **DON'T**: Use `@/` imports in app folder files

## Mock Data Development

### Overview

During development, we use mock data to build screens before integrating with the actual backend. This allows for faster iteration and UI development without waiting for backend APIs.

### Mock Data Location

All mock data files must be placed in the `__mocks__` folder at the project root.

### Mock Data Structure

```
__mocks__/
  ├── courses.ts
  ├── users.ts
  └── ...
```

### Using Mock Data

When using mocks, you should still write query hooks using TanStack Query. The hooks can return mock data instead of making actual backend requests. This ensures a smooth transition when switching to real backend integration.

Example:
```typescript
import { useQuery } from "@tanstack/react-query";
import { mockCourses } from "__mocks__/courses";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => Promise.resolve(mockCourses),
  });
};
```

### Mock Data Rules

- ✅ **DO**: Place all mock data files in `__mocks__` folder
- ✅ **DO**: Write query hooks even when using mocks
- ✅ **DO**: Use domain-specific mock files (e.g., `courses.ts`, `users.ts`)
- ❌ **DON'T**: Mix mock data with actual API calls in the same file
- ❌ **DON'T**: Place mock data files outside `__mocks__` folder

## Data Querying with TanStack Query

### Overview

We use `@tanstack/react-query` for all data fetching and mutations. This provides caching, background updates, and error handling out of the box.

### Query and Mutation Structure

All queries and mutations are organized by domain in separate files:

```
lib/
  ├── queries/
  │   ├── courses.ts
  │   ├── users.ts
  │   └── ...
  └── mutations/
      ├── courses.ts
      ├── users.ts
      └── ...
```

### Query Files

Each query file should contain domain-specific query hooks. For example, `lib/queries/courses.ts` would contain all course-related queries.

Example query file structure:
```typescript
import { useQuery } from "@tanstack/react-query";
import { Course } from "../../types/courses";

export const useCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch("/api/courses");
      return response.json();
    },
  });
};

export const useCourse = (id: string) => {
  return useQuery<Course>({
    queryKey: ["courses", id],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${id}`);
      return response.json();
    },
    enabled: !!id,
  });
};
```

### Mutation Files

Each mutation file should contain domain-specific mutation hooks. For example, `lib/mutations/courses.ts` would contain all course-related mutations.

Example mutation file structure:
```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCourseRequest, Course } from "../../types/courses";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Course, Error, CreateCourseRequest>({
    mutationFn: async (data) => {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
```

### Query and Mutation Rules

- ✅ **DO**: Organize queries/mutations by domain in separate files
- ✅ **DO**: Use descriptive hook names (e.g., `useCourses`, `useCreateCourse`)
- ✅ **DO**: Place queries in `lib/queries/` and mutations in `lib/mutations/`
- ✅ **DO**: Use proper TypeScript types (never `any`)
- ❌ **DON'T**: Mix multiple domains in a single file
- ❌ **DON'T**: Use `any` type - ESLint disallows it
- ❌ **DON'T**: Place queries/mutations outside their designated folders

## Type Definitions

### Overview

All TypeScript types must be defined in the `/types` folder and organized by domain. Never use the `any` type - ESLint is configured to disallow it.

### Type File Structure

Types are organized by domain in separate files:

```
types/
  ├── courses.ts
  ├── users.ts
  └── ...
```

### Type Definition Example

Example type file structure (`types/courses.ts`):
```typescript
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  createdAt: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  instructor: string;
}

export interface CourseListResponse {
  courses: Course[];
  total: number;
}
```

### Type Usage

Import types from the `/types` folder using relative imports:

```typescript
import { Course, CreateCourseRequest } from "../../types/courses";
```

### Type Definition Rules

- ✅ **DO**: Define all types in `/types` folder
- ✅ **DO**: Organize types by domain in separate files
- ✅ **DO**: Use descriptive type names
- ✅ **DO**: Export types for reuse across the application
- ❌ **DON'T**: Use `any` type - ESLint disallows it
- ❌ **DON'T**: Define types inline in component files
- ❌ **DON'T**: Place type definitions outside `/types` folder
- ❌ **DON'T**: Mix multiple domains in a single type file

## Best Practices Summary

### Styling
- ✅ Always use `useTheme()` hook
- ✅ Reference tokens from `theme/tokens.ts` only
- ❌ Never hardcode design values

### Component Organization
- ✅ Shared components → `ui/components/`
- ✅ Page-specific components → `ui/pages/[pageName]/components/`
- ✅ Always include `index.tsx`

### Data Management
- ✅ Use TanStack Query for all data fetching
- ✅ Organize queries/mutations by domain in separate files
- ✅ Place queries in `lib/queries/` and mutations in `lib/mutations/`
- ✅ Use mock data from `__mocks__` folder during development
- ✅ Write query hooks even when using mocks

### Type Definitions
- ✅ Define all types in `/types` folder
- ✅ Organize types by domain in separate files
- ❌ Never use `any` type - ESLint disallows it

### Code Quality
- ✅ Use TypeScript for type safety
- ✅ Follow existing patterns and conventions

## Quick Reference

### Theme Hook Usage
```typescript
import { useTheme } from "../../theme/ThemeProvider";

const theme = useTheme();
// Access: theme.colors, theme.spacing, theme.radii, theme.typography
```

### Component Structure Template
```
ComponentName/
├── index.tsx          # Component implementation with theme tokens
```

### Folder Organization
- Shared: `ui/components/[ComponentName]/`
- Page-specific: `ui/pages/[pageName]/components/[ComponentName]/`
- Mock data: `__mocks__/[domain].ts`
- Queries: `lib/queries/[domain].ts`
- Mutations: `lib/mutations/[domain].ts`
- Types: `types/[domain].ts`

### Query Hook Template
```typescript
import { useQuery } from "@tanstack/react-query";
import { DataType } from "../../types/domain";

export const useData = () => {
  return useQuery<DataType[]>({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch("/api/data");
      return response.json();
    },
  });
};
```

### Mutation Hook Template
```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRequest, DataType } from "../../types/domain";

export const useCreateData = () => {
  const queryClient = useQueryClient();
  
  return useMutation<DataType, Error, CreateRequest>({
    mutationFn: async (data) => {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });
};
```

