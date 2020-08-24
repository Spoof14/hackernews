import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectDetailedNews, fetchDetailedNews } from './redux/newsSlice';
import { PostHeader } from './PostHeader';
import { Comment } from './Comment';


// Function component for rendering a post with comments
export function Post({selectedPost}){
  
    const dispatch = useDispatch();
    const [post, fetchPostPending] = useSelector(state => selectDetailedNews(state, selectedPost.objectID))
    useEffect(() => {
  
      if(!post) dispatch(fetchDetailedNews(selectedPost.objectID))
    }, [post, dispatch, selectedPost.objectID])
  
  
    if(!selectedPost) return <div>error</div>
    return (
      <div>
        <PostHeader
          title={selectedPost.title}
          author={selectedPost.author}
          num_comments={selectedPost.num_comments}
          created_at={selectedPost.created_at}
          url={selectedPost.url}
        />
        <div>
          {selectedPost.story_text && (
            <p dangerouslySetInnerHTML={{ __html: selectedPost.story_text }}></p>
          )}
          {!post || fetchPostPending ? <div>...Loading</div> : <div>{post.children.map(comment => <Comment comment={comment}/>) }</div>}
        </div>
      </div>
    );
  }