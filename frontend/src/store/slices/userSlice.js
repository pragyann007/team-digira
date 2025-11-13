import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user', initialState: { profile: null, settings: {}, },
    reducers: {
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
        },
        updateSettings: (state, action) => {
            state.settings = { ...state.settings, ...action.payload };
        },
    },
});

export const { updateProfile, updateSettings } = userSlice.actions;
export default userSlice.reducer;
