import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: '',
  tableData: [],
  selectedClue: null,
  isModalOpen: false,
  isAnswerCorrect: null,
  points: 0,
  clueClicked: {},
  timer: 60_000,
  status: 'idle',
  error: null,
};

const CATEGORIES_URL = 'http://jservice.io/api';

export const fetchQuestionByCategory = createAsyncThunk(
  'category/fetchQuestionByCategory',
  async () => {
    try {
      const categoryIDs = [68, 76, 94, 23, 24];

      const categoryData = categoryIDs.map(async (item) => {
        const res = await axios(`${CATEGORIES_URL}/category?id=${item}`);
        return res.data;
      });

      const categoriesWithClues = await Promise.all(categoryData);

      const transformedCategoriesWithClues = categoriesWithClues.map(
        (category) => {
          const filteredClues = category.clues
            .filter((clue) => clue.value !== null)
            .sort((a, b) => a.value - b.value)
            .filter((clue, index, array) => {
              if (index === 0) {
                return true;
              }
              return clue.value !== array[index - 1].value;
            })
            .slice(0, 5);

          return {
            ...category,
            clues: filteredClues,
          };
        }
      );

      return transformedCategoriesWithClues;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

export const startIsAnswerCorrectChange = createAsyncThunk(
  'category/startIsAnswerCorrectChange',
  async (payload, { dispatch }) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        dispatch(categorySlice.actions.setIsAnswerCorrect(payload));
        resolve();
      }, 3_000);
    });
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedClue: (state, action) => {
      state.selectedClue = action.payload;
    },
    setModalState: (state, action) => {
      state.isModalOpen = action.payload;
    },
    addPoints: (state, action) => {
      state.points += Number(action.payload);
    },
    subtractPoints: (state, action) => {
      state.points -= Number(action.payload);
    },
    clearPoints: (state) => {
      state.points = 0;
    },
    setClueClicked: (state, action) => {
      const { id, isCorrect } = action.payload;
      state.clueClicked[id] = isCorrect;
    },
    clearClueClicked: (state) => {
      state.clueClicked = {};
    },
    setIsAnswerCorrect: (state, action) => {
      state.isAnswerCorrect = action.payload;
    },
    decrementTimer: (state) => {
      state.timer -= 1_000;
    },
    resetTimer: (state) => {
      state.timer = 60_000;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestionByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestionByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tableData = action.payload;
      })
      .addCase(fetchQuestionByCategory.rejected, (state, action) => {
        state.status = 'failed';
        console.log({ action: action.error.message });
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedClue,
  setModalState,
  addPoints,
  setClueClicked,
  subtractPoints,
  setIsAnswerCorrect,
  setUser,
  removeUser,
  clearClueClicked,
  clearPoints,
  decrementTimer,
  resetTimer,
} = categorySlice.actions;

export default categorySlice.reducer;
