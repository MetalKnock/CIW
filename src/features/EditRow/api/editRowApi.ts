import { baseApi } from '@/shared/api/baseApi';
import { RequestEditRow, ResponseEditRow } from '../model/types';
import { rowApi } from '@/entities/row/api/rowApi';
import {
  updateNestedRowsWithUpdateData,
  updateNestedRowsWithCurrentData,
} from '@/entities/row/lib/rows';
import { handleError } from '@/shared/lib/error';

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
              const updatedArray = updateNestedRowsWithUpdateData(rowList, updatedRow.changed);
              const resultArray = updateNestedRowsWithCurrentData(updatedArray, updatedRow.current);

              return resultArray;
            })
          );
        } catch (error) {
          handleError(error, 'Ошибка изменения строки');
        }
      },
    }),
  }),
});

export const { useEditRowMutation } = editRowApi;
