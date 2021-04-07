import React, { useCallback, useEffect, useState } from 'react'
import styles from '../styles/PlayersHighlight.module.css'
import { createImageFromInitials, getRandomColor } from '../utils/ImageFromText'

export default function PlayersHighlight({ players }) {
    const [calculated, setCalculated] = useState(false)
    const [mapped, setMapped] = useState(false)
    const [mppIds, setMppIds] = useState([])
    const [lppIds, setLppIds] = useState([])
    const [totalPicks, setTotalPicks] = useState(null)
    const [mppPicks, setMppPicks] = useState(null)
    const [lppPicks, setLppPicks] = useState(null)

    const randomMpp = Math.floor(Math.random() * mppIds.length);
    const randomLpp = Math.floor(Math.random() * lppIds.length);

    let imgMppSrc = ''
    let imgLppSrc = ''

    const imgMpp = (players.length > 0 && mppIds.length > 0)
        ? (imgMppSrc.length <= 0)
            ? createImageFromInitials(200, players.find((f) => f.player_id === mppIds[randomMpp]).name, getRandomColor())
            : imgMppSrc
        : null

    const imgLpp = (players.length > 0 && lppIds.length > 0)
        ? (imgLppSrc.length <= 0)
            ? createImageFromInitials(200, players.find((f) => f.player_id === lppIds[randomLpp]).name, getRandomColor())
            : imgLppSrc
        : null

    const calculatePicks = useCallback(() => {
        let count
        let mppCount = 0
        let mppId = []
        let lppId = []
        let lppCount = 999999
        let totalCount = 0


        players.map((p) => {
            count = p.team_id.length
            if (count === mppCount) {
                mppId = [...mppId, p.player_id]
            }
            if (count === lppCount) {
                lppId = [...lppId, p.player_id]
            }
            if (count < lppCount) {
                lppCount = count
                lppId = [p.player_id]
            }
            if (count > mppCount) {
                mppCount = count
                mppId = [p.player_id]
            }
            if (totalCount === players.length - 1) {
                return setMapped(true)
            }
            return totalCount += 1
        })
        if (mapped === true) {
            setLppIds(lppId)
            setMppIds(mppId)
            setMppPicks(mppCount)
            setLppPicks(lppCount)
            setTotalPicks(totalCount)
            if (calculated === false) {
                setCalculated(true)
            }
        }
    }, [players, calculated, mapped])

    useEffect(() => {
        if (calculated === false) {
            return calculatePicks()
        }
        return
    }, [calculated, calculatePicks])

    return (
        <div className={styles.phCardContainer}>
            <div className={styles.phCol}>
                <div className={styles.phTitle}>
                    <h3>Most picked player</h3>
                </div>
                <div className={styles.phBordered}>
                    <div className={styles.phImgContainer1}>
                        <div className={styles.aniBorder}></div>
                        <img src={imgMpp} alt='Most picked player' />
                        <div className={styles.relativeData}>
                            <span>{`${Math.round(mppPicks * 100 / totalPicks)}%`}</span>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.phCol}>
                <div className={styles.phTitle}>
                    <h3>Less picked player</h3>
                </div>
                <div className={styles.phBordered}>
                    <div className={styles.phImgContainer2}>
                        <div className={styles.aniBorder}></div>
                        <img src={imgLpp} alt='Less picked player' />
                        <div className={styles.relativeData}>
                            <span>{`${Math.round(lppPicks * 100 / totalPicks)}%`}</span>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.middleCircleContainer}>
                <div className={styles.middleCircle}></div>
            </div>
        </div>
    )
}