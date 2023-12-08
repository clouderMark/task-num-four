import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {AppBar, Container, Toolbar, Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {theme} from '../styles/theme';
import {EPath} from '../enums/EPath';
import {logout, selectUser} from '../redux/userSlice';

const Bar = () => {
  const {isAuth} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(EPath.Login, {replace: true});
  };

  return (
    <Container maxWidth={false}>
      <AppBar sx={{backgroundColor: theme.palette.first.main, height: '70px'}}>
        <Toolbar sx={{display: 'flex', alignItems: 'flex-end'}}>
          {isAuth ? (
            <Button sx={{m: 1}} onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Bar;
