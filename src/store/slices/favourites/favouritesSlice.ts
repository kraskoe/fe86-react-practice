import {createSlice} from '@reduxjs/toolkit';

interface IInitialState {
	favourites: number[];
}

const initialState: IInitialState = {
	favourites: sessionStorage.getItem('favourites') ?
		JSON.parse(sessionStorage.getItem('favourites') || '') :
		[]
};

const favouritesSlice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		setFavourites(state, action) {
			sessionStorage.setItem('favourites', JSON.stringify(action.payload.favourites));
			state.favourites = action.payload.favourites;
		}
	}
});

export const {setFavourites} = favouritesSlice.actions;
export default favouritesSlice.reducer;