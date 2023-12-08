import {useEffect, FormEvent} from 'react';
import {Box, Button, Card, Container, TextField, Typography} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {EPath} from '../../enums/EPath';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectUser} from '../../redux/userSlice';
import {useLoginUserMutation, useSignupUserMutation} from '../../redux/userApi';
import {showAlert} from '../../redux/alertSlice';
import {styles} from './styles';

const Login = () => {
  const {isAuth} = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === EPath.Login;
  const [loginUser, {isError: isLoginError, error: loginError}] = useLoginUserMutation();
  const [signupUser, {isError: isRegisterError, error: registerError}] = useSignupUserMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) navigate(EPath.Main, {replace: true});
  }, [isAuth]);

  useEffect(() => {
    if (isLoginError && 'data' in loginError!) {
      dispatch(showAlert({message: loginError.data.message, statusCode: loginError.status}));
    }

    if (isRegisterError && 'data' in registerError!) {
      dispatch(showAlert({message: registerError.data.message, statusCode: registerError.status}));
    }
  }, [isLoginError, isRegisterError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const email = target.email.value.trim();
    const password = target.password.value.trim();

    if (isLogin) {
      await loginUser({email, password});
    } else {
      const name = target.userName.value.trim();

      console.log({name, email, password});

      await signupUser({name, email, password});
    }
  };

  return (
    <>
      <Container sx={styles.container}>
        <Card sx={styles.card}>
          <Typography component="h3" sx={{mt: 'auto'}}>
            {isLogin ? 'Авторизация' : 'Регистрация'}
          </Typography>
          <Box component="form" sx={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            {!isLogin ? <TextField name="userName" sx={{mt: 3}} placeholder="Введите ваше имя..." /> : null}
            <TextField name="email" sx={{mt: 3}} placeholder="Введите ваш email..." />
            <TextField name="password" sx={{mt: 3}} placeholder="Введите ваш пароль..." />
            <Box sx={styles.box}>
              <Button type="submit" sx={styles.button} variant="outlined">
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
              <Typography sx={{mt: 'auto'}}>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                <Link to={isLogin ? EPath.Signup : EPath.Login}>{isLogin ? ' Зарегистрируйтесь!' : ' Войдите!'}</Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Login;
