import { baseApi } from '@/shared/api/baseApi';
import { RequestCreateRow, ResponseCreateRow } from '../model/types';
import { rowApi } from '@/entities/row/api/rowApi';
import { updateNestedArray } from '@/entities/row/lib/rows';

export const createRowApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRow: build.mutation<ResponseCreateRow, RequestCreateRow>({
      query: ({ entityId, ...patch }) => {
        return {
          url: `/v1/outlay-rows/entity/${entityId}/row/create`,
          method: 'POST',
          body: patch,
        };
      },
      async onQueryStarted({ entityId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRow } = await queryFulfilled;

          dispatch(
            rowApi.util.updateQueryData('getList', entityId, (rowList) => {
              if (rowList.length === 0) {
                rowList.push({ ...updatedRow.current, child: [] });
              }

              const updatedArray = updateNestedArray(
                rowList,
                updatedRow.changed,
                updatedRow.current,
                true
              );

              return updatedArray;
            })
          );
        } catch {
          console.log('error');
        }
      },
    }),
  }),
});

export const { useCreateRowMutation } = createRowApi;
