import React, { useEffect } from 'react'
import TopBar from '../components/TopBar'
import TeamsBoard from '../components/TeamsBoard/TeamsBoard'
import AvgBoard from '../components/AvgBoard'
import styles from '../styles/Dashboard.module.css'
import PlayersHighlight from '../components/PlayersHighlight'
import { fetchPlayers, selectPlayers } from '../features/playerStore/playerStoreSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
    //Fetch Players from redux store ->> First API call
    const playerStore = useSelector(selectPlayers)
    const playerStoreStatus = useSelector(state => state.players.status)
    const error = useSelector(state => state.players.error)
    const dispatch = useDispatch()

    useEffect(() => {
        if(playerStoreStatus === 'idle'){
            dispatch(fetchPlayers())
        }
        if(playerStoreStatus === 'failed'){
            console.log(error)
        }
    }, [playerStoreStatus, dispatch, error])

    return (
        <div className={styles.bodyContainer}>
            <header className={styles.header}>
                <TopBar />
            </header>
            <main>
                <div className={styles.panel}>
                    <TeamsBoard />
                    <div className={styles.rightCol}>
                        <AvgBoard players={playerStore}/>
                        <PlayersHighlight players={playerStore} />
                    </div>
                </div>
            </main>
            <footer>
                <div className={styles.footer}>
                    <span>{new Date().getFullYear()} - All rights reserved</span>
                </div>
            </footer>
        </div>
    )
}