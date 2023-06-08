import {
  setSelectedClue,
  setModalState,
  selectClickedClues,
  // selectSelectedClue,
  setClueClicked,
} from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

function ClueButton({ clue }) {
  const dispatch = useDispatch();
  const clickedClues = useSelector(selectClickedClues);
  // const selectedClue = useSelector(selectSelectedClue);
  const isClicked = clickedClues.includes(clue.id);
  // const isAnswered = selectedClue?.id === clue.id;

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
}

export default ClueButton;
