import React, { useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import { FaRegCalendarAlt } from 'react-icons/fa'

const SelectByDayFilter = ({ coldstorage, setcoldstorage, activeFilter, setActiveFilter }) => {
  const [value, setValue] = useState([])

  const today = new Date()

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* <label htmlFor="week" className='me-2'>Week</label> */}
      <DatePicker
        id="week"
        value={value}
        disabled={activeFilter && activeFilter !== 'week'}
        onChange={(date) => {
          if (date?.length === 2) {
            setValue(date)

            const formattedStart = date[0].format('YYYY-MM-DD')
            const formattedEnd = date[1].format('YYYY-MM-DD')

            // setcoldstorage({
            //   ...coldstorage,
            //   Fromdate: formattedStart,
            //   Todate: formattedEnd,
            // })
          }
        }}
        range
        weekPicker
        maxDate={today}
        format="YYYY-MM-DD"
        render={(value, openCalendar) => (
          <div style={{ position: 'relative' }}>
            <input
              className="form-control"
              value={value}
              placeholder="Select Week"
              readOnly
              onClick={openCalendar}
              style={{
                paddingRight: '40px',
                cursor: 'pointer',
              }}
            />

            <FaRegCalendarAlt
              onClick={openCalendar}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#1297B8',
                cursor: 'pointer',
                fontSize: '18px',
              }}
            />
          </div>
        )}
      />
    </div>
  )
}

export default SelectByDayFilter
