import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const DataTable = ({ rows, columns }) => {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ border: '1px solid #ccc' }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

export default DataTable