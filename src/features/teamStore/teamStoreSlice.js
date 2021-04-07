import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/requests";

const initialState = {
    teams: [],
    status: 'idle',
    error: null,
}

export const fetchTeams = createAsyncThunk('teamStore/fetchTeams', async () => {
    const response = await requestApi('teams')
    return response;
})

export const teamStoreSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        updateTeam: (state, action) => {
            const { team_id, name, website, description, type, tags, formation, assignedPlayers } = action.payload
            const existingTeam = state.teams.find(team => team.team_id.toString() === team_id.toString())
            if(existingTeam){
                existingTeam.name = (name === '' ) ? existingTeam.name : name;
                existingTeam.description = (description === '' ) ? existingTeam.description : description;
                existingTeam.website = (website === '' ) ? existingTeam.website : website;
                existingTeam.type = (type === '' ) ? existingTeam.type : type;
                existingTeam.tags = (tags.length < 1) ? existingTeam.tags : tags;
                existingTeam.formation = (formation === '' ) ? existingTeam.formation : formation;
                existingTeam.assignedPlayers = (Object.keys(assignedPlayers).length < 1) ? existingTeam.assignedPlayers : assignedPlayers;
            }
        },
        addTeam(state, action) {
            state.teams.push(action.payload)
        },
        removeTeam(state, action) {
            const { team_id } = action.payload
            const newTeamList = state.teams.filter((f) => f.team_id !== team_id)
            return {...state, teams: newTeamList}
        },
    },
    extraReducers: {
        [fetchTeams.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchTeams.fulfilled]: (state, action) => {
            state.status = 'succeded'
            state.teams = state.teams.concat(action.payload)
        },
        [fetchTeams.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
});



export const { updateTeam, addTeam, removeTeam } = teamStoreSlice.actions;




export const selectTeams = state => state.teams.teams;
export const selectStatus = state => state.teams.status;

export default teamStoreSlice.reducer;