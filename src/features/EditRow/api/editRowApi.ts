import { baseApi } from '@/shared/api/baseApi';
import { RequestEditRow, ResponseEditRow } from '../model/types';
import { rowApi } from '@/entities/row/api/rowApi';
import { updateNestedArray } from '@/entities/row/lib/rows';

export const editRowApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    editRow: build.mutation<ResponseEditRow, RequestEditRow>({
      query: ({ id: rowId, entityId, ...patch }) => {
        return {
          url: `/v1/outlay-rows/entity/${entityId}/row/${rowId}/update`,
          method: 'POST',
          body: patch,
        };
      },
      async onQueryStarted({ entityId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRow } = await queryFulfilled;

          dispatch(
            rowApi.util.updateQueryData('getList', entityId, (rowList) => {
              const updatedArray = updateNestedArray(
                rowList,
                updatedRow.changed,
                updatedRow.current
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

export const { useEditRowMutation } = editRowApi;
