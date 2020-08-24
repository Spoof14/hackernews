import React from 'react';
import { PostHeader } from './PostHeader';
import styles from './News.module.scss';

// Function component for rendering a single list item in News
export function PostListItem({post, selectPost}){
    const onClick = () => {
      selectPost(post)
    }
    return (
      <div key={post.objectID} className={styles.article} onClick={onClick}>
        <PostHeader
          created_at={post.created_at}
          title={post.title}
          num_comments={post.num_comments}
          author={post.author}
          url={post.url}
        />
        {/* I wouldn't recommend using dangerouslySetInnerHTML, especially not when you are not in control of the content */}
        <p
          dangerouslySetInnerHTML={{
            __html:
              post.story_text?.length > 503
                ? post.story_text.slice(0, 500) + "..."
                : post.text,
          }}
        ></p>
      </div>
    );
  }