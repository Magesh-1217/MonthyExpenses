import React, { useRef, useState } from 'react'
import { getData } from './MonthChartDatas'
import MasterGrid from './MasterGrid'
import { CFormInput } from '@coreui/react'
import { CDatePicker } from '@coreui/react-pro'

const MonthchartTemplate = () => {
  const gridRef = useRef(null)

  const [rowData] = useState(getData())

  const [columnDefs] = useState([
    {
      field: 'sno',
      headerName: 'S.No',
      width: 100,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 350,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 120,
    },
  ])

  return (
    <div className="mt-4">
      <div className="row mb-2">
        <div className="col-md-3">
          <CDatePicker className="form-control" placeholder="Select date" locale="en-US" />
        </div>
        <div className="col-md-3">
          <CFormInput
            type="text"
            className="form-control"
            placeholder="Content"
            aria-label="Content"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-3"></div>
      </div>
      <MasterGrid gridRef={gridRef} columns={columnDefs} rowData={rowData} rowSelection="single" />
    </div>
  )
}

export default MonthchartTemplate
