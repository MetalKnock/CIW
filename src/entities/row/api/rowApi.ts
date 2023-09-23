import { baseApi } from '@/shared/api/baseApi';
import { Rows } from '../model/rowTypes';

export const rowApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getList: build.query<Rows, number>({
      query: (entityId) => ({ url: `/v1/outlay-rows/entity/${entityId}/row/list` }),
    }),
  }),
});

export const { useGetListQuery } = rowApi;
