import { TextField, Typography, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  setUser,
  removeUser,
  clearClueClicked,
  clearPoints,
} from './categorySlice';
import { selectUser, selectClickedClues, selectPoints } from './selectors';

const Home = () => {
  const user = useSelector(selectUser);
  const clickedClues = useSelector(selectClickedClues);
  const points = useSelector(selectPoints);

  const [userName, setUserName] = useState(user);
  const [error, setError] = useState('');
  const userRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const onUserNameChange = (e) => {
    const input = e.target.value;
    const regex = /^[A-Za-zА-Яа-я\s]+$/;

    if (regex.test(input) || input === '') {
      setUserName(input);
      setError('');
    } else {
      setError('Only letters are allowed');
    }
  };

  const handleSaveUserAndClose = () => {
    if (userName.trim() !== '') {
      dispatch(setUser(userName));
      navigate('/game');
    } else {
      setError('Please enter a valid name');
    }
  };

  const handleLogout = () => {
    dispatch(clearClueClicked());
    dispatch(clearPoints());
    dispatch(removeUser());
    setUserName('');
  };

  const handleNewGame = () => {
    dispatch(clearClueClicked());
    dispatch(clearPoints());
  };

  const isExistingGame = points === 0 && Object.keys(clickedClues).length === 0;

  return (
    <>
      {user ? (
        <Stack width={600} alignContent="center">
          <Typography variant="h4" mb={2} align="center">
            Welcome, {user}
          </Typography>
          <Stack flexDirection="row" gap="1rem" justifyContent="center">
            <Link to="/stats">
              <Button variant="contained">Statistics</Button>
            </Link>
            <Link to="/game">
              <Button variant="contained" onClick={handleNewGame}>
                New Game
              </Button>
            </Link>
            <Link to="/game">
              <Button
                variant="contained"
                color="success"
                disabled={isExistingGame}
              >
                Resume Game
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="contained" color="warning">
              Logout
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack width={300} alignContent="center">
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
      )}
    </>
  );
};

export default Home;
