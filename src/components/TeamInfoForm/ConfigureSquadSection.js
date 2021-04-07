import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPlayers } from '../../features/playerStore/playerStoreSlice'
import styles from '../../styles/TeamInfoForm/ConfigureSquadSection.module.css'
import stylePopover from '../../styles/TeamInfoForm/PopoverTeamForm.module.css'
import { createImageFromInitials } from '../../utils/ImageFromText'
import TablePaginationActions from '../../utils/Pagination'

export default function ConfigureSquadSection(props) {
    const { playerStore, playerStoreStatus, error, teamFormation, setUnsaved, id,
        setTeamFormation, setAssignedPlayers, teamId, assignedPlayers } = props
    const [searchPlayer, setSearchPlayer] = useState('')
    const [playerFilter, setPlayerFilter] = useState([])
    const [playerForm, setPlayerForm] = useState({ 'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'gk': 0 })
    const [page, setPage] = useState(0)
    let dispatch = useDispatch()

    const formationsOptions = ['3-2-2-3', '3-2-3-2', '3-4-3', '3-5-2', '4-2-3-1', '4-3-1-2', '4-3-3', '4-4-2', '4-5-1', '5-4-1']
    let filteredPlayerStore = playerStore.filter((f) => !playerFilter.includes(f.player_id.toString()))

    function dragHandler(e, id, avatar) {
        let img = new Image()
        img.src = avatar
        e.dataTransfer.setDragImage(img, 10, 10)
        e.dataTransfer.setData('text/plain', id)
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    function handleDrop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        setPlayerForm({ ...playerForm, [`${e.target.attributes.position.value}`]: parseInt(data) })
        setPlayerFilter([...playerFilter, data])
        setAssignedPlayers({ ...assignedPlayers, [teamId]: { ...assignedPlayers[teamId], [`${e.target.attributes.position.value}`]: parseInt(data) } })
        setUnsaved(true)

        if (playerFilter.includes(playerForm[`${e.target.attributes.position.value}`].toString())) {
            setPlayerFilter(playerFilter.filter((f) => f !== playerForm[`${e.target.attributes.position.value}`].toString()))
        }
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    };

    function handleFormationChange(form) {
        setTeamFormation(form.target.value)
        setPlayerForm({ 'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'gk': 0 })
        setPlayerFilter([])
        setUnsaved(true)
    }

    const clearPosition = (position) => {
        setPlayerFilter(playerFilter.filter((p) => p !== playerForm[`${position}`].toString()))
        setPlayerForm({ ...playerForm, [`${position}`]: 0 })
        setUnsaved(true)
    }

    const renderPlayerDiv = (position) => {
        let playerDiv;

        playerStore.filter((p) => p.player_id === playerForm[position]).map((sP) => {
            let imgSrc = "";
            return playerDiv = (
                <div data-popover className={stylePopover.popoverContainer}>
                    <img
                        src={imgSrc.length <= 0
                            ? createImageFromInitials(100, sP.name, '#aaa')
                            : imgSrc
                        }
                        alt={sP.name}
                        onClick={() => clearPosition(position)}
                        position={position}
                    />
                    <div>
                        <div>
                            <img src={sP.avatar} alt={sP.name} />
                        </div>
                        <div>
                            <h3>{sP.name}</h3>
                            <hr />
                            <h5>Age: <span>{sP.age}</span></h5>
                            <h5>Nationality: <span>{sP.nationality}</span></h5>
                        </div>
                    </div>
                    <div className={stylePopover.removePlayer}>
                        x
                    </div>
                </div>
            )
        })
        return playerDiv
    }

    function renderPlayerCard(p) {
        let playerCard = (
            <div
                key={p.player_id} className={styles.playerCard} draggable='true'
                onDragStart={(e) => dragHandler(e, p.player_id, p.avatar)}
            >
                <div>
                    <h4>Name: <span>{p.name}</span></h4>
                    <h4>Age: <span>{p.age}</span></h4>
                </div>
                <div>
                    <h4>Nationality: <span>{p.nationality}</span></h4>
                </div>
            </div>
        )

        return playerCard;

    }

    useEffect(() => {
        if (playerStoreStatus === 'idle' || (playerStoreStatus === undefined && playerStore.length < 1)) {
            dispatch(fetchPlayers())
        }
        if (playerStoreStatus === 'failed') {
            console.log(error)
        }
    }, [playerStore, playerStoreStatus, dispatch, error])

    const fetchAssigned = useCallback(() => {
        let tempAssign = { 'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'gk': 0 }
        let tempFilter = []



        Object.entries(assignedPlayers).map((e) => {
            tempFilter.push(e[1])
            return tempAssign = { ...tempAssign, [`${e[0]}`]: e[1] }
        })
        setPlayerFilter([...playerFilter, tempFilter])
        setPlayerForm(tempAssign)


    }, [assignedPlayers, playerFilter])


    useEffect(() => {

        if (id !== undefined && Object.values(assignedPlayers).reduce((a, b) => a + b, 0) > 0 && Object.values(playerForm).reduce((a, b) => a + b, 0) < 1) {
            fetchAssigned()
        }

    }, [id, assignedPlayers, playerForm, fetchAssigned])



    return (
        <section className={styles.secondSection}>
            <h3>Configure Squad</h3>
            <div className={styles.colsContainer}>

                {/* Field Column */}
                <div className={styles.col}>
                    <div className={styles.formationSelect}>
                        <h6 onClick={() => console.log(assignedPlayers)}>Formation</h6>
                        <select name='formation' onChange={handleFormationChange} value={teamFormation}>
                            {formationsOptions.map((form, index) => { return <option key={index}>{form}</option> })}
                        </select>
                    </div>
                    <div className={styles.fieldContainer} formation={teamFormation}>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='a'>
                                {(playerForm['a'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('a')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='b'>
                                {(playerForm['b'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('b')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='c'>
                                {(playerForm['c'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('c')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='d'>
                                {(playerForm['d'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('d')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='e'>
                                {(playerForm['e'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('e')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='f'>
                                {(playerForm['f'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('f')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='g'>
                                {(playerForm['g'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('g')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='h'>
                                {(playerForm['h'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('h')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='i'>
                                {(playerForm['i'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('i')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='j'>
                                {(playerForm['j'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('j')
                                }
                            </div>
                        </div>
                        <div className={styles.playerPosition} onDrop={handleDrop} onDragOver={handleDragOver}>
                            <div position='gk'>
                                {(playerForm['gk'] === 0)
                                    ? '+'
                                    : renderPlayerDiv('gk')
                                }
                            </div>
                        </div>
                    </div>
                </div>



                {/* Players column */}
                <div className={styles.col}>
                    <label className={styles.labelSearch}>
                        Search Players
                        <input type='text'
                            value={searchPlayer}
                            onChange={(e) => setSearchPlayer(e.target.value)}
                        />
                    </label>
                    <div className={styles.playerCardContainer}>

                        {(playerStore.length > 0)
                            ? (searchPlayer !== "" || searchPlayer !== null)
                                ? filteredPlayerStore.filter((f) => f.name.toLowerCase()
                                    .includes(searchPlayer.toLowerCase())).slice(page * 10, page * 10 + 10).map((p) => { return renderPlayerCard(p) })
                                : filteredPlayerStore.slice(page * 10, page * 10 + 10).map((p) => { return renderPlayerCard(p) })
                            : null}

                        {(filteredPlayerStore.length > 10)
                            ? <div className={styles.paginationContainer}>
                                <TablePaginationActions
                                    count={(searchPlayer === '') ? filteredPlayerStore.length
                                        : filteredPlayerStore.filter((f) => f.name.toLowerCase()
                                            .includes(searchPlayer.toLowerCase())).length
                                    }
                                    rowsPerPage={10}
                                    page={page}
                                    onChangePage={handleChangePage}
                                />
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}