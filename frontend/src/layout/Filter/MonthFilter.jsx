import React from 'react'
import DatePicker from 'react-multi-date-picker'
import { CiCalendarDate } from 'react-icons/ci'

const MonthFilter = ({ coldstorage, setcoldstorage, activeFilter, setActiveFilter }) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* <label htmlFor="month " className='me-2'> Month</label> */}
      <DatePicker
        id="month"
        onlyMonthPicker
        format="YYYY/MM"
        maxDate={new Date()}
        calendarClassName="month-picker-popup"
        disabled={activeFilter && activeFilter !== 'month'}
        render={(value, openCalendar) => (
          <div style={{ position: 'relative', width: '180px' }}>
            <input
              className="form-control"
              value={value}
              placeholder="Select Month"
              readOnly
              onClick={openCalendar}
            />

            {/* ✅ REAL ICON */}
            <CiCalendarDate
              onClick={openCalendar}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#1297B8',
              }}
            />
          </div>
        )}
        onChange={(date) => {
          if (!date) return

          const jsDate = date.toDate()

          const startDate = new Date(jsDate.getFullYear(), jsDate.getMonth(), 1)
          const endDate = new Date(jsDate.getFullYear(), jsDate.getMonth() + 1, 0)

          const formattedStart = date.set({ day: 1 }).format('YYYY-MM-DD')
          const formattedEnd = date.set({ day: endDate.getDate() }).format('YYYY-MM-DD')

          // setcoldstorage({
          //   ...coldstorage,
          //   Fromdate: formattedStart,
          //   Todate: formattedEnd,
          // })
        }}
      />
    </div>
  )
}

export default MonthFilter
