import { Homepage } from './pages/Homepage';
import { Loginpage } from './pages/Loginpage';
import { Moviepage } from './pages/Moviepage';
import { Registerpage } from './pages/Registerpage';
import { Searchpage } from './pages/Searchpage';
import { Userpage } from './pages/Userpage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { selectUser } from './features/auth-slice';
import { useSelector } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { Adminpage } from './pages/Adminpage';

function App() {
  const user = useSelector(selectUser);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <>
      <NotificationContainer />
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Loginpage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Registerpage />}
        />
        <Route
          path="/user/:id"
          element={!user ? <Navigate to="/" /> : <Userpage />}
        />
        <Route path="/search" element={<Searchpage />} />
        <Route path="/movie/:id" element={<Moviepage />} />
        <Route path="/admin" element={<Adminpage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
