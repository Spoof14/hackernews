import { createSlice } from '@reduxjs/toolkit';
import { httpGet } from '../../../api/api';

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    detailedNews: {},
    fetchNewsPending: false,
    fetchDetailedNewsPending: {},
    error: null
  },
  reducers: {
    fetchNewsSuccess: (state, action) => {
      console.log('fetchNewsSuccess', action)
      state.news = action.payload.replaceCurrentState ? action.payload.news : [...state.news, ...action.payload.news]
      state.fetchNewsPending = false
    },
    fetchNewsError: (state, action) => {
      state.fetchNewsPending = false
      state.error = action.error
    },
    fetchNewsPending: (state, action) => {
      console.log('fetchNewsPending')
      state.fetchNewsPending = true
    },

    fetchDetailedNewsSuccess: (state, action) => {
      console.log('fetchNewsSuccess', action)
      state.detailedNews[action.payload.id] = action.payload
      state.fetchDetailedNewsPending[action.payload.id] = false
    },
    fetchDetailedNewsError: (state, action) => {
      state.fetchDetailedNewsPending[action.payload.id] = false
      state.error = action.payload.error
    },
    fetchDetailedNewsPending: (state, action) => {
      console.log('fetchDetailedNews pending')
      state.fetchDetailedNewsPending[action.payload.id] = true
    }
  },
});
export const {
  fetchNewsSuccess,
  fetchNewsPending,
  fetchNewsError,
  fetchDetailedNewsSuccess,
  fetchDetailedNewsPending,
  fetchDetailedNewsError,
} = newsSlice.actions;

const url = 'https://hn.algolia.com/api/v1/' 
const hits = '&hitsPerPage='
const search = '&query='
const page = '?page='

// Method for articles matching the query and pageNum
export const fetchNewsAsync = (pageNum = 0, query) => async dispatch => {
  try {
    dispatch(fetchNewsPending())
    const replaceCurrentState = Boolean(pageNum === 0)
    let data = await httpGet(`${url}search${page + pageNum}${hits + '20'}${query ? search + query : ''}`);
    dispatch(fetchNewsSuccess({news: data.hits, replaceCurrentState}));
  } catch (error) {
    dispatch(fetchNewsError({error}))
  }
}

// Method for fetching comments etc from a article
export const fetchDetailedNews = (id) => async dispatch => {
  try {
    dispatch(fetchDetailedNewsPending(id))
    let data = await httpGet(`${url}items/${id}`);
    dispatch(fetchDetailedNewsSuccess(data));
  } catch (error) {
    dispatch(fetchDetailedNewsError({error, id}))
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNews = state => [state.news.news, state.news.fetchNewsPending];
export const selectDetailedNews = (state, postId) => [state.news.detailedNews?.[postId], state.news.fetchDetailedNewsPending?.[postId]];

export default newsSlice.reducer;
