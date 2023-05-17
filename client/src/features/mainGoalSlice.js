import { createSlice } from '@reduxjs/toolkit'

export const mainGoalSlice = createSlice({
  name: 'mainGoals',
  initialState: {
    value: [],
  },
  reducers: {
    addNewGoal: (state, action) => {
      console.log('Added new goal', state);
      state.value.push(action.payload);
    },
    setGoals: (state,action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNewGoal, setGoals } = mainGoalSlice.actions;

export default mainGoalSlice.reducer;