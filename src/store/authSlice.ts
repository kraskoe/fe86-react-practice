import {createSlice} from '@reduxjs/toolkit';

// type User = {
// 	username: string,
// 	id: number,
// 	email: string,
// }

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		// user: null,
		user: {
			username: 'Artem Malkin',
			id: 0,
			email: 'a.malkin@gmail.com',
		},
	},
	reducers: {
		authUser(state, action) {
			state.user = action.payload.user;
		}
	}
})

export const {authUser} = authSlice.actions;
export default authSlice.reducer;