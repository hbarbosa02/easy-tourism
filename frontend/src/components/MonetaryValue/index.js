import React from 'react'
import StringMask from 'string-mask'

import './styles.css'

const verifyFee = currency => {
  switch (currency) {
    default:
      return 'R$'
  }
}

function MonetaryValue({ label, value, currency, ...props }) {
  const mask = new StringMask('#.###,##')

  return (
    <>
      {label ? label : ''}
      {`${verifyFee(currency || 'BRL')} ${mask.apply(value)}`}
    </>
  )
}

export default MonetaryValue
