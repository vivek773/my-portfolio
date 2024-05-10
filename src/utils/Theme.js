// MUI theme
import { createTheme } from "@mui/material/styles";

// Utils
import { FONT_PRIMARY, FONT_COLOR, TEXT_FIELD } from "./Color";

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

const theme = createTheme({
  typography: {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 800,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      color: FONT_COLOR.PRIMARY,
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontWeight: 800,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      color: FONT_COLOR.PRIMARY,
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      color: FONT_COLOR.PRIMARY,
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      color: FONT_COLOR.PRIMARY,
      ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
      color: FONT_COLOR.PRIMARY,
      ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h6: {
      fontWeight: 700,
      lineHeight: 28 / 18,
      fontSize: pxToRem(17),
      color: FONT_COLOR.PRIMARY,
      ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
      color: FONT_COLOR.PRIMARY,
    },
    subtitle2: {
      fontWeight: "bold",
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
      color: `${FONT_COLOR.LINK} !important`,
    },
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
      color: FONT_COLOR.PRIMARY,
    },
    body2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
      color: FONT_COLOR.PRIMARY,
    },
  },

  components: {
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       '&.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    //         borderColor: "red",
    //       },
    //       "& label": {
    //         color: TEXT_FIELD.labelColor,
    //       },
    //       '& label.Mui-focused': {
    //         color: TEXT_FIELD.labelFocusedColor,
    //       },
    //       "& .MuiOutlinedInput-root": {
    //         '& fieldset': {
    //           borderColor: TEXT_FIELD.borderColor,
    //         },
    //         '&:hover fieldset': {
    //           borderColor: TEXT_FIELD.borderHoverColor,
    //         },
    //         '&.Mui-focused fieldset': {
    //           borderColor: TEXT_FIELD.borderFocusedColor,
    //         },
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
