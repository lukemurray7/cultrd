export interface Topic {
  id: string;
  label: string;
  image: any;
  colorKey: "history" | "economics" | "philosophy" | "culture" | "music" | "politics" | "science";
}

export const topics: Topic[] = [
  {
    id: "history",
    label: "History",
    image: require("../assets/images/history.png"),
    colorKey: "history",
  },
  {
    id: "economics",
    label: "Economics",
    image: require("../assets/images/economics.png"),
    colorKey: "economics",
  },
  {
    id: "philosophy",
    label: "Philosophy",
    image: require("../assets/images/philosophy.png"),
    colorKey: "philosophy",
  },
  {
    id: "culture",
    label: "Culture",
    image: require("../assets/images/culture.png"),
    colorKey: "culture",
  },
  {
    id: "music",
    label: "Music",
    image: require("../assets/images/music.png"),
    colorKey: "music",
  },
  {
    id: "politics",
    label: "Politics",
    image: require("../assets/images/politics.png"),
    colorKey: "politics",
  },
  {
    id: "science",
    label: "Science",
    image: require("../assets/images/science.png"),
    colorKey: "science",
  },
];

