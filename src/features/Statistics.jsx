import { useDispatch, useSelector } from 'react-redux';
import {
  clearClueClicked,
  clearPoints,
  selectClickedClues,
  selectPoints,
} from './categorySlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Statistics = () => {
  const answeredQuestions = useSelector(selectClickedClues);
  const points = useSelector(selectPoints);

  const answeredCount = Object.keys(answeredQuestions).length;
  const correctCount = Object.values(answeredQuestions).filter(
    (value) => value === true
  ).length;
  const incorrectCount = Object.values(answeredQuestions).filter(
    (value) => value === false
  ).length;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewGame = () => {
    localStorage.removeItem('points');
    localStorage.removeItem('clue-clicked');
    dispatch(clearClueClicked());
    dispatch(clearPoints());
    navigate('/game');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="caption table">
        <caption>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap="1rem"
          >
            <Button variant="contained" color="primary" onClick={handleNewGame}>
              New Game
            </Button>
            <Link to="/">
              <Button variant="outlined" color="secondary">
                Home
              </Button>
            </Link>
          </Box>
        </caption>
        <TableHead sx={{ background: '#C2DEDC', color: 'white' }}>
          <TableRow>
            {[
              'Answered Questions',
              'Correct Answers',
              'Incorrect Answers',
              'Points',
            ].map((item) => (
              <TableCell key={item} sx={{ fontWeight: 'bold' }}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {answeredCount > 0 ? (
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} align="justify">
                {answeredCount}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="justify">
                {correctCount}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="justify">
                {incorrectCount}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="justify">
                {points}
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="h5">
                  You did not answer any questions
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Statistics;
