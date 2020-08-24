import React from 'react'
import { PostSubHead } from './PostSubHead'
import styles from './News.module.scss';

// could be expanded to recursively include children, but it required some logic that I didn't have time for
export function Comment({comment}){
    return <div className={styles.comment}>
      <PostSubHead >User: {comment.author}</PostSubHead>
      <p dangerouslySetInnerHTML={{__html: comment.text}} ></p>
      </div>
  }