
import { AgGridReact } from 'ag-grid-react'
import { useState } from 'react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

const baseColDef = {
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  editable: false,
  sortable: true,
  resizable: true,
  headerClass: 'bold-header',
}

const gridStyle = `
  /* Main Grid Container */
  .ag-theme-quartz {
    border-radius: 12px;
    overflow: hidden;
    --ag-background-color: #ffffff;
    --ag-foreground-color: #000000;
    --ag-border-color: #dcdcdc;
  }
  .ag-theme-quartz .ag-paging-panel {
    display: flex !important;
    height: 50px !important;
    min-height: 50px !important;
    align-items: center;
    justify-content: flex-end;
    background: #ffffff;
    border-top: 1px solid #ddd;
    padding: 8px 12px;
  }
  /* Header Section */
  .ag-theme-quartz .ag-header {
    background-color: #0B3A53 !important;
    border-bottom: 2px solid #072C40 !important;
  }

  .ag-theme-quartz .ag-header-cell {
    background-color: #0B3A53 !important;
    border-right: 1px solid rgba(255,255,255,0.15);
  }

  .ag-theme-quartz .ag-header-cell-label {
    color: #ffffff !important;
    font-weight: 600 !important;
    font-size: 14px;
  }

  /* Floating Filter */
  .ag-theme-quartz .ag-floating-filter {
    background-color: #ffffff !important;
    border-bottom: 1px solid #ddd;
  }

  /* Table Body */
  .ag-theme-quartz .ag-row {
    background-color: #ffffff !important;
    border-bottom: 1px solid #e5e5e5 !important;
    font-size: 14px;
  }

  /* Alternate Row Color */
  .ag-theme-quartz .ag-row:nth-child(even) {
    background-color: #f8fafc !important;
  }

  /* Hover Effect */
  .ag-theme-quartz .ag-row-hover {
    background-color: #eaf4ff !important;
  }

  /* Cell Styling */
  .ag-theme-quartz .ag-cell {
    display: flex;
    align-items: center;
    border-right: 1px solid #f0f0f0;
    padding-left: 10px;
  }

  /* Pagination Panel */
  .ag-theme-quartz .ag-paging-panel {
    background: #ffffff;
    border-top: 1px solid #ddd;
    padding: 8px;
  }

  /* Scrollbar */
  .ag-theme-quartz ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .ag-theme-quartz ::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border-radius: 10px;
  }
`

const MasterGrid = ({
  gridRef,
  columns,
  rowData = [],
  rowSelection = 'single',
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  height = 500,
  onRowClick,
  onRowDoubleClick,
  onCellValueChanged,
  suppressRowClickSelection = true,
}) => {
  const [statusFilter] = useState('All')

  const filteredData =
    statusFilter === 'All' ? rowData : rowData.filter((row) => row.status === statusFilter)

  return (
    <>
      <style>{gridStyle}</style>

      <div
        className="ag-theme-quartz"
        style={{
          height: `${height}px`,
          width: '100%',
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columns}
          defaultColDef={baseColDef}
          rowSelection={rowSelection}
          suppressRowClickSelection={suppressRowClickSelection}
          pagination={pagination}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={pageSizeOptions}
          rowHeight={45}
          headerHeight={50}
          floatingFiltersHeight={45}
          animateRows={true}
          domLayout="normal"
        />
      </div>
    </>
  )
}

export default MasterGrid
