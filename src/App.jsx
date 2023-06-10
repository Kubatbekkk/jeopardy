import './App.css';
import { Route, Routes } from 'react-router';
import Game from './features/Game';
import Home from './features/Home';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<RequireAuth />}>
        <Route path="/game" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
