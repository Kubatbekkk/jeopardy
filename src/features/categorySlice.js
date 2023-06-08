import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categoryIDs: [68, 76, 94, 23, 24],
  tableData: [],
  selectedClue: null,
  modalOpen: true,
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

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectClue: (state, action) => {
      state.selectedClue = action.payload;
    },
    setModalState: (state, action) => {
      state.modalOpen = action.payload;
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
export const { selectClue, setModalState } = categorySlice.actions;

// ? selectors
export const selectTableData = (state) => state.tableData;
export const selectSelectClue = (state) => state.category.selectClue;
export const selectModalOpen = (state) => state.modalOpen;

export default categorySlice.reducer;
