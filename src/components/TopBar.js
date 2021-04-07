import React from 'react'
import styles from '../styles/TopBar.module.css'
import { createImageFromInitials } from '../utils/ImageFromText'

export default function TopBar() {
    let color = '#777777';
    let name = 'John Doe'
    let imgSrc = ''

    return (
        <div className={styles.container}>
            <div className={styles.leftCol}>
                <h1>Squad Management Tool</h1>
            </div>
            <div className={styles.rightCol}>
                <h5>John Doe</h5>
                <img
                    id='preview'
                    src={
                        (imgSrc <= 0)
                        ? createImageFromInitials(50, name, color)
                        : imgSrc
                    }
                    alt='John Doe'
                    className={styles.avatarPic}
                />
            </div>
        </div>
    )
}