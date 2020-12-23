import React from 'react'
import { format, subHours } from 'date-fns'

const DateTimeComponent = ({ date, dateFormat = 'dd/MM/yyyy HH:mm' }) => (
  <time dateTime={date}>{format(new Date(date), dateFormat)}</time>
)

export const fixTimestamp = (date, diff = 3) => subHours(date, diff)

export default DateTimeComponent
