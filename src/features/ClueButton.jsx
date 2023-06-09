import {
  setSelectedClue,
  setModalState,
  selectClickedClues,
  setClueClicked,
} from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';

const ClueButton = ({ clue }) => {
  const dispatch = useDispatch();
  const clickedClues = useSelector(selectClickedClues);
  const isClicked = Object.hasOwnProperty.call(clickedClues, clue.id);
  const isAnswerCorrect = clickedClues[clue.id];
  //!если это правильно, то .css-1rwt2y5-MuiButtonBase-root-MuiButton-root.Mui-disabled переписать на зеленый
  //!если это неправильно, то .css-1rwt2y5-MuiButtonBase-root-MuiButton-root.Mui-disabled переписать на красный color, border
  const handleClick = () => {
    dispatch(setSelectedClue(clue));
    dispatch(setModalState(true));
    dispatch(setClueClicked(clue.id));
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isClicked}
        className={`clue__btn ${
          isAnswerCorrect === undefined
            ? ''
            : isAnswerCorrect
            ? 'clue__btn--correct'
            : 'clue__btn--incorrect'
        } `}
      >
        {clue.value}
      </button>
    </>
  );
};
// color={`${
//   isClicked ? (isAnswerCorrect ? 'success' : 'error') : 'inherit'
// }`}

export default ClueButton;
