import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Typography } from '@mui/material';

import {
  selectTableData,
  selectPoints,
  removeUser,
  selectClickedClues,
  clearClueClicked,
} from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';

import ClueButton from './ClueButton';
import AnswerModal from './AnswerModal';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const GameTable = () => {
  const questionsWithCategories = useSelector(selectTableData);
  const points = useSelector(selectPoints);
  const clickedClues = useSelector(selectClickedClues);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('clue-clicked', JSON.stringify(clickedClues));
    localStorage.setItem('points', JSON.stringify(points));
  }, [clickedClues, points]);

  const handleNewGame = () => {
    localStorage.removeItem('clue-clicked');
    dispatch(clearClueClicked());
  };

  const handleLogout = () => {
    localStorage.removeItem('clue-clicked');
    localStorage.removeItem('points');
    localStorage.removeItem('user');
    dispatch(clearClueClicked());
    dispatch(removeUser());
    navigate('/');
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
            <Typography variant="h6" fontWeight="bold" align="center">
              <Link to="/stats">Statistics</Link>
            </Typography>
            <Button variant="contained" color="primary" onClick={handleNewGame}>
              New Game
            </Button>
            <Button variant="outlined" color="warning" onClick={handleLogout}>
              Log Out
            </Button>
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
