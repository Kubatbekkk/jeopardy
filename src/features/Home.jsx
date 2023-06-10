import { TextField, Typography, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, setUser } from './categorySlice';

const Home = () => {
  const user = useSelector(selectUser);
  const [userName, setUserName] = useState(user);
  const [error, setError] = useState('');
  const userRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const onUserNameChange = (e) => {
    const input = e.target.value;
    const regex = /^[A-Za-z\s]+$/;

    if (regex.test(input) || input === '') {
      setUserName(input);
      setError('');
    } else {
      setError('Only letters are allowed');
    }
  };

  const handleSaveUserAndClose = () => {
    if (userName.trim() !== '') {
      localStorage.setItem('user', userName);
      dispatch(setUser(userName));
      navigate('/game');
    } else {
      setError('Please enter a valid name');
    }
  };

  return (
    <Stack width={300}>
      <Typography>Enter Your Name</Typography>
      <TextField
        autoComplete="off"
        value={userName}
        label="Enter Your Name"
        variant="filled"
        onChange={onUserNameChange}
        inputRef={userRef}
        error={error !== ''}
        helperText={error}
        sx={{
          backgroundImage:
            'linear-gradient(to right top, #969ba4, #8ba4b0, #7eadb3, #7bb6a9, #8cbb94)',
        }}
        margin="normal"
      />
      <Button
        variant="contained"
        disabled={!userName}
        onClick={handleSaveUserAndClose}
      >
        Start Game
      </Button>
    </Stack>
  );
};

export default Home;
