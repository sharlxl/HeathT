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

    ADD_ALLERGY: (state, action) => {
      state.data.allergies.push(action.payload.allergy); //this will push the new journal into the array of workjournal
    },

    ADD_CONDTION: (state, action) => {
      state.data.medical_conditions.push(action.payload.condition); //this will push the new journal into the array of workjournal
    },

    ADD_RECORD: (state, action) => {
      state.data.records.push(action.payload.record); //this will push the new journal into the array of workjournal
    },

    EDIT_ALLERGY(state, action) {
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

    EDIT_RECORD(state, action) {
      state.data.records[action.payload.index].description =
        action.payload.editValues.description;
      state.data.records[action.payload.index].trigger =
        action.payload.editValues.trigger;
      state.data.records[action.payload.index].pain_score =
        action.payload.editValues.pain_score;
    },

    DEL_ALLERGY: (state, action) => {
      state.data.allergies.splice(action.payload.index, 1);
    },
    DEL_CONDITION: (state, action) => {
      state.data.medical_conditions.splice(action.payload.index, 1);
    },
    DEL_RECORD: (state, action) => {
      state.data.records.splice(action.payload.index, 1);
    },
  },
});

export const {
  LOGIN,
  LOGOUT,
  ADD_ALLERGY,
  ADD_CONDTION,
  ADD_RECORD,
  EDIT_ALLERGY,
  EDIT_CONDITION,
  EDIT_RECORD,
  DEL_ALLERGY,
  DEL_CONDITION,
  DEL_RECORD,
} = userSlice.actions;
//exports the redux actions

export const selectUser = (state) => state.user.data;
//exports the states

export default userSlice.reducer;
//exports the reducer
