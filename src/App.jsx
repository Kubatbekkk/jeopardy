import './App.css';
import { Route, Routes } from 'react-router';
import Game from './features/Game';
import Home from './features/Home';
import Statistics from './features/Statistics';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route
        path="/game"
        element={
          <RequireAuth>
            <Game />
          </RequireAuth>
        }
      />
      <Route
        path="/stats"
        element={
          <RequireAuth>
            <Statistics />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
