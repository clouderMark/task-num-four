import {theme} from '../../styles/theme';

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    mt: 10,
  },

  card: {
    width: '50%',
    p: 5,
    mb: 15,

    '@media (max-width: 900px)': {
      width: '100%',
    },
  },

  box: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 2,
    mb: 2,
    p: 3,

    '@media (max-width: 1100px)': {
      flexDirection: 'column',
      p: 0,
      mt: 5,
    },
  },

  button: {
    color: theme.palette.first.main,

    '@media (max-width: 1100px)': {
      mb: 2,
    },
  },
};
