import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/requests";

const initialState = {
    players: [],
    status: 'idle',
    error: null,
}

export const fetchPlayers = createAsyncThunk('playerStore/fetchPlayers', async () => {
    const response = await requestApi('players')
    return response;
})

export const playerStoreSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        updatePlayer: (state, action) => {
            const { player_id, team_id } = action.payload
            const existingPlayer = state.players.find(player => player.player_id === player_id)
            if(existingPlayer){
                existingPlayer.team_id = (existingPlayer.team_id.includes(team_id)) ? existingPlayer.team_id : [...existingPlayer.team_id, parseInt(team_id)];
            }
        }
    },
    extraReducers: {
        [fetchPlayers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPlayers.fulfilled]: (state, action) => {
            state.status = 'succeded'
            state.players = state.players.concat(action.payload)
        },
        [fetchPlayers.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
});


export const { updatePlayer } = playerStoreSlice.actions


export const selectPlayers = state => state.players.players;

export default playerStoreSlice.reducer;