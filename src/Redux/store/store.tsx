import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import  rootReducer  from "../rootReducer/rootReducer.tsx";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;