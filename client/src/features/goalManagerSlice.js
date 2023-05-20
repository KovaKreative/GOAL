import { LinkedList } from '../helpers/classes';

import { createSlice } from '@reduxjs/toolkit';

export const goalManagerSlice = createSlice({
  name: 'goalManager',
  initialState: {
    goalStructure: new LinkedList({ id: null, children: [] }),
    editing: null,
    newGoal: null
  },
  reducers: {
    setEditing: (state, action) => {
      return { ...state, editing: action.payload };
    },
    setNewGoal: (state, action) => {
      return { ...state, newGoal: action.payload };
    },
    modifyHeadData: (state, action) => {
      return { ...state, goalStructure: LinkedList.modifyHeadData(state.goalStructure, action.payload) };
    },
    removeHead: (state, action) => {
      return { ...state, goalStructure: LinkedList.removeHead(state.goalStructure) };
    },
    prepend: (state, action) => {
      return { ...state, goalStructure: LinkedList.prepend(state.goalStructure, action.payload) };
    },
    // reparentChild: (state, action) => {
    //   return {

    //   }
    // },
    resetGoalManager: (state, action) => {
      return {
        goalStructure: new LinkedList({ id: null, children: [] }),
        editing: null,
        newGoal: null
      };
    }
  },
});

// Action creators are generated for each case reducer function
export const { setEditing, setNewGoal, modifyHeadData, removeHead, prepend } = goalManagerSlice.actions;

export default goalManagerSlice.reducer;