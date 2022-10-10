import { createSlice } from "@reduxjs/toolkit";
const initialState = { user: null };
const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        createUser: (state, action) => {

            state.user = action.payload;
        }
    }
})


export const { createUser } = userSlice.actions;
export default userSlice.reducer
