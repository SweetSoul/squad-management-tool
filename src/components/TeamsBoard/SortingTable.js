import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styles from '../../styles/TeamsBoard/SortingTable.module.css'
import TablePaginationActions from '../../utils/Pagination'
import { useSortableData } from '../../utils/TableSorting'
import { removeTeam } from '../../features/teamStore/teamStoreSlice'


export default function SortingTable({ teams }) {
    const { items, requestSort, sortConfig } = useSortableData(teams)
    const [page, setPage] = useState(0);
    let history = useHistory();
    const dispatch = useDispatch()

    const getClassNames = (name) => {
        if(sortConfig === null) {
            return
        } else if(sortConfig.direction === 'ascending' && sortConfig.key === name){
            return styles.ascending
        } else if(sortConfig.direction === 'descending' && sortConfig.key === name) {
            return styles.descending
        }
        if(sortConfig.key !== name){
            return ''
        }
        return;
    }

    function onClickEdit(id){
        history.push(`/team/${id}`)
    }
    function onClickDelete(id){
        dispatch(removeTeam({team_id: id}))
    }
    function onClickShare(name){
        alert(`Shared ${name}`)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr>
                    <th>
                        <button
                            className={getClassNames('name')}
                            onClick={() => requestSort('name')}
                        >
                            Name
                            <div>
                                <svg viewBox="1.562 212.104 496.902 248.451"><path d="M 1.562 460.555 L 250.013 212.104 L 498.464 460.555 Z"/></svg>
                                <svg viewBox="24.973 172.116 454.334 227.166"><path d="M 24.973 172.116 L 252.14 399.282 L 479.307 172.116 Z"/></svg>
                            </div>
                        </button>
                    </th>
                    <th>
                        <button
                            className={getClassNames('description')}
                            onClick={() => requestSort('description')}
                        >
                            Description
                            <div>
                                <svg viewBox="1.562 212.104 496.902 248.451"><path d="M 1.562 460.555 L 250.013 212.104 L 498.464 460.555 Z"/></svg>
                                <svg viewBox="24.973 172.116 454.334 227.166"><path d="M 24.973 172.116 L 252.14 399.282 L 479.307 172.116 Z"/></svg>
                            </div>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody className={styles.tableBody}>
                {items.slice(page * 10, page * 10 + 10).map(team => (
                    <tr key={team.team_id} className={styles.dataRow}>
                        <td>{team.name}</td>
                        <td>
                            <div className={styles.descContainer}>
                                {team.description}
                                <div className={styles.btnList}>
                                    <div data-popover>
                                        <button className={styles.delete} onClick={() => onClickDelete(team.team_id)}>
                                            <svg viewBox='0 0 24 24' fill='#B13D7C'>
                                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                            </svg>
                                        </button>
                                        <div>
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                    <div data-popover>
                                        <button className={styles.share} onClick={() => onClickShare(team.name)}>
                                            <svg viewBox='0 0 24 24' fill='#B13D7C'>
                                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
                                            </svg>
                                        </button>
                                        <div>
                                            <p>Share</p>
                                        </div>
                                    </div>
                                    <div data-popover>
                                        <button className={styles.edit} onClick={() => onClickEdit(team.team_id)}>
                                            <svg viewBox='0 0 24 24' fill='#B13D7C'>
                                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                            </svg>
                                        </button>
                                        <div>
                                            <p>Edit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td>
                        <div className={styles.footerContainer}>
                            <TablePaginationActions 
                            count={items.length}
                            rowsPerPage={10}
                            page={page}
                            onChangePage={handleChangePage}
                            />
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table >
    )
}