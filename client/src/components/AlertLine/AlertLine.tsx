import {Alert, Fade} from '@mui/material';
import {alert as styles} from './styles/alert';
import {useAppSelector} from '../../redux/hooks';
import {selectAlert} from '../../redux/alertSlice';

const AlertLine = () => {
  const {isOpen, message, statusCode} = useAppSelector(selectAlert);
  const type = statusCode && statusCode >= 400 ? 'error' : 'success';

  return (
    <Fade in={isOpen}>
      <Alert severity={type} sx={[styles, {zIndex: 9999}]} elevation={6}>
        {message}
      </Alert>
    </Fade>
  );
};

export default AlertLine;
