import { useSelector } from 'react-redux';
import { selectClickedClues, selectPoints } from './categorySlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="caption table">
        <caption>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight="bold" align="center">
              Your Points: {points}
            </Typography>
            <Typography variant="h6" fontWeight="bold" align="center">
              <Link to="/stats">Statistics</Link>
            </Typography>
            <Button variant="contained" color="primary">
              New Game
            </Button>
            <Button variant="outlined" color="warning">
              Log Out
            </Button>
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Statistics;
