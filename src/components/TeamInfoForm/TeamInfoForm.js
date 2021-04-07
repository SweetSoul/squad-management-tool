import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styles from '../../styles/TeamInfoForm/TeamInfoForm.module.css'

import ConfirmModal from './ConfirmModal'
import TeamInformationSection from './TeamInformationSection'
import ConfigureSquadSection from './ConfigureSquadSection'
import { useDispatch } from 'react-redux'
import { addTeam, fetchTeams, updateTeam } from '../../features/teamStore/teamStoreSlice'
import { updatePlayer } from '../../features/playerStore/playerStoreSlice'


export default function TeamInfo({ id, teamStore, playerStore, teamStoreStatus, teamError }) {
    const [tags, setTags] = useState([]);
    const [teamName, setTeamName] = useState('')
    const [teamWebsite, setTeamWebsite] = useState('')
    const [teamDescription, setTeamDescription] = useState('')
    const [teamType, setTeamType] = useState('')
    const [teamFormation, setTeamFormation] = useState('3-2-2-3')
    const [assignedPlayers, setAssignedPlayers] = useState({})
    const [unsaved, setUnsaved] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    let dispatch = useDispatch()
    let teamId = (id !== undefined) ? id : Math.floor(Math.random() * (999999 - 600)) + 600
    let history = useHistory()


    const currentTeam = (teamStore.length > 0) ? teamStore.find(team => team.team_id.toString() === teamId.toString()) : null

    function handleToDashboard() {
        if (unsaved) {
            setModalShow(true)
            return
        }
        return history.push('/')
    }

    function handleSave() {
        if(teamType === ''){
            document.getElementById('realOp').focus()
            return document.getElementById('radioContainer').classList.add('invalidRadio')
        }
        if (teamName !== '' && teamWebsite !== '' && teamType !== '') {
            let expression = /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/gi;
            let regex = new RegExp(expression);
            if(!teamWebsite.match(regex)){
                return document.getElementById('teamWebsiteInput').focus()
            }
            if (currentTeam !== null && currentTeam !== undefined) {
                dispatch(updateTeam({
                    team_id: teamId,
                    name: teamName,
                    website: teamWebsite,
                    description: teamDescription,
                    type: teamType,
                    tags: tags,
                    formation: teamFormation,
                    assignedPlayers: assignedPlayers[teamId]
                }))
            } else {
                dispatch(addTeam({
                    team_id: teamId,
                    name: teamName,
                    website: teamWebsite,
                    description: teamDescription,
                    type: teamType,
                    tags: tags,
                    formation: teamFormation,
                    assignedPlayers: assignedPlayers[teamId]
                }))
            }
            if(Object.keys(assignedPlayers).length > 0){
                Object.entries(assignedPlayers[teamId]).map((e) => {
                    return dispatch(updatePlayer({
                        player_id: e[1],
                        team_id: teamId
                    }))
                })
            }
            setUnsaved(false)
            return history.push('/')
        }
    }

    useEffect(() => {
        if (teamStore.length < 1 && teamStoreStatus === 'idle') {
            dispatch(fetchTeams())
        }
        if (teamStoreStatus === 'failed') {
            console.log(teamError)
        }
    }, [teamStore, teamStoreStatus, dispatch, teamError])

    useEffect(() => {
        if (currentTeam !== null && currentTeam !== undefined) {
            setTeamName(currentTeam.name)
            setTeamDescription(currentTeam.description)
            setTeamWebsite(currentTeam.team_website)
            setTeamType(currentTeam.type)
            setTeamFormation(currentTeam.formation)
            setTags(currentTeam.tags)
            if(currentTeam.assignedPlayers !== undefined && currentTeam.assignedPlayers !== null){
                setAssignedPlayers(currentTeam.assignedPlayers)
            }
        }
    }, [currentTeam])

    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.cardTitle} >
                    <h2>{(id === undefined) ? 'Create your team' : 'Edit team'}</h2>
                    <button className={styles.backBtn} onClick={handleToDashboard}>
                        <svg viewBox="287.784 153.168 122.208 102.297" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 409.992 197.68 L 313.189 197.68 L 348.317 162.552 L 338.933 153.168 L 287.784 204.316 L 338.933 255.465 L 348.317 246.081 L 313.189 210.953 L 409.992 210.953 Z" />
                        </svg>
                                Back to Dashboard
                            </button>
                </div>
                <hr />
                <TeamInformationSection
                    teamName={teamName}
                    setTeamName={setTeamName}
                    teamDescription={teamDescription}
                    setTeamDescription={setTeamDescription}
                    teamWebsite={teamWebsite}
                    setTeamWebsite={setTeamWebsite}
                    setUnsaved={setUnsaved}
                    teamType={teamType}
                    setTeamType={setTeamType}
                    tags={tags}
                    setTags={setTags}
                />

                <ConfigureSquadSection
                    playerStore={playerStore}
                    teamFormation={teamFormation}
                    setTeamFormation={setTeamFormation}
                    setAssignedPlayers={setAssignedPlayers}
                    teamId={teamId}
                    assignedPlayers={assignedPlayers}
                    setUnsaved={setUnsaved}
                    teamName={teamName}
                    id={id}
                />
                <div className={styles.saveContainer}>
                    <button className={styles.saveBtn} onClick={handleSave} disabled={!unsaved}>Save</button>
                </div>
            </div>

            <ConfirmModal modalShow={modalShow} setModalShow={setModalShow} history={history} />
        </div>
    )
}