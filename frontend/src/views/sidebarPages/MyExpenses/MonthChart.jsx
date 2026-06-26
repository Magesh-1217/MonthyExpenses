import React from 'react'
import { useParams } from 'react-router-dom'
import MonthchartTemplate from '../../../layout/Template/MonthchartTemplate'

const MonthChart = () => {
  const { month } = useParams()

  return (
    <div>
      <h3>{month}</h3>
      <MonthchartTemplate />
    </div>
  )
}

export default MonthChart