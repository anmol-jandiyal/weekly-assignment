import { createSlice } from "@reduxjs/toolkit";

const generalToolSlice = createSlice({
	name: "generalTool",

	initialState: {
		message: null,
	},
	reducers: {
		setMessage: (state, action) => {
			state.message = [action.payload.message];
		},
	},
});

export default generalToolSlice.reducer;
export const { setMessage } = generalToolSlice.actions;
