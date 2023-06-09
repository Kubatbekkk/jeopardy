import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { selectTableData, selectPoints } from './categorySlice';
import { useSelector } from 'react-redux';

import ClueButton from './ClueButton';
import AnswerModal from './AnswerModal';
import { Typography } from '@mui/material';

const GamePage = () => {
  const questionsWithCategories = useSelector(selectTableData);
  const points = useSelector(selectPoints);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="caption table">
        <caption>
          <Typography variant="h6" fontWeight="bold" align="center">
            Your Points: {points}
          </Typography>
        </caption>
        <TableHead sx={{ background: '#C2DEDC', color: 'white' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>#1</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>#2</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>#3</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>#4</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>#5</TableCell>
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

export default GamePage;
