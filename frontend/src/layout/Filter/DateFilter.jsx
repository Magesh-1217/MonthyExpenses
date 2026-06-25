import React, { useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import { IoCalendarNumberOutline } from 'react-icons/io5'

const DateFilter = ({ coldstorage, setcoldstorage, activeFilter, setActiveFilter }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <DatePicker
        value={selectedDate}
        disabled={activeFilter && activeFilter !== 'date'}
        format="YYYY-MM-DD"
        maxDate={new Date()}
        render={(value, openCalendar) => (
          <div style={{ position: 'relative' }}>
            <input
              className="form-control"
              value={value} // ✅ THIS WAS MISSING
              placeholder="Select Date"
              readOnly
              onClick={openCalendar}
            />

            <IoCalendarNumberOutline
              onClick={openCalendar}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#1297B8',
              }}
            />
          </div>
        )}
        onChange={(date) => {
          setSelectedDate(date) // ✅ Important to update state

          const formattedDate = date ? date.format('YYYY-MM-DD') : ''
          console.log(formattedDate)
        }}
      />
    </div>
  )
}

export default DateFilter
