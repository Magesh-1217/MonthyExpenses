import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MonthFilter from '../../../layout/Filter/MonthFilter'

const NewMonthButton = (props) => {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Adding New Month</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row d-flex">
            
          <div className="col-md-12  justify-content-center">
            <MonthFilter />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewMonthButton
