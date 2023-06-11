import { defineStyleConfig } from "@chakra-ui/react";

export const ButtonTheme = defineStyleConfig({
  baseStyle: {
    lineHeight: "1.6",
    borderRadius: "lg",
  },
});

export const CheckboxTheme = defineStyleConfig({
  sizes: {
    md: {
      control: {
        borderRadius: "lg",

      },
    },
  },
  
});
