import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
	name: 'search',
	initialState: {
		search: sessionStorage.getItem('search') ?
			JSON.parse(sessionStorage.getItem('search') || '') :
			'',
	},
	reducers: {
		setSearch(state, action) {
			sessionStorage.setItem('search', JSON.stringify(action.payload.search));
			state.search = action.payload.search;
		}
	}
});

export const {setSearch} = searchSlice.actions;
export default searchSlice.reducer;