import React from 'react'
import styles from './News.module.scss';

export function PostSubHead({children}){

    return <small className={styles.postSubHead}>{children}</small>
}