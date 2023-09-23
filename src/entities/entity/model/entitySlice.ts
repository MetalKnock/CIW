import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_ID } from '@/shared/constants/api';

interface EntitySliceState {
  id: number;
}

const initialState: EntitySliceState = {
  id: ENTITY_ID,
};

export const entitySlice = createSlice({ name: 'entity', initialState, reducers: {} });
