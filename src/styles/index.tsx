import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { ButtonTheme } from "./button";
import { ColorScheme } from "./color-scheme";
import { Variant } from "./variant";
import "@fontsource-variable/nunito";

export const appTheme = extendTheme(
  {
    styles: {
      global: {
        "html, #root": {
          height: "100vh",
          width: "100vw",
          scrollBehavior: "smooth",
        },
        "::-webkit-scrollbar": {
          width: "6px",
        },
        "::-webkit-scrollbar-thumb": {
          bg: "gray.500",
          borderRadius: "full",
        },
        "::-webkit-scrollbar-thumb:hover": {
          bg: "gray.600",
        },
        "::-webkit-scrollbar-track": {
          bg: "gray.100",
          borderRadius: "full",
        },
      },
    },
    components: {
      Button: ButtonTheme,
      Checkbox: {
        sizes: {
          md: {
            control: {
              borderRadius: "4px",
            },
          },
          lg: {
            control: {
              borderRadius: "4px",
            },
          },
        },
      },
    },

    fonts: {
      heading: `'Nunito Variable', sans-serif`,
      body: `'Nunito Variable', sans-serif`,
    },

    colors: {
      bg: {
        "50": "#F2F2F2",
        "100": "#F4F4F4",
        "200": "#C4C4C4",
        "300": "#ADADAD",
        "400": "#969696",
        "500": "#808080",
        "600": "#666666",
        "700": "#4D4D4D",
        "800": "#333333",
        "900": "#1A1A1A",
      },
      blue: {
        "50": "#E5F0FF",
        "100": "#B8D6FF",
        "200": "#8ABCFF",
        "300": "#5CA2FF",
        "400": "#4695FF",
        "500": "#2E87FF",
        "600": "#006DFF",
        "700": "#004199",
        "800": "#002C66",
        "900": "#001633",
      },
      red: {
        "50": "#FFE9E5",
        "100": "#FFC0B8",
        "200": "#FF988A",
        "300": "#FF705C",
        "400": "#FF482E",
        "500": "#FF2000",
        "600": "#CC1900",
        "700": "#991300",
        "800": "#660D00",
        "900": "#330600",
      },
      orange: {
        "50": "#FFEEE5",
        "100": "#FFD0B8",
        "200": "#FFB28A",
        "300": "#FF945C",
        "400": "#FF762E",
        "500": "#FF5800",
        "600": "#CC4600",
        "700": "#993500",
        "800": "#662300",
        "900": "#331200",
      },
      green: {
        "50": "#F0F7ED",
        "100": "#D5E9CD",
        "200": "#B9DBAE",
        "300": "#9ECD8E",
        "400": "#83BF6E",
        "500": "#68B14E",
        "600": "#538E3E",
        "700": "#3E6A2F",
        "800": "#29471F",
        "900": "#152310",
      },
      yellow: {
        "50": "#FFF6E5",
        "100": "#FFE7B8",
        "200": "#FFD78A",
        "300": "#FFC85C",
        "400": "#FFB82E",
        "500": "#FFA900",
        "600": "#CC8700",
        "700": "#996500",
        "800": "#664300",
        "900": "#332200",
      },
    },
  },

  withDefaultVariant(Variant),
  withDefaultColorScheme(ColorScheme)
);
