import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categoryIDs: [68, 76, 94, 23, 24],
  user: localStorage.getItem('user') || '',
  tableData: [],
  selectedClue: null,
  isModalOpen: false,
  isAnswerCorrect: null,
  points: JSON.parse(localStorage.getItem('points')) || 0,
  clueClicked: JSON.parse(localStorage.getItem('clue-clicked')) || {},
  status: 'idle',
  error: null,
};

const CATEGORIES_URL = 'http://jservice.io/api';

export const fetchQuestionByCategory = createAsyncThunk(
  'category/fetchQuestionByCategory',
  async (_, { getState }) => {
    try {
      const { categoryIDs } = getState();

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
        state.error = action.error.message;
      });
  },
});

// ? actions
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
} = categorySlice.actions;

// ? selectors
export const selectTableData = (state) => state.tableData;
export const selectSelectedClue = (state) => state.selectedClue;
export const selectIsModalOpen = (state) => state.isModalOpen;
export const selectClickedClues = (state) => state.clueClicked;
export const selectPoints = (state) => state.points;
export const selectIsAnswerCorrect = (state) => state.isAnswerCorrect;
export const selectUser = (state) => state.user;
export const selectStatus = (state) => state.status;

export default categorySlice.reducer;
