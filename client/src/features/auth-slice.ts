import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Axios } from 'axios';
import { RootState } from '../store';
import { Movie } from '../types/movie';
import { Status } from '../types/status';
import { User } from '../types/user';

export const handleSignIn = createAsyncThunk<
    User,
    { email: string; password: string },
    { extra: { axios: Axios } }
>('@@auth/sign-in', async ({ email, password }, { extra: { axios } }) => {
    try {
        const res = await axios.post('/auth/login', {
            email: email,
            password: password,
        });

        return res.data;
    } catch (error) {
        throw new Error('Server error!');
    }
});

export const handleSignUp = createAsyncThunk<
    User,
    { username: string; email: string; password: string },
    { extra: { axios: Axios } }
>('@@auth/sign-up', async ({ username, email, password }, { extra: { axios } }) => {
    const res = await axios.post('/auth/register', {
        username: username,
        email: email,
        password: password,
    });

    return res.data;
});

export const handleUserUpdate = createAsyncThunk<
    User,
    { _id: string; accessToken: string },
    { extra: { axios: Axios } }
>('@@auth/update', async ({ _id, accessToken, ...others }, { extra: { axios } }) => {
    const res = await axios.put(
        `/users/update/${_id}`,
        {
            ...others,
        },
        {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        }
    );

    return res.data;
});

export const handleWatchlistAdd = createAsyncThunk<
    [Movie],
    { movieId: string; userId: string },
    { extra: { axios: Axios } }
>('@@auth/addToWatchlist', async ({ movieId, userId }, { extra: { axios } }) => {
    try {
        const res = await axios.put('/users/watchlist/add/' + userId, {
            id: movieId,
        });
        return res.data;
    } catch (error) {}
});

export const handleWatchlistDelete = createAsyncThunk<
    [Movie],
    { movieId: string; userId: string },
    { extra: { axios: Axios } }
>('@@auth/removeFromWatchlist', async ({ movieId, userId }, { extra: { axios } }) => {
    try {
        const res = await axios.delete('/users/watchlist/delete/' + userId, {
            data: {
                id: movieId,
            },
        });
        return res.data;
    } catch (error) {}
});

type AuthSlice = {
    status: Status;
    error: string | null;
    user: User | null;
};

const initialState: AuthSlice = {
    user: JSON.parse(localStorage.getItem('user') || '') || null,
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
                state.user = action.payload;
            })
            .addCase(handleUserUpdate.fulfilled, (state, action) => {
                state.status = 'received';
                state.user = {
                    ...action.payload,
                    accessToken: state.user!.accessToken,
                };
            })
            .addCase(handleWatchlistAdd.fulfilled, (state, action) => {
                state.status = 'received';
                if (state.user) state.user.watchlist = action.payload;
            })
            .addCase(handleWatchlistDelete.fulfilled, (state, action) => {
                state.status = 'received';
                if (state.user) state.user.watchlist = action.payload;
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

export const { removeUser } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: RootState) => state.auth.user;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

function isLoading(action: AnyAction) {
    return action.type.endsWith('pending');
}
