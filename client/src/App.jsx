import { useEffect } from 'react';
import { selectUser } from './features/auth-slice';
import 'react-toastify/dist/ReactToastify.css';
import { useTypedSelector } from './hooks/useTypedSelector';
import { AppRouter } from './router';

function App() {
  const user = useTypedSelector(selectUser);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return <AppRouter />;
}

export default App;
