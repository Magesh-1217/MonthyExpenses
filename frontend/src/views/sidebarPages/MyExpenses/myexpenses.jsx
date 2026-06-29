import React, { useState } from 'react'
import NewMonthButton from './newMonthButton'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const MyExpenses = () => {
  const [modalShow, setModalShow] = useState(false)
  const [months, setMonths] = useState([])
  const navigate = useNavigate()

  const addMonth = (month) => {
    if (!months.includes(month)) {
      setMonths([...months, month])
    }

    setModalShow(false)
  }

  const handleMonthClick = (month) => {
    navigate(`/month-chart/${month}`)
  }

  return (
    <div>
      <div
        className="row"
        style={{
          marginBottom: '20px',
          borderBottom: '2px solid #ccc',
          paddingBottom: '10px',
        }}
      >
        <div className="col-md-6">
          <h3>My Expenses</h3>
        </div>

        <div className="col-md-6 d-flex justify-content-end">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Month
          </Button>

          <NewMonthButton
            show={modalShow}
            onHide={() => setModalShow(false)}
            addMonth={addMonth}
          />
        </div>
      </div>

      {/* Dynamic Cards */}
      <div className="row">
        {months.map((month, index) => (
          <div key={index} className="col-sm-3 mb-3">
            <div
              className="card shadow-sm"
              style={{ cursor: 'pointer' }}
              onClick={() => handleMonthClick(month)}
            >
              <div className="card-body text-center">
                <h5>{month}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyExpenses