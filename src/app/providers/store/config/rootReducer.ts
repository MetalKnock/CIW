import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { entitySlice } from '@/entities/entity';

export const rootReducer = combineReducers({
  [entitySlice.name]: entitySlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
