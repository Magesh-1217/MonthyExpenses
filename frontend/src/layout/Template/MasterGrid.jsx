
// import { AgGridReact } from 'ag-grid-react'

// import {
//   ModuleRegistry,
//   ClientSideRowModelModule,
//   PaginationModule,
//   TextFilterModule,
//   NumberFilterModule,
//   ValidationModule,
//   RowSelectionModule,
// } from 'ag-grid-community'

// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-quartz.css'

// // Register ALL required AG Grid modules (fixes error #200 & #239)
// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   PaginationModule,
//   TextFilterModule,
//   NumberFilterModule,
//   ValidationModule,
//   RowSelectionModule,
// ])

// const baseColDef = {
//   filter: 'agTextColumnFilter',
//   floatingFilter: true,
//   editable: false,
//   sortable: true,
//   resizable: true,
// }

// const gridStyle = `
//   .ag-theme-quartz {
//     --ag-background-color: #ffffff;
//     --ag-foreground-color: #1a1a2e;
//     --ag-border-color: #dcdcdc;
//     --ag-row-border-color: #e8ecf0;
//     --ag-odd-row-background-color: #f8fafc;
//     --ag-header-background-color: #0B3A53;
//     --ag-header-foreground-color: #ffffff;
//     --ag-font-size: 14px;
//     --ag-row-height: 45px;
//     border-radius: 10px;
//     overflow: hidden;
//     border: 1px solid #dcdcdc;
//   }

//   .ag-theme-quartz .ag-header-cell-label {
//     font-weight: 600 !important;
//     font-size: 13px;
//     letter-spacing: 0.3px;
    
//   }

//   .ag-theme-quartz .ag-header-cell {
//     border-right: 1px solid rgba(255,255,255,0.15) !important;
//     background-color: #065885 !important;
   
//   }

//   .ag-theme-quartz .ag-floating-filter {
//     background-color: #f0f4f8 !important;
//     border-bottom: 1px solid #ddd;
//   }

//   .ag-theme-quartz .ag-floating-filter-input {
//     border-radius: 4px;
//   }

//   .ag-theme-quartz .ag-row {
//     border-bottom: 1px solid #e8ecf0 !important;
//     transition: background-color 0.15s ease;
//   }

//   .ag-theme-quartz .ag-row-hover {
//     background-color: #bdd8fa !important;
//   }

//   .ag-theme-quartz .ag-cell {
//     display: flex;
//     align-items: center;
//     border-right: 1px solid #f0f0f0;
//     padding-left: 12px;
//   }

//   .ag-theme-quartz .ag-paging-panel {
//     height: 48px !important;
//     min-height: 48px !important;
//     background: #f8fafc;
//     border-top: 1px solid #e0e0e0;
//     padding: 0 16px;
//     font-size: 13px;
//   }

//   .ag-theme-quartz ::-webkit-scrollbar {
//     width: 6px;
//     height: 6px;
//   }

//   .ag-theme-quartz ::-webkit-scrollbar-thumb {
//     background: #b0b0b0;
//     border-radius: 6px;
//   }

//   .ag-theme-quartz ::-webkit-scrollbar-track {
//     background: #f1f1f1;
//   }
// `

// const MasterGrid = ({
//   gridRef,
//   columns,
//   rowData = [],
//   // FIX: rowSelection now uses object format (v32.2+), not string
//   rowSelection = { mode: 'singleRow', enableClickSelection: true },
//   pagination = true,
//   pageSize = 10,
//   pageSizeOptions = [10, 25, 50, 100],
//   height = 500,
//   onRowClick,
//   onRowDoubleClick,
//   onCellValueChanged,
// }) => {
//   return (
//     <>
//       <style>{gridStyle}</style>

//       <div
//         className="ag-theme-quartz"
//         style={{
//           height: `${height}px`,
//           width: '100%',
//         }}
//       >
//         <AgGridReact
//           ref={gridRef}
//           rowData={rowData}
//           columnDefs={columns}
//           defaultColDef={baseColDef}
//           // FIX: object format required in v32.2+ (fixes deprecation warning)
//           rowSelection={rowSelection}
//           pagination={pagination}
//           paginationPageSize={pageSize}
//           paginationPageSizeSelector={pageSizeOptions}
//           rowHeight={45}
//           headerHeight={50}
//           floatingFiltersHeight={42}
//           animateRows={true}
//           domLayout="normal"
//           // FIX: removed deprecated suppressRowClickSelection
//           onRowClicked={(e) => onRowClick?.(e.data)}
//           onRowDoubleClicked={(e) => onRowDoubleClick?.(e.data)}
//           onCellValueChanged={onCellValueChanged}
//         />
//       </div>
//     </>
//   )
// }

// export default MasterGrid
import { AgGridReact } from 'ag-grid-react'

import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
  RowSelectionModule,
} from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  ValidationModule,
  RowSelectionModule,
])

const baseColDef = {
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  editable: false,
  sortable: true,
  resizable: true,
}

const gridStyle = `
  .ag-theme-quartz {
    --ag-background-color: #ffffff;
    --ag-foreground-color: #1e293b;
    --ag-border-color: #e2e8f0;
    --ag-row-border-color: #f1f5f9;
    --ag-odd-row-background-color: #f8faff;
    --ag-font-size: 13.5px;
    --ag-row-height: 46px;
    border-radius: 12px;
    overflow: hidden;
    border: 1.5px solid #e2e8f0;
    box-shadow: 0 4px 24px rgba(99,102,241,0.07);
  }

  /* ── Gradient header — kept from your last version ── */
  .ag-theme-quartz .ag-header {
    background: linear-gradient(90deg, #065885 0%, #0ea5e9 100%) !important;
    border-bottom: 2px solid #0369a1 !important;
  }

  .ag-theme-quartz .ag-header-cell {
    background: transparent !important;
    border-right: 1px solid rgba(255,255,255,0.18) !important;
  }

  .ag-theme-quartz .ag-header-cell-label {
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 13px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .ag-theme-quartz .ag-sort-indicator-icon {
    color: #bae6fd !important;
  }

  /* Floating filter row */
  .ag-theme-quartz .ag-floating-filter {
    background-color: #f0f7ff !important;
    border-bottom: 1.5px solid #bae6fd !important;
  }

  .ag-theme-quartz .ag-floating-filter-input input {
    border: 1px solid #bfdbfe;
    border-radius: 5px;
    font-size: 12.5px;
    padding: 2px 6px;
    background: #fff;
    color: #1e293b;
  }

  .ag-theme-quartz .ag-floating-filter-input input:focus {
    border-color: #6366f1;
    outline: none;
    box-shadow: 0 0 0 2px rgba(99,102,241,0.15);
  }

  /* Rows */
  .ag-theme-quartz .ag-row {
    border-bottom: 1px solid #f1f5f9 !important;
    transition: background-color 0.13s ease;
  }

  .ag-theme-quartz .ag-row-hover {
    background-color: #eff6ff !important;
  }

  .ag-theme-quartz .ag-row-selected {
    background-color: #e0e7ff !important;
  }

  /* Cells */
  .ag-theme-quartz .ag-cell {
    display: flex;
    align-items: center;
    border-right: 1px solid #f1f5f9;
    padding-left: 14px;
    color: #334155;
  }

  /* Pagination */
  .ag-theme-quartz .ag-paging-panel {
    height: 50px !important;
    min-height: 50px !important;
    background: linear-gradient(90deg, #f8faff 0%, #f0f7ff 100%);
    border-top: 1.5px solid #e2e8f0;
    padding: 0 18px;
    font-size: 13px;
    color: #475569;
  }

  .ag-theme-quartz .ag-paging-button {
    color: #6366f1;
  }

  /* Scrollbar */
  .ag-theme-quartz ::-webkit-scrollbar { width: 6px; height: 6px; }
  .ag-theme-quartz ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }
  .ag-theme-quartz ::-webkit-scrollbar-track { background: #f8fafc; }
`

const MasterGrid = ({
  gridRef,
  columns,
  rowData = [],
  rowSelection = { mode: 'singleRow', enableClickSelection: true },
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  height = 500,
  onRowClick,
  onRowDoubleClick,
  onCellValueChanged,
}) => {
  return (
    <>
      <style>{gridStyle}</style>
      <div className="ag-theme-quartz" style={{ height: `${height}px`, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={baseColDef}
          rowSelection={rowSelection}
          pagination={pagination}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={pageSizeOptions}
          rowHeight={46}
          headerHeight={50}
          floatingFiltersHeight={42}
          animateRows={true}
          domLayout="normal"
          onRowClicked={(e) => onRowClick?.(e.data)}
          onRowDoubleClicked={(e) => onRowDoubleClick?.(e.data)}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </>
  )
}

export default MasterGrid
