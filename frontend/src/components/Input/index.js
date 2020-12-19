import React from 'react';

import './styles.css';

function Input({ name, label, ...rest }) {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;