import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from './shopping-cart/cartSlice';
import cartUiSlice from './shopping-cart/cartUISlice';
import productsSlice from './Products/Products'
import authSlice from './Auth/Auth';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  cartUI: cartUiSlice.reducer,
  products: productsSlice.reducer,
  auth: authSlice.reducer
})


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export {store,persistor};
