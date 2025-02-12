import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/redux/newsSlice';

export default configureStore({
  reducer: {
    news: newsReducer,
  },
});
