import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {
  setModalState,
  addPoints,
  subtractPoints,
  setClueClicked,
  startIsAnswerCorrectChange,
  setIsAnswerCorrect,
  decrementTimer,
  resetTimer,
} from './categorySlice';
import {
  selectIsModalOpen,
  selectSelectedClue,
  selectTimer,
} from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: '#000',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AnswerModal = () => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const clue = useSelector(selectSelectedClue);
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');

  const timer = useSelector(selectTimer);

  const handleClose = () => {
    const isAnswerCorrect = clue.answer.toLowerCase() === answer;

    const payload = {
      id: clue.id,
      isCorrect: isAnswerCorrect,
    };

    if (isAnswerCorrect) {
      dispatch(addPoints(clue.value));
    } else {
      dispatch(subtractPoints(clue.value));
    }

    dispatch(setClueClicked(payload));
    dispatch(setModalState(false));
    dispatch(setIsAnswerCorrect(isAnswerCorrect));
    dispatch(startIsAnswerCorrectChange(null));
    setAnswer('');

    dispatch(resetTimer());
  };

  useEffect(() => {
    if (timer > 0 && isModalOpen) {
      const timerId = setInterval(() => {
        dispatch(decrementTimer());
      }, 1_000);

      return () => {
        clearInterval(timerId);
      };
    } else if (timer === 0 && isModalOpen) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, timer, isModalOpen]);

  const handleAnswer = (e) => {
    const trimmedValue = e.target.value.trim().toLowerCase();
    setAnswer(trimmedValue);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style}>
            <Box
              display="flex"
              flexDirection="column"
              gap="1rem"
              alignItems="center"
              justifyContent="space-around"
            >
              <Typography id="modal-modal-title" variant="body" component="h2">
                {clue?.question}
              </Typography>
              <TextField
                size="small"
                placeholder="Enter your answer"
                sx={{ width: '100%' }}
                onChange={handleAnswer}
              />
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                variant="caption"
              >
                hint: {clue?.answer}
              </Typography>

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                variant="caption"
              >
                Time left: {timer / 1_000}
              </Typography>
              <Button
                onClick={handleClose}
                variant="contained"
                disabled={!answer}
              >
                Answer
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </>
  );
};

export default AnswerModal;
