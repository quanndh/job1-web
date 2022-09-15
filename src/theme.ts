import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const colorMode = localStorage.getItem("chakra-ui-color-mode");

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode:
    colorMode === "dark" || colorMode === "light" ? colorMode : "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config });

export default theme;
