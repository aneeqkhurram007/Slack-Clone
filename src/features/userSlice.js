import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.user
        }
    }

})
export const { addUser } = userSlice.actions;
export const selectUser = state => state.user.user;
export default userSlice.reducer;