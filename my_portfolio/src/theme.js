import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
});

export default customTheme;