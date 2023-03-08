import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Axios } from 'axios';
import { RootState } from '../store';
import { Movie } from '../types/movie';
import { Status } from '../types/status';

export const uploadMovie = createAsyncThunk<
  Movie,
  Movie,
  { extra: { axios: Axios } }
>('@@movie/upload', async (movie, { extra: { axios } }) => {
  try {
    const res = await axios.post('/movies/add', movie);
    return res.data;
  } catch (err) {
    throw new Error('Server error!');
  }
});

export const getAllMovies = createAsyncThunk<
  Movie[],
  string,
  { extra: { axios: Axios } }
>('@@movie/all', async (search, { extra: { axios } }) => {
  try {
    const res = await axios.get('/movies/' + search);
    return res.data;
  } catch (error) {
    throw new Error('Server error!');
  }
});

export const getSingleMovie = createAsyncThunk<
  Movie,
  string,
  { extra: { axios: Axios } }
>('@movie/single', async (id, { extra: { axios } }) => {
  try {
    const res = await axios.get('/movies/find/' + id);
    return res.data;
  } catch (error) {
    throw new Error('Server error!');
  }
});

export const getRandomMovie = createAsyncThunk<
  Movie | Movie[],
  { size: number; param?: string },
  { extra: { axios: Axios } }
>('@movie/random', async ({ size, param }, { extra: { axios } }) => {
  try {
    const res = await axios.get('/movies/random', {
      params: {
        size,
        param,
      },
    });

    if (size === 1) {
      return res.data[0];
    }
    return res.data;
  } catch (error) {
    throw new Error('Server error!');
  }
});

export const rateMovie = createAsyncThunk<
  Movie,
  { id: string; ratingValue: number; userId: string },
  { extra: { axios: Axios } }
>('@movie/rate', async ({ id, ratingValue, userId }, { extra: { axios } }) => {
  try {
    const res = await axios.put(`/movies/${id}`, {
      id: id,
      rating: ratingValue,
      userId,
    });
    return res.data;
  } catch (error) {
    throw new Error('Server error!');
  }
});

type MovieSlice = {
  status: Status;
  error: string | null;
};

const initialState: MovieSlice = {
  error: null,
  status: 'idle',
};

const movieSlice = createSlice({
  name: '@@movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.fulfilled, (state) => {
        state.status = 'received';
      })
      .addCase(getSingleMovie.fulfilled, (state) => {
        state.status = 'received';
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = 'rejected';
      })
      .addMatcher(isLoading, (state) => {
        state.error = null;
        state.status = 'loading';
      });
  },
});

export default movieSlice.reducer;
export const selectMovieStatus = (state: RootState) => state.movies.status;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

function isLoading(action: AnyAction) {
  return action.type.endsWith('pending');
}
