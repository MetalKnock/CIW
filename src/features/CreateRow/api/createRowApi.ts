import { baseApi } from '@/shared/api/baseApi';
import { RequestCreateRow, ResponseCreateRow } from '../model/types';
import { rowApi } from '@/entities/row/api/rowApi';
import {
  updateNestedRowsWithUpdateData,
  updateNestedRowsWithCurrentData,
  filterNestedRowById,
} from '@/entities/row/lib/rows';
import { handleError } from '@/shared/lib/error';
import { INIT_ROW } from '@/shared/constants/row';

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
                return [{ ...updatedRow.current, child: [] }];
              }

              const updatedArray = updateNestedRowsWithUpdateData(rowList, updatedRow.changed);
              const resultArray = updateNestedRowsWithCurrentData(
                updatedArray,
                updatedRow.current,
                true
              );

              return resultArray;
            })
          );
        } catch (error) {
          dispatch(
            rowApi.util.updateQueryData('getList', entityId, (rowList) => {
              return filterNestedRowById(rowList, INIT_ROW.id);
            })
          );
          handleError(error, 'Ошибка создания строки');
        }
      },
    }),
  }),
});

export const { useCreateRowMutation } = createRowApi;
