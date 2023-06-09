import { Alert, Box, Container } from '@mui/material';
import GamePage from './features/GamePage';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchQuestionByCategory,
  selectIsAnswerCorrect,
} from './features/categorySlice';

function App() {
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const isAnswerCorrect = useSelector(selectIsAnswerCorrect);

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
        <Container>
          <Box
            display="flex"
            flexDirection="row"
            gap="1rem"
            alignItems="center"
            justifyContent="space-between"
          >
            <h1 className="heading__text">Jeopardy</h1>
            {isAnswerCorrect !== null && (
              <Box width="50%">
                <Alert severity={`${isAnswerCorrect ? 'success' : 'error'}`}>
                  {isAnswerCorrect
                    ? 'The answer is correct'
                    : 'The answer is incorrect'}
                </Alert>
              </Box>
            )}
          </Box>
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
