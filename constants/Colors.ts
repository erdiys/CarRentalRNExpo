/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#A43333";
const tintColorDark = "#A43333";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#A43333",
    secondary: "#C74B40",
    tertiary: "#5CB85F",
    button: "#3D7B3F"
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#A43333",
    secondary: "#C74B40",
    tertiary: "#5CB85F",
    button: "#3D7B3F"
  },
  common: {
    button: "#3D7B3F",
    primary: "#A43333",
    secondary: "#AF392F",
    tertiary: "#5CB85F",
  }
};
