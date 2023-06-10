import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {
  selectIsModalOpen,
  selectSelectedClue,
  setModalState,
  addPoints,
  subtractPoints,
  setClueClicked,
  startIsAnswerCorrectChange,
  setIsAnswerCorrect,
  selectUser,
  setUser,
} from './categorySlice';
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

const UserModal = () => {
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(!user);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setModal(!user);
    console.log('test');
    setUserName(user);
  }, [user]);
  console.log(user);

  const onUserNameChange = (e) => {
    const input = e.target.value;

    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(input) || input === '') {
      setUserName(input);
      dispatch(setUser(userName));
      setError('');
    } else {
      setError('Only letters are allowed');
    }
  };

  const handleSaveUserAndClose = () => {
    if (userName.trim() !== '') {
      // dispatch(setModalState(false));
      localStorage.setItem('user', userName);
      setModal(false);
    } else {
      setError('Please enter a valid name');
    }
  };

  return (
    <>
      <Modal
        open={modal}
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
                Your Name
              </Typography>
              <TextField
                value={userName}
                size="small"
                placeholder="Enter your name"
                sx={{ width: '100%' }}
                onChange={onUserNameChange}
                error={error !== ''}
                helperText={error}
              />
              <Button onClick={handleSaveUserAndClose} variant="contained">
                Start Game
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </>
  );
};

export default UserModal;
