import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './features/teamStore/teamStoreSlice'
import playersReducer from './features/playerStore/playerStoreSlice'


export default configureStore({
  reducer: {
    teams: teamsReducer,
    players: playersReducer,
  },
});
