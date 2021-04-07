import React from 'react'
import styles from '../../styles/TeamInfoForm/Modal.module.css'


export default function ConfirmModal({modalShow, setModalShow, history}){
    return (
        <div className={(modalShow) ? `${styles.modalContainer} ${styles.showModalContainer}` : styles.modalContainer}>
            <div className={(modalShow) ? `${styles.modal} ${styles.showModal}` : styles.modal}>
                <div className={styles.modalBody}>
                    <div className={styles.imageCol}>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 286.054 286.054">
                            <title>Warning</title>
                            <desc>A red to orange warning sign with an exclamation surrounded by a circle</desc>
                            <path d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
                                    c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
                                    c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
                                    S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
                                    c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
                                    c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
                                    C160.878,195.732,152.878,187.723,143.036,187.723z"/>
                        </svg>
                    </div>
                    <div className={styles.textCol}>
                        <h2>Discard changes?</h2>
                        <p>There is unsaved changes, save it or everything will be lost.</p>
                    </div>
                </div>
                <hr />
                <div className={styles.modalFooter}>
                    <button className={styles.modalBtnAlt} onClick={() => {
                        setModalShow(false)
                        history.push('/')
                    }}>Discard changes</button>
                    <button className={styles.modalBtn} onClick={() => setModalShow(false)}>Continue editing</button>
                </div>
            </div>
        </div>
    )
}