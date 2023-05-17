import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import rightSidebarReducer from '../features/rightSidebarSlice';
import leftSidebarReducer from '../features/leftSidebarSlice';
import sessionReducer from '../features/sessionSlice';
import messagesReducer from '../features/messagesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    rightSidebar: rightSidebarReducer,
    leftSidebar: leftSidebarReducer,
    session: sessionReducer,
    messages: messagesReducer
  },
});