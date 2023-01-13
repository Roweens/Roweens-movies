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
  ({ search, page }, { extra: { axios } }) => {
    try {
      const res = axios.get('/movies/' + search, {
        params: {
          page,
        },
      });
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
      const res = axios.get('/movies/find/' + id);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getRandomMovie = createAsyncThunk(
  '@movie/random',
  (_, { extra: { axios } }) => {
    try {
      console.log('123');
      const res = axios.get('/movies/random');
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const rateMovie = createAsyncThunk(
  '@movie/rate',
  ({ id, ratingValue, userId }, { extra: { axios } }) => {
    try {
      axios.put(`/movies/${id}`, { id: id, rating: ratingValue, userId });
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
