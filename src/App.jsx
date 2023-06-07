import { Container } from '@mui/material';
import GamePage from './features/GamePage';
import './App.css';

function App() {
  return (
    <>
      <div>
        <h1>Jeopardy</h1>
        <Container>
          <GamePage />
        </Container>
      </div>
    </>
  );
}

export default App;
