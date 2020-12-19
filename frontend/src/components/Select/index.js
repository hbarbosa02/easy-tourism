import React from 'react';

import './styles.css';

function Select({ name, label, options, ...rest }) {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>

        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              label={option.label}
            />
          );
        })}
      </select>
    </div>
  );
};

export default Select;