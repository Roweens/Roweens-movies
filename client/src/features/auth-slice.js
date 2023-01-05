import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const handleSignIn = createAsyncThunk(
  '@@auth/sign-in',
  ({ email, password }, { extra: { axios } }) => {
    try {
      const res = axios.post('/auth/login', {
        email: email,
        password: password,
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleSignUp = createAsyncThunk(
  '@@auth/sign-up',
  ({ username, email, password }, { extra: { axios } }) => {
    const res = axios.post('/auth/register', {
      username: username,
      email: email,
      password: password,
    });

    return res;
  }
);

export const handleUserUpdate = createAsyncThunk(
  '@@auth/update',
  ({ id, token, ...others }, { extra: { axios } }) => {
    const res = axios.put(
      `/users/${id}`,
      {
        ...others,
      },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );

    return res;
  }
);

export const handleSingleFileUpload = createAsyncThunk(
  '@@auth/uploadSingle',
  (data, { extra: { axios } }) => {
    axios.post('/upload/single', data);
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSignIn.fulfilled, (state, action) => {
        state.status = 'received';
        state.user = action.payload.data;
      })
      .addCase(handleSignIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(handleSignIn.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(handleUserUpdate.fulfilled, (state, action) => {
        state.status = 'received';
        state.user = {
          accessToken: state.user.accessToken,
          ...action.payload.data,
        };
      })
      .addCase(handleUserUpdate.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(handleUserUpdate.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      });
  },
});

export const { removeUser } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
