import { Adminpage } from '../pages/Adminpage';
import { Homepage } from '../pages/Homepage';
import { Loginpage } from '../pages/Loginpage';
import { Moviepage } from '../pages/Moviepage';
import { Registerpage } from '../pages/Registerpage';
import { Searchpage } from '../pages/Searchpage';
import { Userpage } from '../pages/Userpage';
import { Watchpage } from '../pages/Watchpage';
import { ToastContainer, Bounce } from 'react-toastify';
import { Header } from '../components/Header';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Errorpage } from '../pages/Errorpage';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { selectUser } from '../features/auth-slice';

export enum RouteNames {
  LOGIN = '/login',
  HOME = '/',
  REGISTER = '/register',
  USERPAGE = '/user/:id',
  SEARCH = '/search',
  MOVIE = '/movie/:id',
  ADMINPAGE = '/admin',
  WATCH = '/watch',
}

interface RouteProps {
  children: JSX.Element;
}

export const AppRouter = () => {
  const user = useTypedSelector(selectUser);

  const AppLayout = () => {
    return (
      <>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const LoggedRoute = ({ children }: RouteProps) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const UnloggedRoute = ({ children }: RouteProps) => {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const AdminRoute = ({ children }: RouteProps) => {
    if (!user?.isAdmin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <Errorpage />,
      children: [
        {
          path: RouteNames.LOGIN,
          element: (
            <UnloggedRoute>
              <Loginpage />
            </UnloggedRoute>
          ),
        },
        {
          path: RouteNames.REGISTER,
          element: (
            <UnloggedRoute>
              <Registerpage />
            </UnloggedRoute>
          ),
        },
        {
          path: RouteNames.HOME,
          element: <Homepage />,
        },
        {
          path: RouteNames.USERPAGE,
          element: (
            <LoggedRoute>
              <Userpage />
            </LoggedRoute>
          ),
        },
        {
          path: RouteNames.SEARCH,
          element: <Searchpage />,
        },
        {
          path: RouteNames.ADMINPAGE,
          element: (
            <AdminRoute>
              <Adminpage />
            </AdminRoute>
          ),
        },
        {
          path: RouteNames.MOVIE,
          element: <Moviepage />,
        },
        {
          path: RouteNames.WATCH,
          element: <Watchpage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

// export const publicRoutes: IRoute[] = [
//   { path: RouteNames.LOGIN, element: <Loginpage /> },
//   { path: RouteNames.REGISTER, element: <Registerpage /> },
// ];

// export const privateRoutes: IRoute[] = [
//   { path: RouteNames.USERPAGE, element: <Userpage /> },
//   { path: RouteNames.ADMINPAGE, element: <Adminpage /> },
//   { path: RouteNames.MOVIE, element: <Moviepage /> },
//   { path: RouteNames.WATCH, element: <Watchpage /> },
//   { path: RouteNames.SEARCH, element: <Searchpage /> },
//   { path: RouteNames.HOME, element: <Homepage /> },
// ];

// export interface IRoute {
//   path: string;
//   element: React.ReactNode;
// }
