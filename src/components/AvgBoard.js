import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { selectTeams } from '../features/teamStore/teamStoreSlice'
import styles from '../styles/AvgBoard.module.css'

export default function AvgBoard({ players }) {
    const [ordered, setOrdered] = useState(false)
    const [highFive, setHighFive] = useState(null)
    const [lowFive, setLowFive] = useState(null)
    const teamStore = useSelector(selectTeams)
    
    let history = useHistory()

    const currentTeam = (teamStore.length > 0) ? teamStore.find(team => team.team_id.toString() === '544') : null

    function renderAvgAge(order) {
        if (ordered === false) {
            return 
        }

        let renderHtml
        if (order === 'highest') {
            renderHtml = highFive.map((a) => {
                let teamName = teamStore.find((f) => f.team_id.toString() === a[0]).name
                return (<div key={a[0]} className={styles.avgListItem} onClick={() => editPage(a[0])}>
                    <h4>{teamName}</h4>
                    <h4>{a[1]}</h4>
                </div>)
            })
        } else if (order === 'lowest') {
            renderHtml = lowFive.map((a) => {
                let teamName = teamStore.find((f) => f.team_id.toString() === a[0]).name
                return (<div key={a[0]} className={styles.avgListItem} onClick={() => editPage(a[0])}>
                    <h4>{teamName}</h4>
                    <h4>{a[1]}</h4>
                </div>)
            })
        }

        return renderHtml
    }

    function editPage(id){
        history.push(`/team/${id}`)
    }


    const fetchList = useCallback(() => {
        let orderedAvgHigh = []
        let orderedAvgLow = []
        let sum = {}
        let count = {}
        let avg = {}
        if(players.length > 0){
            players.map((p) => {
                return p.team_id.map((tId) => {
                    sum = { ...sum, [`${tId}`]: (sum[`${tId}`]) ? sum[`${tId}`] + p.age : p.age }
                    return count = { ...count, [`${tId}`]: (count[`${tId}`]) ? count[`${tId}`] + 1 : 1 }
                })
            })
            Object.keys(sum).map((key) => {
                let roundedVal = Math.round(sum[`${key}`] / count[`${key}`])
                return avg = { ...avg, [`${key}`]: roundedVal }
            })
            orderedAvgHigh = Object.entries(avg).sort((a, b) => b[1] - a[1])
            orderedAvgLow = Object.entries(avg).sort((a, b) => a[1] - b[1])
            setHighFive(orderedAvgHigh.slice(0, 5))
            setLowFive(orderedAvgLow.slice(0, 5))
            setOrdered(true)
        }
    }, [players])

    useEffect(() => {
        if (ordered === false) {
            setTimeout(() => fetchList(), 100)
        }

    }, [fetchList, ordered])

    return (
        <div className={styles.avgCardContainer}>
            <div className={styles.titleContainer}>
                <h2 onClick={() => console.log(currentTeam)}>Top 5</h2>
                <hr />
            </div>
            <div className={styles.avgColContainer}>
                <div className={styles.avgCol}>
                    <h3>Highest avg age</h3>
                    <div className={styles.avgListContainer}>
                        {renderAvgAge('highest')}
                    </div>
                </div>
                <div className={styles.avgCol}>
                    <h3>Lowest avg age</h3>
                    <div className={styles.avgListContainer}>
                        {renderAvgAge('lowest')}
                    </div>
                </div>
            </div>
        </div>
    )
}