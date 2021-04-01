import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from '../features/teamStore/teamStoreSlice'


export default configureStore({
  reducer: {
    teams: teamsReducer,
  },
});
