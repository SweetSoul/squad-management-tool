import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchTeams, selectTeams } from '../../features/teamStore/teamStoreSlice'
import styles from '../../styles/TeamsBoard/TeamsBoard.module.css'
import SortingTable from './SortingTable'

export default function TeamsBoard() { 
    const teamStore = useSelector(selectTeams)
    const teamStoreStatus = useSelector(state => state.teams.status)
    const error = useSelector(state => state.teams.error)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (teamStoreStatus === 'idle') {
            dispatch(fetchTeams())
        }
        if (teamStoreStatus === 'failed') {
            console.log(error)
        }
    }, [teamStoreStatus, dispatch, error])


    const handleClick = () => {
        history.push('/team')
    }


    return (
        <div className={styles.boardContainer}>
            <div className={styles.titleRow}>
                <h3>My Teams</h3>
                <button className={styles.addTeamBtn} onClick={handleClick}>+</button>
            </div>
            <hr />

            {(teamStore.length < 1)
                ? <div className={styles.loader}>Loading... </div>
                : <SortingTable teams={teamStore} />
            }

        </div>
    )
}