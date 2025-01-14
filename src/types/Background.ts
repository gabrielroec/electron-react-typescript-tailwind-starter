export type BackgroundType = "desktop" | "cool" | "nice" | "morning" | "love" | "rain" | "sky" | "none";

export interface BackgroundConfig {
  id: BackgroundType;
  label: string;
  gradient: string;
}

export const backgrounds: BackgroundConfig[] = [
  {
    id: "desktop",
    label: "Desktop",
    gradient: "linear-gradient(45deg, #ff8a00, #e52e71)",
  },
  {
    id: "cool",
    label: "Cool",
    gradient: "linear-gradient(45deg, #2193b0, #6dd5ed)",
  },
  {
    id: "nice",
    label: "Nice",
    gradient: "linear-gradient(45deg, #834d9b, #d04ed6)",
  },
  {
    id: "morning",
    label: "Morning",
    gradient: "linear-gradient(45deg, #ff6e7f, #bfe9ff)",
  },
  {
    id: "love",
    label: "Love",
    gradient: "linear-gradient(45deg, #654ea3, #da92b4)",
  },
  {
    id: "rain",
    label: "Rain",
    gradient: "linear-gradient(45deg, #00c6fb, #005bea)",
  },
  {
    id: "sky",
    label: "Sky",
    gradient: "linear-gradient(45deg, #89f7fe, #66a6ff)",
  },
  {
    id: "none",
    label: "None",
    gradient: "transparent",
  },
];
