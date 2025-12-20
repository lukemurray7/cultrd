import { Category, Course, FeaturedCourse, User } from "../types/courses";

export const mockUser: User = {
  name: "Alex",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv67l6Cl8RJDczacAAglmg65vGqXngLByQPFnqsFoB1y_NoQDF1HvJJ8dlEwnBcBP0DajD7BtyJjiUowMF79xhwCh07edg8jyT7-Itl4rqv47LA4WIP7FBRxgDZWFa9PTZuagmPt1COiUec_UNOHUioMmfAAViLGe-UnBNy6rSe15oAEE4eb4CinkIWpZaMdDMiOISr1S5gT7kzle3eA9nF8y3pIdVZzKISPaqT7BqdX6-TfaeznKCFrRJdkm7QIRZs_54RhgkmNSw",
  streak: 12,
  isOnline: true,
};

export const mockFeaturedCourse: FeaturedCourse = {
  id: "1",
  title: "The Psychology of Money",
  description: "Timeless lessons on wealth, greed, and happiness doing well with money.",
  category: "Economics",
  imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOY7WUPoYPR2giHfrtpS0SjcJYJC1eL3oOw5psDJFS123S_egD3tPZLlWNS9M8aKyjEs4QhRKGB1o8Mk7kUykMZK32AyXm114rWJyrPPRHa8pFb4XoJZqbM9v4dZ-yZmCYyTC3c_ZKjlgcgeArjGni0vjw11xgxOhKT1uOktu5DnbMg2CCi-abNtJvSNnWfoALDsRdaL-hu6WilSZzE4Q6hy1yswNwpRAyY8-r4T_3uy_dRr0VwjoT1cd1IXsSs_NVr5jrYd7HjyiU",
  duration: 0,
  progress: 35,
  timeRemaining: 5,
};

export const mockTrendingCourses: Course[] = [
  {
    id: "2",
    title: "Modern Art Movements",
    description: "",
    category: "Art",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWDW5nCrCmmujKugk70eawdAt0y_8VcSPpvEMjsT9oo_EgkmIm2dHvFae58t365G0jBv8_Zn-HhYXxWOX1cHGPHPrZmv4UFF2AD6O2S-R3AVF8RW179bRThrHAX3zhxduFZFI9fRqXHbDQzO9kFzzkD4p8LzZvt6k3HgIF6UrC7wgsFhdPv3kuWkbR3d9Hhb6nHblfw8-xHlbR9NIO-S704_NGEFyX1XEuzvn1hwUYxxdYjzp2gTzBz_rLLBAVsVB8kghSycDv7d5E",
    duration: 0,
    lessons: 8,
  },
  {
    id: "3",
    title: "Cold War Geopolitics",
    description: "",
    category: "History",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9",
    duration: 0,
    lessons: 12,
  },
  {
    id: "4",
    title: "Supply & Demand",
    description: "",
    category: "Economics",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJwpEhNwM3-Jd0v-rVvTyRGrmCaSBIQMuWv926Bxlynio57bB_MzdUr50iFz4XeNoA3eL01ryAcylUxfVIarxCZYr2oUicaFy_VBU0QDiqGM4Z5oXrK6Z_O7zrE3D9h8f8MJ4_OL53BG4Z1HYwTmLjgXTvG398a_tExUCXRtSGJyG1nDbp12HeJ6Wcj40mEfB8yvYjcyFhc422PrQ_cqZkQUY6vjVy8Wl8oZrM6GtTKD22QEk1l8ny8cbc12v7MmB-lJjBsZCdu8nf",
    duration: 0,
    lessons: 6,
  },
];

export const mockRecommendedCourses: Course[] = [
  {
    id: "5",
    title: "Stoicism in Modern Life",
    description: "How ancient wisdom can help you navigate modern stress.",
    category: "Philosophy",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSJl-qLvznExOX21MrEsIkM6uZ19Q1J8-nBbxbtP36M5Unbo2MrtYx2gEA2n1MU9WebfwWHphpmuYaG3knKlXJZEybV55wha4Ngu78_EpMvgYGi04Z6YRsSazwx9CGEhi8ua5HctpsScER2UXzRWI0d_ZlgHvpqCc4HmDyGvlWfOvGYMTNe5818HUFAaisE6H3WLqffPsnFKLpIYsBfLaZQJ9gXSx0-H8gZZeJ8YFssRtPHpBYnoLlcdwOocqkw4tHFu-sEdFdB4eY",
    duration: 15,
  },
  {
    id: "6",
    title: "CRISPR & Gene Editing",
    description: "Understanding the future of human biology and ethics.",
    category: "Science",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl9AkFDrPkVu9kE_S5sqhtazV1tqSZqKcHJTnvyf0FCpHEwvKB_RbGqkMK7ZD5NPTitC-FeYpPD1QxFTv5nqLy8cXMAAN1hKnlehklelrEF49TQNM3sfQ_vy8BgN34x-_8Dmbk6_uHPD5QViL_pv7qlAuxC4CC7P4SjppnOp9OxXi-s75-QUpEuHMapfH_aoKChKlSqQtomm6VlHGTtQ_z9GgmJkWsqvUV5yLfjYVXQaqO1PeSlGtpTYYwO-u8n39vxYo9IIfZ4ndK",
    duration: 8,
  },
];

export const mockCategories: Category[] = ["For You", "Culture", "Art", "Economics", "Politics", "History"];

export interface Subtopic {
  id: string;
  title: string;
  description: string;
  courses: Course[];
}

export interface TopicCourses {
  topicId: string;
  subtopics: Subtopic[];
}

export const mockCoursesByTopic: TopicCourses[] = [
  {
    topicId: "history",
    subtopics: [
      {
        id: "european-history",
        title: "European History",
        description: "From the Renaissance to modern Europe",
        courses: [
          {
            id: "eh-1",
            title: "The Renaissance Era",
            description: "Exploring the cultural and artistic revolution of the Renaissance",
            category: "History",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOY7WUPoYPR2giHfrtpS0SjcJYJC1eL3oOw5psDJFS123S_egD3tPZLlWNS9M8aKyjEs4QhRKGB1o8Mk7kUykMZK32AyXm114rWJyrPPRHa8pFb4XoJZqbM9v4dZ-yZmCYyTC3c_ZKjlgcgeArjGni0vjw11xgxOhKT1uOktu5DnbMg2CCi-abNtJvSNnWfoALDsRdaL-hu6WilSZzE4Q6hy1yswNwpRAyY8-r4T_3uy_dRr0VwjoT1cd1IXsSs_NVr5jrYd7HjyiU",
            duration: 45,
            lessons: 8,
          },
          {
            id: "eh-2",
            title: "Medieval Europe",
            description: "Understanding the Middle Ages and feudal society",
            category: "History",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOY7WUPoYPR2giHfrtpS0SjcJYJC1eL3oOw5psDJFS123S_egD3tPZLlWNS9M8aKyjEs4QhRKGB1o8Mk7kUykMZK32AyXm114rWJyrPPRHa8pFb4XoJZqbM9v4dZ-yZmCYyTC3c_ZKjlgcgeArjGni0vjw11xgxOhKT1uOktu5DnbMg2CCi-abNtJvSNnWfoALDsRdaL-hu6WilSZzE4Q6hy1yswNwpRAyY8-r4T_3uy_dRr0VwjoT1cd1IXsSs_NVr5jrYd7HjyiU",
            duration: 50,
            lessons: 10,
          },
        ],
      },
      {
        id: "world-wars",
        title: "World Wars",
        description: "Understanding the conflicts that shaped the modern world",
        courses: [
          {
            id: "ww-1",
            title: "World War II: A Comprehensive Study",
            description: "The global conflict that changed the course of history",
            category: "History",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9",
            duration: 60,
            lessons: 12,
          },
          {
            id: "ww-2",
            title: "Cold War History",
            description: "The ideological struggle between superpowers",
            category: "History",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9",
            duration: 55,
            lessons: 11,
          },
        ],
      },
    ],
  },
  {
    topicId: "economics",
    subtopics: [
      {
        id: "macroeconomics",
        title: "Macroeconomics",
        description: "Understanding the economy at a national and global level",
        courses: [
          {
            id: "macro-1",
            title: "Supply & Demand",
            description: "Fundamental principles of market economics",
            category: "Economics",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJwpEhNwM3-Jd0v-rVvTyRGrmCaSBIQMuWv926Bxlynio57bB_MzdUr50iFz4XeNoA3eL01ryAcylUxfVIarxCZYr2oUicaFy_VBU0QDiqGM4Z5oXrK6Z_O7zrE3D9h8f8MJ4_OL53BG4Z1HYwTmLjgXTvG398a_tExUCXRtSGJyG1nDbp12HeJ6Wcj40mEfB8yvYjcyFhc422PrQ_cqZkQUY6vjVy8Wl8oZrM6GtTKD22QEk1l8ny8cbc12v7MmB-lJjBsZCdu8nf",
            duration: 30,
            lessons: 6,
          },
          {
            id: "macro-2",
            title: "Economic Growth",
            description: "How economies expand and develop over time",
            category: "Economics",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJwpEhNwM3-Jd0v-rVvTyRGrmCaSBIQMuWv926Bxlynio57bB_MzdUr50iFz4XeNoA3eL01ryAcylUxfVIarxCZYr2oUicaFy_VBU0QDiqGM4Z5oXrK6Z_O7zrE3D9h8f8MJ4_OL53BG4Z1HYwTmLjgXTvG398a_tExUCXRtSGJyG1nDbp12HeJ6Wcj40mEfB8yvYjcyFhc422PrQ_cqZkQUY6vjVy8Wl8oZrM6GtTKD22QEk1l8ny8cbc12v7MmB-lJjBsZCdu8nf",
            duration: 40,
            lessons: 8,
          },
        ],
      },
    ],
  },
  {
    topicId: "philosophy",
    subtopics: [
      {
        id: "ancient-philosophy",
        title: "Ancient Philosophy",
        description: "The foundations of Western thought",
        courses: [
          {
            id: "phil-1",
            title: "Stoicism in Modern Life",
            description: "How ancient wisdom can help you navigate modern stress",
            category: "Philosophy",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSJl-qLvznExOX21MrEsIkM6uZ19Q1J8-nBbxbtP36M5Unbo2MrtYx2gEA2n1MU9WebfwWHphpmuYaG3knKlXJZEybV55wha4Ngu78_EpMvgYGi04Z6YRsSazwx9CGEhi8ua5HctpsScER2UXzRWI0d_ZlgHvpqCc4HmDyGvlWfOvGYMTNe5818HUFAaisE6H3WLqffPsnFKLpIYsBfLaZQJ9gXSx0-H8gZZeJ8YFssRtPHpBYnoLlcdwOocqkw4tHFu-sEdFdB4eY",
            duration: 25,
            lessons: 5,
          },
        ],
      },
    ],
  },
  {
    topicId: "science",
    subtopics: [
      {
        id: "biology",
        title: "Biology",
        description: "The study of life and living organisms",
        courses: [
          {
            id: "bio-1",
            title: "CRISPR & Gene Editing",
            description: "Understanding the future of human biology and ethics",
            category: "Science",
            imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl9AkFDrPkVu9kE_S5sqhtazV1tqSZqKcHJTnvyf0FCpHEwvKB_RbGqkMK7ZD5NPTitC-FeYpPD1QxFTv5nqLy8cXMAAN1hKnlehklelrEF49TQNM3sfQ_vy8BgN34x-_8Dmbk6_uHPD5QViL_pv7qlAuxC4CC7P4SjppnOp9OxXi-s75-QUpEuHMapfH_aoKChKlSqQtomm6VlHGTtQ_z9GgmJkWsqvUV5yLfjYVXQaqO1PeSlGtpTYYwO-u8n39vxYo9IIfZ4ndK",
            duration: 35,
            lessons: 7,
          },
        ],
      },
    ],
  },
];

