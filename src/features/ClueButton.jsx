import {
  setSelectedClue,
  setModalState,
  selectClickedClues,
  setClueClicked,
} from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

const ClueButton = ({ clue }) => {
  const dispatch = useDispatch();
  const clickedClues = useSelector(selectClickedClues);
  const isClicked = clickedClues.includes(clue.id);

  const handleClick = () => {
    dispatch(setSelectedClue(clue));
    dispatch(setModalState(true));
    dispatch(setClueClicked(clue.id));
  };

  return (
    <>
      <Button variant="outlined" disabled={isClicked} onClick={handleClick}>
        {clue.value}
      </Button>
    </>
  );
};

export default ClueButton;
