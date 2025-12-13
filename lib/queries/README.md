# Query Hooks

This directory contains React Query hooks for data fetching from Supabase.

## File Organization Rules

**One query type per file**: Each file should contain hooks for a single entity/resource type.

- `courses.ts` - Hooks for courses data (useCourses)
- `topics.ts` - Hooks for topics data (useTopics)
- `profiles.ts` - Hooks for user profiles (future)

This organization makes it easier to:
- Find and maintain query hooks
- Understand dependencies
- Avoid circular imports
- Keep related types together

## Type Safety

- **Never use `any` types** - Always define proper TypeScript interfaces for Supabase responses
- Use `Supabase*` prefix for raw database types (e.g., `SupabaseTopic`)
- Export clean domain types for components (e.g., `Topic`, `Course`)
- Transform Supabase types to domain types in query functions

## Example Structure

```typescript
// lib/queries/topics.ts
interface SupabaseTopic {
  id: string;
  name: string;
  // ... database fields
}

export interface Topic {
  id: string;
  title: string;
  // ... domain fields
}

export const useTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: async (): Promise<Topic[]> => {
      const { data } = await supabase.from("topics").select("*");
      return transformSupabaseToDomain(data);
    },
  });
};
```

