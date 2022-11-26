import {createSlice} from '@reduxjs/toolkit';
import {getLocalstorageItem, setLocalstorageItem} from '../../../storage/utils';

interface IInitialState {
	favourites: number[];
}

const initialState: IInitialState = {
	favourites: localStorage.getItem('favourites') ?
		getLocalstorageItem('favourites') :
		[]
};

const favouritesSlice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		setFavourites(state, action) {
			setLocalstorageItem('favourites', action.payload.favourites);
			state.favourites = action.payload.favourites;
		}
	}
});

export const {setFavourites} = favouritesSlice.actions;
export default favouritesSlice.reducer;