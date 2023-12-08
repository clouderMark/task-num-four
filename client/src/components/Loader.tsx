import * as React from 'react';
import {Box, LinearProgress} from '@mui/material/';
import {theme} from '../styles/theme';
import {useAppSelector} from '../redux/hooks';
import {selectLoader} from '../redux/loaderSlice';

const Loader = () => {
  const {isOpen} = useAppSelector(selectLoader);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }

        const diff = Math.random() * 10;

        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {isOpen ? (
        <Box
          sx={{
            width: '100%',
            '& .MuiLinearProgress-colorPrimary': {
              backgroundColor: 'transparent',
            },
            '& .MuiLinearProgress-barColorPrimary': {
              backgroundColor: theme.palette.first.main,
            },
            position: 'fixed',
          }}
        >
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      ) : null}
    </>
  );
};

export default Loader;
