import './App.css';
import { Route, Routes } from 'react-router';
import Game from './features/Game';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
