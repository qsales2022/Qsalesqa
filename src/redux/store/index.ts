import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import SQLiteStorage from 'redux-persist-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';
const sqliteConfig = {
  name: 'Qsales-DB',
};
const storeEngine = SQLiteStorage(SQLite, sqliteConfig);
const persistConfig = {
  key: 'root',
  storage: storeEngine,
  blacklist: ['globalReducer'],
};
const middleware = [];
if (__DEV__) {
  middleware.push(createLogger());
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
