import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    LOGIN(state, action) {
      state.data = action.payload;
    },
    LOGOUT(state) {
      state.data = "";
    },
    EDIT_ALLERGY(state, action) {
      console.log(action.payload.editValues.symptoms);
      state.data.allergies[action.payload.index].date =
        action.payload.editValues.date;
      state.data.allergies[action.payload.index].name =
        action.payload.editValues.name;
      state.data.allergies[action.payload.index].symptoms =
        action.payload.editValues.symptoms;
    },
    EDIT_CONDITION(state, action) {
      state.data.medical_conditions[action.payload.index].date_of_diagnosis =
        action.payload.editValues.date_of_diagnosis;
      state.data.medical_conditions[action.payload.index].condition =
        action.payload.editValues.condition;
    },
  },
});

export const { LOGIN, LOGOUT, EDIT_ALLERGY, EDIT_CONDITION } =
  userSlice.actions;
//exports the redux actions

export const selectUser = (state) => state.user.data;
//exports the states

export default userSlice.reducer;
//exports the reducer
