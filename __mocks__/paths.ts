import { LearningPath, LearningPathProgress, PathOfTheWeek } from "../types/paths";

export const mockPathOfTheWeek: PathOfTheWeek = {
  id: "path-renaissance-art",
  title: "Mastering Renaissance Art",
  description: "Explore the artistic revolution that transformed Europe",
  category: "Art",
  imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOY7WUPoYPR2giHfrtpS0SjcJYJC1eL3oOw5psDJFS123S_egD3tPZLlWNS9M8aKyjEs4QhRKGB1o8Mk7kUykMZK32AyXm114rWJyrPPRHa8pFb4XoJZqbM9v4dZ-yZmCYyTC3c_ZKjlgcgeArjGni0vjw11xgxOhKT1uOktu5DnbMg2CCi-abNtJvSNnWfoALDsRdaL-hu6WilSZzE4Q6hy1yswNwpRAyY8-r4T_3uy_dRr0VwjoT1cd1IXsSs_NVr5jrYd7HjyiU",
  courses: ["course-1", "course-2", "course-3", "course-4", "course-5", "course-6", "course-7", "course-8"],
  totalCourses: 8,
  totalDuration: 150,
  isPathOfTheWeek: true,
};

export const mockContinueLearningPaths: LearningPathProgress[] = [
  {
    id: "path-economics-101",
    title: "Economics 101",
    description: "Invisible forces shaping the world",
    category: "Economics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJwpEhNwM3-Jd0v-rVvTyRGrmCaSBIQMuWv926Bxlynio57bB_MzdUr50iFz4XeNoA3eL01ryAcylUxfVIarxCZYr2oUicaFy_VBU0QDiqGM4Z5oXrK6Z_O7zrE3D9h8f8MJ4_OL53BG4Z1HYwTmLjgXTvG398a_tExUCXRtSGJyG1nDbp12HeJ6Wcj40mEfB8yvYjcyFhc422PrQ_cqZkQUY6vjVy8Wl8oZrM6GtTKD22QEk1l8ny8cbc12v7MmB-lJjBsZCdu8nf",
    courses: ["course-1", "course-2", "course-3", "course-4", "course-5", "course-6"],
    totalCourses: 6,
    totalDuration: 180,
    coursesCompleted: 2,
    progressPercentage: 30,
  },
  {
    id: "path-modern-stoicism",
    title: "Modern Stoicism",
    description: "Applying ancient wisdom today",
    category: "Philosophy",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSJl-qLvznExOX21MrEsIkM6uZ19Q1J8-nBbxbtP36M5Unbo2MrtYx2gEA2n1MU9WebfwWHphpmuYaG3knKlXJZEybV55wha4Ngu78_EpMvgYGi04Z6YRsSazwx9CGEhi8ua5HctpsScER2UXzRWI0d_ZlgHvpqCc4HmDyGvlWfOvGYMTNe5818HUFAaisE6H3WLqffPsnFKLpIYsBfLaZQJ9gXSx0-H8gZZeJ8YFssRtPHpBYnoLlcdwOocqkw4tHFu-sEdFdB4eY",
    courses: ["course-1", "course-2", "course-3", "course-4", "course-5"],
    totalCourses: 5,
    totalDuration: 120,
    coursesCompleted: 1,
    progressPercentage: 15,
  },
];

export const mockExplorePaths: LearningPath[] = [
  {
    id: "path-ancient-history",
    title: "Ancient History",
    description: "Exploring the foundations of human civilization",
    category: "History",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9",
    courses: ["course-1", "course-2", "course-3", "course-4", "course-5", "course-6", "course-7", "course-8", "course-9", "course-10", "course-11", "course-12"],
    totalCourses: 12,
    totalDuration: 375,
  },
  {
    id: "path-global-culture",
    title: "Global Culture",
    description: "Understanding diverse societies and traditions",
    category: "Culture",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWDW5nCrCmmujKugk70eawdAt0y_8VcSPpvEMjsT9oo_EgkmIm2dHvFae58t365G0jBv8_Zn-HhYXxWOX1cHGPHPrZmv4UFF2AD6O2S-R3AVF8RW179bRThrHAX3zhxduFZFI9fRqXHbDQzO9kFzzkD4p8LzZvt6k3HgIF6UrC7wgsFhdPv3kuWkbR3d9Hhb6nHblfw8-xHlbR9NIO-S704_NGEFyX1XEuzvn1hwUYxxdYjzp2gTzBz_rLLBAVsVB8kghSycDv7d5E",
    courses: ["course-1", "course-2", "course-3", "course-4", "course-5"],
    totalCourses: 5,
    totalDuration: 200,
  },
  {
    id: "path-political-theory",
    title: "Political Theory",
    description: "Foundational ideas in political thought",
    category: "Politics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJwpEhNwM3-Jd0v-rVvTyRGrmCaSBIQMuWv926Bxlynio57bB_MzdUr50iFz4XeNoA3eL01ryAcylUxfVIarxCZYr2oUicaFy_VBU0QDiqGM4Z5oXrK6Z_O7zrE3D9h8f8MJ4_OL53BG4Z1HYwTmLjgXTvG398a_tExUCXRtSGJyG1nDbp12HeJ6Wcj40mEfB8yvYjcyFhc422PrQ_cqZkQUY6vjVy8Wl8oZrM6GtTKD22QEk1l8ny8cbc12v7MmB-lJjBsZCdu8nf",
    courses: ["course-1", "course-2", "course-3", "course-4", "course-5", "course-6", "course-7", "course-8"],
    totalCourses: 8,
    totalDuration: 285,
  },
];

export const mockAllUserPaths: LearningPathProgress[] = [
  ...mockContinueLearningPaths,
  {
    id: "path-ancient-history-progress",
    title: "Ancient History",
    description: "Exploring the foundations of human civilization",
    category: "History",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9",
    courses: ["course-1", "course-2", "course-3", "course-4", "course-5", "course-6", "course-7", "course-8", "course-9", "course-10", "course-11", "course-12"],
    totalCourses: 12,
    totalDuration: 375,
    coursesCompleted: 0,
    progressPercentage: 0,
  },
];

