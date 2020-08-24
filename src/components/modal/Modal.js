import React from 'react'
import styles from './Modal.module.scss';

// Simple reuseable modal
export function Modal({ dismiss, children}){
    return (
      <div
        className={styles.modal}
        onClick={dismiss}
      >
        <div className={styles.modalContent}>{children}</div>
      </div>
    );
  }