import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const uploadMovie = createAsyncThunk(
  '@@movie/upload',
  (movie, { extra: { axios } }) => {
    try {
      axios.post('/movies/add', movie);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllMovies = createAsyncThunk(
  '@@movie/all',
  async (_, { extra: { axios } }) => {
    try {
      const res = await axios.get('/movies/all');
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  watchlist: [],
  error: null,
  status: 'idle',
};

const movieSlice = createSlice({
  name: '@@movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.status = 'received';
      });
  },
});

export default movieSlice.reducer;
export const selectMovieStatus = (state) => state.movies.status;
