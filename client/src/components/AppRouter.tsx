import {Route, Routes} from 'react-router-dom';
import {EPath} from '../enums/EPath';
import {useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';
import Login from '../views/login/Login';
import NotFound from '../views/NotFound';
import Main from '../views/Main';

enum ERoute {
  Path = 'path',
  Component = 'Component',
}

interface IRoute {
  [ERoute.Path]: EPath;
  [ERoute.Component](): JSX.Element;
}

const publicRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.Login, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.Signup, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.NotFound, [ERoute.Component]: NotFound},
];

const authRoutes: IRoute[] = [{[ERoute.Path]: EPath.Main, [ERoute.Component]: Main}];

const AppRouter = () => {
  const {isAuth} = useAppSelector(selectUser);

  return (
    <Routes>
      {publicRoutes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
    </Routes>
  );
};

export default AppRouter;
