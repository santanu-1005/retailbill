
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   user: null,
   token: null, 
   userId: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            state.userId = user?.id || null
        },
        clearCredentials: (state) => {
            state.user = null
            state.token = null
            state.userId = null
        }
    }
});

export const {
    setCredentials,
    clearCredentials
} = authSlice.actions;

export default authSlice.reducer;

