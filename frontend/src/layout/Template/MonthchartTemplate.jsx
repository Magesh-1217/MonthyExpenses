import React, { useRef, useState, useCallback } from 'react'
import { getData } from './MonthChartDatas'
import MasterGrid from './MasterGrid'
import { CFormInput, CFormSelect, CButton } from '@coreui/react'
import { CDatePicker } from '@coreui/react-pro'

/* ─────────────────────────────────────────────
   Design tokens
   Header gradient : #065885 → #0ea5e9  (kept as requested)
   Accent / CTA    : #6366f1  (indigo)
   Success (Paid)  : #059669
   Warning (Pend.) : #d97706
   Danger  (Del.)  : #dc2626
───────────────────────────────────────────── */

/* Global overrides for CDatePicker so it looks identical to other inputs */
const globalStyles = `
  /* Force CDatePicker input to match shared inputStyle */
  .expense-datepicker .form-control,
  .expense-datepicker input {
    height: 42px !important;
    border-radius: 8px !important;
    border: 1.5px solid #e2e8f0 !important;
    font-size: 14px !important;
    background-color: #ffffff !important;
    color: #1e293b !important;
    padding: 0 12px !important;
    box-shadow: none !important;
    transition: border-color 0.2s, box-shadow 0.2s !important;
  }

  .expense-datepicker .form-control:focus,
  .expense-datepicker input:focus {
    border-color: #6366f1 !important;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important;
    outline: none !important;
  }

  /* Calendar dropdown sits above the grid */
  .expense-datepicker .picker-dropdown,
  .expense-datepicker .dropdown-menu {
    z-index: 99999 !important;
    border-radius: 12px !important;
    border: 1.5px solid #e2e8f0 !important;
    box-shadow: 0 12px 40px rgba(0,0,0,0.14) !important;
  }

  /* Shared focus ring for CFormInput / CFormSelect */
  .expense-input .form-control:focus,
  .expense-select .form-select:focus {
    border-color: #6366f1 !important;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important;
  }

  /* Action icon buttons */
  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    transition: transform 0.12s, opacity 0.12s;
    font-size: 15px;
    line-height: 1;
    padding: 0;
  }
  .action-btn:hover { transform: scale(1.15); opacity: 0.88; }
  .action-btn.view   { background: #dcfce7; color: #059669; }
  .action-btn.edit   { background: #e0e7ff; color: #4f46e5; }
  .action-btn.delete { background: #fee2e2; color: #dc2626; }

  /* Status badge */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
  .status-badge.paid    { background: #d1fae5; color: #065f46; }
  .status-badge.pending { background: #fef3c7; color: #92400e; }

  /* Input wrapper label */
  .field-wrap { display: flex; flex-direction: column; gap: 4px; }
  .field-label {
    font-size: 11.5px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

/* ── Shared input shell (border/radius only — sizing handled by CDatePicker override above) */
const inputBase = {
  height: '42px',
  borderRadius: '8px',
  border: '1.5px solid #e2e8f0',
  fontSize: '14px',
  backgroundColor: '#ffffff',
  // color: '#1e293b',
}

const MonthchartTemplate = () => {
  const gridRef = useRef(null)

  /* ── Form state ── */
  const [selectedDate, setSelectedDate] = useState(null)
  const [content, setContent] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('Pending')

  /* ── Grid data ── */
  const [rowData, setRowData] = useState(getData())

  /* ── Add row ── */
  const handleAdd = useCallback(() => {
    if (!selectedDate || !content.trim() || !amount) return

    const dateStr =
      selectedDate instanceof Date ? selectedDate.toISOString().split('T')[0] : String(selectedDate)

    setRowData((prev) => [
      ...prev,
      {
        sno: prev.length + 1,
        date: dateStr,
        content: content.trim(),
        amount: Number(amount),
        status,
      },
    ])
    setSelectedDate(null)
    setContent('')
    setAmount('')
    setStatus('Pending')
  }, [selectedDate, content, amount, status])

  /* ── Action handlers ── */
  const handleView = useCallback((data) => {
    alert(
      `👁 View\n\nDate: ${data.date}\nContent: ${data.content}\nAmount: ₹${data.amount}\nStatus: ${data.status}`,
    )
  }, [])

  const handleEdit = useCallback((data) => {
    const newContent = prompt('Edit content:', data.content)
    const newAmount = prompt('Edit amount:', data.amount)
    if (newContent === null || newAmount === null) return
    setRowData((prev) =>
      prev.map((r) =>
        r.sno === data.sno ? { ...r, content: newContent.trim(), amount: Number(newAmount) } : r,
      ),
    )
  }, [])

  const handleDelete = useCallback((data) => {
    if (!window.confirm(`Delete "${data.content}"?`)) return
    setRowData((prev) =>
      prev.filter((r) => r.sno !== data.sno).map((r, i) => ({ ...r, sno: i + 1 })),
    )
  }, [])

  /* ── Column defs ── */
  const [columnDefs] = useState([
    {
      field: 'sno',
      headerName: 'S.No',
      width: 80,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 130,
    },
    {
      field: 'content',
      headerName: 'Content',
      flex: 2,
      minWidth: 200,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 110,
      filter: 'agNumberColumnFilter',
      cellRenderer: (params) => (
        <span style={{ fontWeight: 600, color: '#0f172a' }}>
          ₹{Number(params.value).toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      cellRenderer: (params) => {
        const isPaid = params.value === 'Paid'
        return (
          <span className={`status-badge ${isPaid ? 'paid' : 'pending'}`}>
            <span>{isPaid ? '✓' : '⏳'}</span>
            {params.value}
          </span>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      filter: false,
      sortable: false,
      pinned: 'right',
      cellRenderer: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '100%' }}>
          <button className="action-btn view" title="View" onClick={() => handleView(params.data)}>
            👁
          </button>
          <button className="action-btn edit" title="Edit" onClick={() => handleEdit(params.data)}>
            ✏️
          </button>
          <button
            className="action-btn delete"
            title="Delete"
            onClick={() => handleDelete(params.data)}
          >
            🗑
          </button>
        </div>
      ),
    },
  ])

  /* ── Totals ── */
  const totalAmount = rowData.reduce((s, r) => s + Number(r.amount || 0), 0)
  const paidAmount = rowData
    .filter((r) => r.status === 'Paid')
    .reduce((s, r) => s + Number(r.amount || 0), 0)
  const pendingCount = rowData.filter((r) => r.status === 'Pending').length

  return (
    <div className="mb-4">
      <style>{globalStyles}</style>

      {/* ── Header bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              fontWeight: 600,
              color: '#6366f1',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Expense Tracker
          </p>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            March 2025
          </h2>
        </div>

        {/* ── Summary pills ── */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            {
              label: 'Total',
              value: `₹${totalAmount.toLocaleString('en-IN')}`,
              bg: '#6366f1',
              text: '#fff',
            },
            {
              label: 'Paid',
              value: `₹${paidAmount.toLocaleString('en-IN')}`,
              bg: '#059669',
              text: '#fff',
            },
            {
              label: 'Pending',
              value: `${pendingCount} item${pendingCount !== 1 ? 's' : ''}`,
              bg: '#d97706',
              text: '#fff',
            },
          ].map(({ label, value, bg, text }) => (
            <div
              key={label}
              style={{
                background: bg,
                color: text,
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: `0 2px 8px ${bg}55`,
              }}
            >
              <span
                style={{
                  opacity: 0.8,
                  fontSize: '11px',
                  marginRight: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {label}
              </span>
              {value}
            </div>
          ))}
        </div>
      </div>

      {/* ── Input card ── */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '18px 20px',
          marginBottom: '20px',
          border: '1.5px solid #e2e8f0',
          boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {/* Date — key fix: isolated z-index + class override */}
          <div
            className="field-wrap expense-datepicker"
            style={{ position: 'relative', flex: '1 1 155px', minWidth: '150px' }}
          >
            <span className="field-label">Date</span>
            <CDatePicker
              value={selectedDate}
              onDateChange={(date) => setSelectedDate(date)}
              locale="en-IN"
              footer
              placeholder="Select Date"
              inputReadOnly={false}
            />
          </div>

          {/* Content */}
          <div
            className="field-wrap expense-input"
            style={{ flex: '2 1 200px', minWidth: '170px' }}
          >
            <span className="field-label">Content</span>
            <CFormInput
              type="text"
              placeholder="e.g. Groceries"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={inputBase}
            />
          </div>

          {/* Amount */}
          <div
            className="field-wrap expense-input"
            style={{ flex: '1 1 130px', minWidth: '120px' }}
          >
            <span className="field-label">Amount (₹)</span>
            <CFormInput
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputBase}
            />
          </div>

          {/* Status */}
          <div
            className="field-wrap expense-select"
            style={{ flex: '1 1 145px', minWidth: '130px' }}
          >
            <span className="field-label">Status</span>
            <CFormSelect
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={inputBase}
              options={[
                { label: '⏳ Pending', value: 'Pending' },
                { label: '✓  Paid', value: 'Paid' },
              ]}
            />
          </div>

          {/* Add button — aligned to bottom */}
          <div style={{ flex: '0 0 auto', paddingBottom: '0px' }}>
            <span className="field-label" style={{ visibility: 'hidden' }}>
              x
            </span>
            <CButton
              color="primary"
              onClick={handleAdd}
              style={{
                height: '42px',
                padding: '0 30px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '14px',
                background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                border: 'none',
                boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                letterSpacing: '0.4px',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.15s',
              }}
            >
              + Add
            </CButton>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div style={{ width: '100%' }}>
        <MasterGrid
          gridRef={gridRef}
          columns={columnDefs}
          rowData={rowData}
          rowSelection={{ mode: 'singleRow', enableClickSelection: true }}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          height={520}
        />
      </div>
    </div>
  )
}

export default MonthchartTemplate
