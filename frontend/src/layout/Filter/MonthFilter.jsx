
import React from 'react'
import DatePicker from 'react-multi-date-picker'
import { CiCalendarDate } from 'react-icons/ci'

const MonthFilter = ({ value, onChange }) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <DatePicker
        onlyMonthPicker
        format="MMMM YYYY"
        value={value}
        maxDate={new Date()}
        onChange={onChange}
        render={(value, openCalendar) => (
          <div style={{ position: 'relative', width: '180px' }}>
            <input
              className="form-control"
              value={value}
              placeholder="Select Month"
              readOnly
              onClick={openCalendar}
            />

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
      />
    </div>
  )
}

export default MonthFilter