import { Container } from '@mui/material';
import GamePage from './features/GamePage';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchQuestionByCategory } from './features/categorySlice';

function App() {
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchQuestionByCategory());
  }, [status, dispatch]);

  let content;
  if (status === 'loading') {
    content = <h1>Loading...</h1>;
  } else if (status === 'succeeded') {
    content = (
      <>
        <h1>Jeopardy</h1>
        <Container>
          <GamePage />
        </Container>
      </>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return <main>{content}</main>;
}

export default App;
