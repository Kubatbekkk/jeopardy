import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { selectClue, selectTableData } from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import AnswerModal from './AnswerModal';

function GamePage() {
  const questionsWithCategories = useSelector(selectTableData);
  const dispatch = useDispatch();

  const handleClueClick = (clue) => {
    dispatch(selectClue(clue));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
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
              <TableCell component="th" scope="row">
                {category.title}
              </TableCell>
              {category.clues.map((clue) => (
                <TableCell key={clue.id}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleClueClick(clue)}
                  >
                    {clue.value}
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AnswerModal />
    </TableContainer>
  );
}

export default GamePage;
