import {createSlice} from '@reduxjs/toolkit';

const burgerSlice = createSlice({
	name: 'burger',
	initialState: {
		isMenuOpen: false,
	},
	reducers: {
		toggleMenuOpen(state) {
			state.isMenuOpen = !state.isMenuOpen;
		}
	}
});

export const {toggleMenuOpen} = burgerSlice.actions;
export default burgerSlice.reducer;