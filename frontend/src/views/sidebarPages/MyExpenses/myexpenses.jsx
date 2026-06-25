import React from 'react'
import NewMonthButton from './newMonthButton'
import Button from 'react-bootstrap/Button'

const myexpenses = () => {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <div>
      <div className="row " style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <div className="col-md-6">
          <h3>My Expenses</h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <Button variant="primary" onClick={() => setModalShow(true)}>
           Add Month
          </Button>

          <NewMonthButton show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </div>
    </div>
  )
}

export default myexpenses
