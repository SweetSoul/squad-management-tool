import React from 'react'
import { useParams } from 'react-router'
import TeamInfo from '../components/TeamInfoForm/TeamInfoForm'
import TopBar from '../components/TopBar'
import styles from '../styles/TeamEditor.module.css'
import { useSelector } from 'react-redux'
import { selectTeams } from '../features/teamStore/teamStoreSlice'
import { selectPlayers } from '../features/playerStore/playerStoreSlice'


export default function TeamEditor() {
    let { id } = useParams()

    //Fetch Teams from redux store ->> Teams already in store
    const teamStore = useSelector(selectTeams)
    const teamStoreStatus = useSelector(state => state.teams.status)
    const teamError = useSelector(state => state.teams.error)

    //Fetch Players from redux store ->> Players already in store
    const playerStore = useSelector(selectPlayers)
    const playerStoreStatus = useSelector(state => state.players.status)
    const playerError = useSelector(state => state.players.error)

    return (
        <div className={styles.container}>
            <header>
                <TopBar />
            </header>
            <main>
                <TeamInfo id={id} teamStore={teamStore} playerStore={playerStore}
                    playerStoreStatus={playerStoreStatus}
                    error={playerError}
                    teamStoreStatus={teamStoreStatus}
                    teamError={teamError}
                />
            </main>
            <footer>
                <div className={styles.footer}>
                    <span>{new Date().getFullYear()} - All rights reserved</span>
                </div>
            </footer>
        </div>
    )
}