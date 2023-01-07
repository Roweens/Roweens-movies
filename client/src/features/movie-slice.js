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
  (queries, { extra: { axios } }) => {
    try {
      console.log(queries);
      const res = axios.get('/movies/' + queries);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSingleMovie = createAsyncThunk(
  '@movie/single',
  (id, { extra: { axios } }) => {
    try {
      const res = axios.get('/movies/' + id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const rateMovie = createAsyncThunk(
  '@movie/rate',
  ({ id, ratingValue }, { extra: { axios } }) => {
    try {
      axios.put(`/movies/${id}`, { id: id, rating: ratingValue });
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
      })
      .addCase(getSingleMovie.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getSingleMovie.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(getSingleMovie.fulfilled, (state, action) => {
        state.status = 'received';
      });
  },
});

export default movieSlice.reducer;
export const selectMovieStatus = (state) => state.movies.status;
