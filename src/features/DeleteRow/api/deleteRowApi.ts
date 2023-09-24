import { baseApi } from '@/shared/api/baseApi';
import { RequestDeleteRow, ResponseDeleteRow } from '../model/types';
import { rowApi } from '@/entities/row/api/rowApi';
import { filterNestedRowById, updateNestedRowsWithUpdateData } from '@/entities/row/lib/rows';
import { handleError } from '@/shared/lib/error';

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
              const updatedArray = updateNestedRowsWithUpdateData(rowList, updatedRow.changed);

              const filteredArray = filterNestedRowById(updatedArray, rowId);
              return filteredArray;
            })
          );
        } catch (error) {
          handleError(error, 'Ошибка удаления строки');
        }
      },
    }),
  }),
});

export const { useDeleteRowMutation } = deleteRowApi;
