import { Colors } from "./types";

export const baseColors = {
  failure: "#ED4B9E",
  primary: "#42200a",
  primaryBright: "#aa8929",
  primaryDark: "#251205",
  secondary: "#a10342",
  success: "#31D0AA",
  warning: "#FFB237",
};

export const brandColors = {
  binance: "#F0B90B",
};

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: "#db268f",
  backgroundDisabled: "#77144e",
  contrast: "#191326",
  invertedContrast: "#db268f",
  input: "#db268f",
  tertiary: "#EFF4F5",
  text: "#CC313D",
  textDisabled: "#BDC2C4",
  textSubtle: "#EFF4F5",
  borderColor: "#rgba(255, 255, 255, 0.3)",
  card: "#77144e",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: "#000",
  background: "#343135",
  backgroundDisabled: "#3c3742",
  contrast: "#FFFFFF",
  invertedContrast: "#191326",
  input: "#483f5a",
  primaryDark: "#0098A1",
  tertiary: "#353547",
  text: "#EAE2FC",
  textDisabled: "#666171",
  textSubtle: "#c9c4d4",
  borderColor: "#524B63",
  card: "#27262c",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
  },
};
