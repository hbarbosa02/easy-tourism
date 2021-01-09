import React from 'react'

import './styles.css'

const verifyFee = currency => {
  switch (currency) {
    default:
      return 'R$'
  }
}

function MoneratyValue({ label, value, currency, ...props }) {
  return (
    <>
      {label ? label : ''}
      {`${verifyFee(currency || 'BRL')} ${value
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
    </>
  )
}

export default MoneratyValue
