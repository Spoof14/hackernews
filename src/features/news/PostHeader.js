import React from 'react'
import { PostSubHead } from "./PostSubHead";
import { PostTitle } from "./PostTitle";
import styles from './News.module.scss';


export function PostHeader({title, author, num_comments, created_at, url}){
    return (
      <div className={styles.postHeader}>
        <PostTitle title={title} url={url}/>
        <div styles={styles.row}>
          <PostSubHead>Author: {author}</PostSubHead>
          <PostSubHead>Comments: {num_comments}</PostSubHead>
          <PostSubHead>Created: {new Date(created_at).toTimeString()}</PostSubHead>
        </div>
      </div>
    );
  }