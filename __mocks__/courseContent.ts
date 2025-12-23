import { CourseContent } from "../types/courseContent";

export const mockCourseContent: CourseContent = {
  id: "wealth-inequality-101",
  title: "Wealth Inequality",
  description: "A deep dive into the widening gap, the COVID-19 effect, and the future of the global economy.",
  category: "Economics",
  imageUrl: "https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=800&auto=format&fit=crop",
  duration: 25,
  progress: 0,
  chapters: [
    {
      id: "ch_1",
      title: "The Big Picture",
      order: 1,
      isCompleted: false,
      slides: [
        { id: "s1_1", type: "text", content: "Wealth inequality refers to the unequal distribution of assets in a population. This includes everything from savings and stocks to real estate." },
        { id: "s1_2", type: "text_image", content: "Globally, the richest 10% own 76% of all wealth, while the bottom 50% own just 2%.", mediaUrl: "https://images.unsplash.com/photo-1611974714851-4820613297a1?q=80&w=800", mediaType: "image" },
        { id: "s1_3", type: "quote", content: "Inequality is the root of social ills.", author: "Pope Francis" },
        { id: "s1_4", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800", mediaType: "image", caption: "The visual representation of the wealth pyramid is steeper than ever." },
        { id: "s1_5", type: "text", content: "Income is what you earn; Wealth is what you keep. The gap in wealth is almost always wider than the gap in income." },
        { id: "s1_6", type: "quote_image", content: "The top 0.1% have as much wealth as the bottom 90% in the United States.", author: "Bernie Sanders", mediaUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800", mediaType: "image" },
        { id: "s1_7", type: "text", content: "This isn't just about 'rich people.' It's about how the structure of the economy favors capital over labor." },
        { id: "s1_8", type: "text_image", content: "Historical data shows that inequality often leads to periods of high social unrest.", mediaUrl: "https://images.unsplash.com/photo-1573163226840-00431be7a275?q=80&w=800", mediaType: "image" },
        { id: "s1_9", type: "quote", content: "Capitalism without competition isn't capitalism; it's exploitation.", author: "Joe Biden" },
        { id: "s1_10", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=800", mediaType: "image", caption: "Stock market growth often benefits only the top tier of asset holders." },
        { id: "s1_11", type: "text", content: "When the cost of living outpaces wage growth, the middle class begins to vanish." },
        { id: "s1_12", type: "quote_image", content: "The problem isn't that people are getting rich, it's that everyone else is getting stuck.", author: "Economic Analyst", mediaUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800", mediaType: "image" }
      ]
    },
    {
      id: "ch_2",
      title: "The COVID-19 Acceleration",
      order: 2,
      isCompleted: false,
      slides: [
        { id: "s2_1", type: "text", content: "The 2020 pandemic was a 'black swan' event that shifted wealth at a speed never seen before in human history." },
        { id: "s2_2", type: "text_image", content: "While millions lost their jobs, the world's billionaires saw their wealth increase by 50%.", mediaUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=800", mediaType: "image" },
        { id: "s2_3", type: "quote", content: "We are not all in the same boat. We are in the same storm, but some are in superyachts while others are clinging to debris.", author: "Unknown" },
        { id: "s2_4", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=800", mediaType: "image", caption: "Empty streets for some, digital booms for others." },
        { id: "s2_5", type: "text", content: "Tech giants like Amazon and Zoom saw their valuations explode as the physical world shut down." },
        { id: "s2_6", type: "quote_image", content: "The pandemic created a new billionaire every 26 hours.", author: "Oxfam", mediaUrl: "https://images.unsplash.com/photo-1618044733300-9472154093ee?q=80&w=800", mediaType: "image" },
        { id: "s2_7", type: "text", content: "Low-wage workers, particularly in the service industry, were hit the hardest by both health risks and economic loss." },
        { id: "s2_8", type: "text_image", content: "The 'K-Shaped' recovery: Tech and finance went UP, while tourism and retail went DOWN.", mediaUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800", mediaType: "image" },
        { id: "s2_9", type: "quote", content: "Crisis is a catalyst for the concentration of power.", author: "Economist Insight" },
        { id: "s2_10", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1584931423298-c576fda54bd2?q=80&w=800", mediaType: "image", caption: "The digital divide became a survival divide." },
        { id: "s2_11", type: "text", content: "Government stimulus helped, but much of that liquidity ended up back in the stock market, further inflating asset prices." },
        { id: "s2_12", type: "quote_image", content: "The rich stayed home and got richer; the poor went to work and got sick.", author: "Public Health Report", mediaUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800", mediaType: "image" }
      ]
    },
    {
      id: "ch_3",
      title: "The Cost of Opportunity",
      order: 3,
      isCompleted: false,
      slides: [
        { id: "s3_1", type: "text", content: "Inequality isn't just a number. It determines who gets to be an inventor, a doctor, or an entrepreneur." },
        { id: "s3_2", type: "text_image", content: "High-income families can invest significantly more in 'Enrichment Expenditures' for their children.", mediaUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800", mediaType: "image" },
        { id: "s3_3", type: "quote", content: "Talent is universal; opportunity is not.", author: "Nicholas Kristof" },
        { id: "s3_4", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800", mediaType: "image", caption: "Education is the ladder, but the rungs are moving further apart." },
        { id: "s3_5", type: "text", content: "When the bottom 50% cannot afford higher education, the entire economy loses out on potential innovation." },
        { id: "s3_6", type: "quote_image", content: "A child's zip code shouldn't determine their destiny.", author: "Social Justice Advocate", mediaUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800", mediaType: "image" },
        { id: "s3_7", type: "text", content: "Inequality also impacts physical health. Stress from financial instability reduces life expectancy by years." },
        { id: "s3_8", type: "text_image", content: "The 'Wealth Gap' is often a 'Health Gap'—cleaner air, better food, and lower stress are bought.", mediaUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800", mediaType: "image" },
        { id: "s3_9", type: "quote", content: "The greatest waste in the world is the difference between what we are and what we could become.", author: "Ben Herbster" },
        { id: "s3_10", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800", mediaType: "image", caption: "Community investment is the only way to bridge the gap." },
        { id: "s3_11", type: "text", content: "When a small group controls all resources, they also control the 'entry points' to the market." },
        { id: "s3_12", type: "quote_image", content: "True freedom is impossible without economic security.", author: "Franklin D. Roosevelt", mediaUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800", mediaType: "image" }
      ]
    },
    {
      id: "ch_4",
      title: "Erosion of Democracy",
      order: 4,
      isCompleted: false,
      slides: [
        { id: "s4_1", type: "text", content: "How does wealth affect your vote? In many systems, money isn't just currency—it's speech." },
        { id: "s4_2", type: "text_image", content: "Lobbying efforts by the ultra-wealthy often lead to policies that favor capital over people.", mediaUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800", mediaType: "image" },
        { id: "s4_3", type: "quote", content: "The end of democracy and the defeat of the American Revolution will occur when government falls into the hands of lending institutions and moneyed incorporations.", author: "Thomas Jefferson" },
        { id: "s4_4", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1541872703-74c5e443d1fe?q=80&w=800", mediaType: "image", caption: "The halls of power are often lined with gold." },
        { id: "s4_5", type: "text", content: "When people feel the 'system is rigged,' they lose faith in democratic institutions and turn to populism." },
        { id: "s4_6", type: "quote_image", content: "Concentrated wealth is a direct threat to the principle of 'one person, one vote.'", author: "Political Scientist", mediaUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800", mediaType: "image" },
        { id: "s4_7", type: "text", content: "Tax havens allow the ultra-wealthy to opt-out of the social contract that everyone else has to follow." },
        { id: "s4_8", type: "text_image", content: "An estimated $20 trillion is hidden in offshore accounts, away from public funding.", mediaUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800", mediaType: "image" },
        { id: "s4_9", type: "quote", content: "Justice is not for sale, but it is often out of reach.", author: "Legal Aid Expert" },
        { id: "s4_10", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800", mediaType: "image", caption: "The scales of justice require balance." },
        { id: "s4_11", type: "text", content: "Stabilizing democracy requires re-balancing the economic scales to ensure everyone has a stake." },
        { id: "s4_12", type: "quote_image", content: "A house divided against itself cannot stand.", author: "Abraham Lincoln", mediaUrl: "https://images.unsplash.com/photo-1503917988258-f19772007ee5?q=80&w=800", mediaType: "image" }
      ]
    },
    {
      id: "ch_5",
      title: "Pathways to Change",
      order: 5,
      isCompleted: false,
      slides: [
        { id: "s5_1", type: "text", content: "The good news? Inequality is not a law of nature. It can be changed through intentional policy." },
        { id: "s5_2", type: "text_image", content: "Closing tax loopholes and implementing a global minimum corporate tax are the first steps.", mediaUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=800", mediaType: "image" },
        { id: "s5_3", type: "quote", content: "The history of the 20th century shows that we can reduce inequality without destroying growth.", author: "Thomas Piketty" },
        { id: "s5_4", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800", mediaType: "image", caption: "Collaborative economies are rising." },
        { id: "s5_5", type: "text", content: "Universal Basic Income (UBI) and strengthened labor unions are being reconsidered as vital tools." },
        { id: "s5_6", type: "quote_image", content: "We need an economy that serves humanity, not the other way around.", author: "Economic Reformer", mediaUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800", mediaType: "image" },
        { id: "s5_7", type: "text", content: "Employee-owned businesses and cooperatives share the wealth generated by workers directly with those workers." },
        { id: "s5_8", type: "text_image", content: "Investments in green energy can create millions of high-paying, middle-class jobs.", mediaUrl: "https://images.unsplash.com/photo-1466611653911-954ff21caafc?q=80&w=800", mediaType: "image" },
        { id: "s5_9", type: "quote", content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { id: "s5_10", type: "image_only", mediaUrl: "https://images.unsplash.com/photo-1521791136364-758a4d31793a?q=80&w=800", mediaType: "image", caption: "Handshakes that mean shared prosperity." },
        { id: "s5_11", type: "text", content: "By participating in local politics and demanding transparency, citizens can reclaim the economic narrative." },
        { id: "s5_12", type: "quote_image", content: "It always seems impossible until it's done.", author: "Nelson Mandela", mediaUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800", mediaType: "image" }
      ]
    }
  ]
};

export const mockCourseContentById: Record<string, CourseContent> = {
  "wealth-inequality-101": mockCourseContent,
};

