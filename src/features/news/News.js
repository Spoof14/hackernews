import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchNewsAsync,
  selectNews,
} from './redux/newsSlice';
import styles from './News.module.scss';
import NewsHeader from './NewsHeader';
import { PostListItem } from './PostListItem';
import { Modal } from '../../components/modal/Modal';
import { Post } from './Post';

// Function component containing most of the logic for the app. I should've put the search functionality of the NewsHeader here as well.
export function News() {
  const [page, setPage] = useState(0)
  const [selectedPost, setSelectedPost] = useState(null)
  const [news, fetchNewsPending] = useSelector(selectNews);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(news.length === 0 && !fetchNewsPending) dispatch(fetchNewsAsync())
  }, [dispatch, fetchNewsPending, news])

  
  const onClick = () => {
    dispatch(fetchNewsAsync(page + 1));
    setPage(page + 1);
  }

  const onSearch = (search) => {
    dispatch(fetchNewsAsync(0, search))
    setPage(0)
  }

  return (
    <div style={{maxHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <NewsHeader search={onSearch} />
      <div style={{height:'80%', overflow: 'auto'}}>
        {news.map(
          (post) =>
            post.title && (
              <PostListItem
                post={post}
                selectPost={setSelectedPost}
              ></PostListItem>
            )
        )}
      </div>

      <div className={styles.row}>
        <button className={styles.button} disabled={fetchNewsPending} onClick={onClick}>
          More
        </button>
      </div>

      {selectedPost && (
        <Modal dismiss={() => setSelectedPost(null)}>
          <Post selectedPost={selectedPost} />
        </Modal>
      )}
    </div>
  );
}










