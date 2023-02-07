import React from 'react';

export default function CurrencyRow({
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
  amount,
  onChangeAmount,
  id,
  style
}) {

  return (
    <div className='currency-info'>
      <input
        className='input'
        type='number'
        value={isNaN(amount) ? 0 : Number(parseFloat(amount).toFixed(2))}
        id={id}
        onChange={onChangeAmount}
        style={{borderBottom: style}}
      /> 
      <select value={selectedCurrency} onChange={onCurrencyChange} id={id} >
        {currencyOptions.map((option, index) => (
          <option value={option} key={option + index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
