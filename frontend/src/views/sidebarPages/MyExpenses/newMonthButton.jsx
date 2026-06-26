
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MonthFilter from '../../../layout/Filter/MonthFilter'

const NewMonthButton = ({ addMonth, onHide, ...props }) => {
  const [selectedMonth, setSelectedMonth] = useState(null)

  const handleSave = () => {
    if (selectedMonth) {
      // convert date object to string
      const formattedMonth = selectedMonth.format("MMMM YYYY")

      addMonth(formattedMonth)

      setSelectedMonth(null)
      onHide()
    }
  }

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Adding New Month</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <MonthFilter
              value={selectedMonth}
              onChange={setSelectedMonth}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewMonthButton