import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';

import { selectTableData, selectPoints } from './selectors';
import { clearClueClicked, clearPoints } from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';

import ClueButton from './ClueButton';
import AnswerModal from './AnswerModal';
import { Link } from 'react-router-dom';

const GameTable = () => {
  const questionsWithCategories = useSelector(selectTableData);
  const points = useSelector(selectPoints);
  const dispatch = useDispatch();

  const handleNewGame = () => {
    dispatch(clearClueClicked());
    dispatch(clearPoints());
  };

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
            <Button variant="contained" color="primary" onClick={handleNewGame}>
              New Game
            </Button>
            <Link to="/">
              <Button variant="outlined" color="warning">
                Finish Game
              </Button>
            </Link>
          </Box>
        </caption>
        <TableHead sx={{ background: '#C2DEDC', color: 'white' }}>
          <TableRow>
            {['Category', '#1', '#2', '#3', '#4', '#5'].map((item) => (
              <TableCell key={item} sx={{ fontWeight: 'bold' }}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {questionsWithCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell
                component="th"
                scope="row"
                sx={{ textTransform: 'capitalize' }}
              >
                {category.title}
              </TableCell>
              {category.clues.map((clue) => (
                <TableCell key={clue.id}>
                  <ClueButton clue={clue}>{clue.value}</ClueButton>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AnswerModal />
    </TableContainer>
  );
};

export default GameTable;
