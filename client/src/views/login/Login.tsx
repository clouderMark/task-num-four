import {useEffect, FormEvent, useState, ChangeEvent} from 'react';
import {Box, Button, Card, Container, TextField, Typography} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {EPath} from '../../enums/EPath';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectUser} from '../../redux/userSlice';
import {useLoginUserMutation, useSignupUserMutation} from '../../redux/userApi';
import {showAlert} from '../../redux/alertSlice';
import {styles} from './styles';
import {EName, IDefaultValid} from './types';
import {defaultValid, defaultValue} from './defaultValue';
import {isValid} from './isValid';

const Login = () => {
  const {isAuth} = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === EPath.Login;
  const [loginUser, {isError: isLoginError, error: loginError}] = useLoginUserMutation();
  const [signupUser, {isError: isRegisterError, error: registerError}] = useSignupUserMutation();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid>(defaultValid);

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, [event.target.name]: event.target.value});
    setValid({...valid, [event.target.name]: isValid(event.target)});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin && valid[EName.EMAIL] && valid[EName.PASSWORD]) {
      await loginUser({email: value[EName.EMAIL].trim(), password: value[EName.PASSWORD].trim()});
    } else if (valid[EName.NAME] && valid[EName.PASSWORD] && valid[EName.EMAIL]) {
      await signupUser({
        name: value[EName.NAME].trim(),
        email: value[EName.EMAIL].trim(),
        password: value[EName.PASSWORD].trim(),
      });
    } else {
      const target = event.currentTarget;

      setValid({
        [EName.NAME]: isLogin ? true : isValid(target[EName.NAME]),
        [EName.EMAIL]: isValid(target[EName.EMAIL]),
        [EName.PASSWORD]: isValid(target[EName.PASSWORD]),
      });
    }
  };

  return (
    <>
      <Container sx={styles.container}>
        <Card sx={styles.card}>
          <Typography component="h3" sx={{mt: 'auto'}}>
            {isLogin ? 'Authorization' : 'Registration'}
          </Typography>
          <Box component="form" sx={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            {!isLogin ? (
              <TextField
                name={EName.NAME}
                sx={{mt: 3}}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                placeholder="Enter your name..."
                error={valid[EName.NAME] === false}
                color={valid[EName.NAME] ? 'success' : 'primary'}
              />
            ) : null}
            <TextField
              name={EName.EMAIL}
              sx={{mt: 3}}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              placeholder="Enter your email..."
              error={valid[EName.EMAIL] === false}
              color={valid[EName.EMAIL] ? 'success' : 'primary'}
            />
            <TextField
              name={EName.PASSWORD}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              sx={{mt: 3}}
              placeholder="Enter your password..."
              error={valid[EName.PASSWORD] === false}
              color={valid[EName.PASSWORD] ? 'success' : 'primary'}
            />
            <Box sx={styles.box}>
              <Button type="submit" sx={styles.button} variant="outlined">
                {isLogin ? 'Enter' : 'Registration'}
              </Button>
              <Typography sx={{mt: 'auto'}}>
                {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                <Link to={isLogin ? EPath.Signup : EPath.Login}>{isLogin ? ' Register!' : 'Sign in!'}</Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Login;
