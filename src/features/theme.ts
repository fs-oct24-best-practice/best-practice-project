import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../types/Theme';

type ThemeState = {
  theme: Theme;
};

const initialState: ThemeState = {
  theme: Theme.LIGHT,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme(state) {
      state.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
