import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UserDto } from "../../app/models/UserDto";
import agent from "../../app/http/agent";
import { LoginDto } from "../../app/models/LoginDto";
import { toast } from "react-toastify";
import { history } from "../..";
import { RegisterDto } from "../../app/models/RegisterDto";

interface AccountState {
    userDto: UserDto | null
}

const initialState: AccountState = {
    userDto: null
}
export const signInUser = createAsyncThunk<UserDto, LoginDto>(
    'account/signInUser',
    async (loginDto, thunkApi) => {
        try {
            const userDto = await agent.Account.login(loginDto);
            localStorage.setItem('user', JSON.stringify(userDto));
            return userDto;
        } catch (error: any) {
            toast.error(error.data)
            thunkApi.rejectWithValue({ error: error.data })

        }
    }
)


export const signUpIser = createAsyncThunk<UserDto, RegisterDto>(
    'account/signup',
    async (registerDto, thunkApi) => {
        try {
            const userDto = await agent.Account.register(registerDto);
            localStorage.setItem('user', JSON.stringify(userDto));
            return userDto;
        } catch (error: any) {
            toast.error(error.data);
            thunkApi.rejectWithValue({ error: error.data })
        }
    }

)


export const getCurrentUser = createAsyncThunk<UserDto>(
    'account/getUser',
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(localStorage.getItem('user')))
        console.log(localStorage.getItem('user'))

        try {
            console.log('going to fecth user from api');
            const userDto = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(userDto));
            return userDto;
        }
        catch (error: any) {
            thunkApi.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if (localStorage.getItem('user'))
                return false
        }
    }
)


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logout: (state) => {
            state.userDto = null
            localStorage.removeItem('user');
            history.push('/');
        },
        setUser: (state, action) => {

            state.userDto = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled, getCurrentUser.fulfilled), (state, action) => {
            state.userDto = action.payload
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, getCurrentUser.rejected), (state, action) => {
            toast.error('errorrrrrrrrrrr')
        })

    })
})

export const { logout, setUser } = accountSlice.actions;