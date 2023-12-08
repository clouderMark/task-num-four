import {createTheme, PaletteColorOptions, PaletteColor, lighten} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    first?: PaletteColorOptions;
    second?: PaletteColorOptions;
    third?: PaletteColorOptions;
    fourth?: PaletteColorOptions;
  }

  interface Palette {
    first: PaletteColor;
    second: PaletteColor;
    third: PaletteColor;
    fourth: PaletteColor;
  }

  interface ButtonPropsColorOverrides {
    first: true;
    second: true;
    third: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    first: true;
    second: true;
    third: true;
    fourth: true;
  }
}

const globalTheme = createTheme({
  palette: {
    first: {
      main: '#008f38',
      dark: '#007146',
    },
    second: {
      main: '#a3d8dd',
    },
    third: {
      main: '#fff',
      light: 'rgba(255, 255, 255, .6)',
      dark: 'rgba(255, 255, 255, .3)',
    },
    fourth: {
      main: '#6f6f6f',
      light: lighten('#6f6f6f', 0.3),
    },
  },
});

export const theme = createTheme({
  palette: {
    first: {
      main: globalTheme.palette.first.main,
      dark: globalTheme.palette.first.dark,
    },
    second: {
      main: globalTheme.palette.second.main,
    },
    third: {
      main: globalTheme.palette.third.main,
      light: globalTheme.palette.third.light,
    },
    fourth: {
      main: globalTheme.palette.fourth.main,
      light: globalTheme.palette.fourth.light,
    },
  },
  typography: {
    allVariants: {
      color: globalTheme.palette.fourth.main,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '54px',
          padding: '25px',
          borderRadius: 0,
          color: globalTheme.palette.third.main,
          fontWeight: 400,
          fontSize: '1.125rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'trasparent',
            color: 'inherit',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          maxWidth: '1400px',
          boxShadow: 'none',
          position: 'sticky',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0 !important',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1448px',
        },
      },
    },
  },
});
