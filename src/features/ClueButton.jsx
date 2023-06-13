import { selectClickedClues } from './selectors';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedClue, setModalState } from './categorySlice';

const ClueButton = ({ clue }) => {
  const dispatch = useDispatch();
  const clickedClues = useSelector(selectClickedClues);
  const isClicked = Object.hasOwnProperty.call(clickedClues, clue.id);
  const isAnswerCorrect = clickedClues[clue.id];

  const handleClick = () => {
    dispatch(setSelectedClue(clue));
    dispatch(setModalState(true));
  };

  return (
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
  );
};

export default ClueButton;
