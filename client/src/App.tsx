import {CssBaseline} from '@mui/material';
import {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useCheckUserMutation} from './redux/userApi';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {getToken, selectUser} from './redux/userSlice';
import Loader from './components/Loader';
import AlertLine from './components/AlertLine/AlertLine';

const App = () => {
  const dispatch = useAppDispatch();
  const [checkUser] = useCheckUserMutation();

  const {token} = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    if (token) {
      checkUser(token);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Loader />
      <AppRouter />
      <AlertLine />
    </BrowserRouter>
  );
};

export default App;
