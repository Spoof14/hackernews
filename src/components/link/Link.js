import React from 'react'
import styles from './Link.module.scss';

// simple reusable link
export function Link({url, children}){
    return (
      <a href={url} className={styles.link}>
        {children}
      </a>
    );
  }