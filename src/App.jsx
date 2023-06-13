import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import Game from './features/Game';
import Home from './features/Home';
import Statistics from './features/Statistics';
import RequireAuth from './components/RequireAuth';
import { useSelector } from 'react-redux';
import { selectUser } from './features/categorySlice';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      navigate('/game');
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route element={<RequireAuth />}>
        <Route path="/game" element={<Game />} />
        <Route path="/stats" element={<Statistics />} />
      </Route>
    </Routes>
  );
}

export default App;
