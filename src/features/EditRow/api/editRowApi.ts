import { baseApi } from '@/shared/api/baseApi';
import { RequestEditRow, ResponseEditRow } from '../model/types';
import { rowApi } from '@/entities/row/api/rowApi';
import { findRowById } from '@/entities/row/lib/rows';

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
      async onQueryStarted({ entityId, id: rowId }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedRow } = await queryFulfilled;

          dispatch(
            rowApi.util.updateQueryData('getList', entityId, (rowList) => {
              const foundRow = findRowById(rowList, rowId);
              console.log(rowId);
              if (foundRow) {
                console.log(2);
                const {
                  id,
                  rowName,
                  equipmentCosts,
                  estimatedProfit,
                  machineOperatorSalary,
                  mainCosts,
                  materials,
                  mimExploitation,
                  overheads,
                  salary,
                  supportCosts,
                  total,
                } = updatedRow.current;
                Object.assign(foundRow, {
                  id,
                  rowName,
                  equipmentCosts,
                  estimatedProfit,
                  machineOperatorSalary,
                  mainCosts,
                  materials,
                  mimExploitation,
                  overheads,
                  salary,
                  supportCosts,
                  total,
                  // mb this error
                });
              }
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
