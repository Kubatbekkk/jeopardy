import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {
  selectIsModalOpen,
  selectSelectedClue,
  setModalState,
  addPoints,
} from './categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useState } from 'react';

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

export default function AnswerModal() {
  const isModalOpen = useSelector(selectIsModalOpen);
  const clue = useSelector(selectSelectedClue);
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');

  const handleClose = () => {
    if (clue.answer.toLowerCase() === answer) {
      dispatch(addPoints(clue.value));
      dispatch(setModalState(false));
    }
    if (clue.answer.toLowerCase() !== answer) {
      dispatch(setModalState(false));
    }
  };

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
                sx={{ width: '100%' }}
                onChange={handleAnswer}
                error={answer.trim() === ''}
                helperText={
                  answer.trim() === '' ? 'Please fill in the answer' : ''
                }
              />
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                variant="caption"
              >
                hint: {clue?.answer}
              </Typography>
              <Button onClick={handleClose} variant="contained">
                Answer
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </>
  );
}
