import { baseApi } from '@/shared/api/baseApi';
import { RequestDeleteRow, ResponseDeleteRow } from '../model/types';
import { rowApi } from '@/entities/row/api/rowApi';
import { filterNestedArray, updateNestedArray } from '@/entities/row/lib/rows';

export const deleteRowApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteRow: build.mutation<ResponseDeleteRow, RequestDeleteRow>({
      query: ({ id: rowId, entityId }) => {
        return {
          url: `/v1/outlay-rows/entity/${entityId}/row/${rowId}/delete`,
          method: 'DELETE',
        };
      },
      async onQueryStarted({ entityId, id: rowId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRow } = await queryFulfilled;

          dispatch(
            rowApi.util.updateQueryData('getList', entityId, (rowList) => {
              const updatedArray = updateNestedArray(rowList, updatedRow.changed);
              const filteredArray = filterNestedArray(updatedArray, rowId);

              return filteredArray;
            })
          );
        } catch {
          console.log('error');
        }
      },
    }),
  }),
});

export const { useDeleteRowMutation } = deleteRowApi;
