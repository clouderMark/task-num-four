import {Container, Typography} from '@mui/material';

const NotFound = () => (
  <Container maxWidth={false} sx={{mb: 15}}>
    <Typography component='h1' sx={{mb: 4, mt: 4, fontSize: '30px'}}>Страница не найдена</Typography>
  </Container>
);

export default NotFound;
