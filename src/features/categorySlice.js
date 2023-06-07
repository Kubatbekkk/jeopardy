import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

const CATEGORIES_URL = 'http://jservice.io/api/categories';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (queryParams) => {
    try {
      const response = await axios.get(CATEGORIES_URL, { params: queryParams });
      console.log(
        'query: ',
        await axios.get(CATEGORIES_URL, { params: queryParams })
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCategories = (state) => state.categories;

export default categorySlice.reducer;
