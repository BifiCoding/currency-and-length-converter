import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import CurrencyRow from './CurrencyRow';
import LengthConvertor from './LengthConvertor';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const [fromLength, setFromLength] = useState(1);
  const [toLength, setToLength] = useState(100);
  const [fromSystem, setFromSystem] = useState('Metr');
  const [toSystem, setToSystem] = useState('Cm');

  //Currency
  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    axios.get(`https://api.exchangerate.host/latest`).then(response => {
      setCurrencyOptions([
        response.data.base,
        ...Object.keys(response.data.rates),
      ]);
      const dolar = Object.keys(response.data.rates)[149];
      setFromCurrency(response.data.base);
      setToCurrency(dolar);
      setExchangeRate(response.data.rates[dolar]);
    });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      axios
        .get(
          `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toAmount}`
        )
        .then(response => {
          setExchangeRate(response.data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  // Length
  const conversions = {
    Cm: { Cm: 1, Metr: 0.01, Kilometr: 0.00001 },
    Metr: { Cm: 100, Metr: 1, Kilometr: 0.001 },
    Kilometr: { Cm: 100000, Metr: 1000, Kilometr: 1 },
  };

  useEffect(() => {
    setToLength(fromLength * conversions[fromSystem][toSystem]);
  }, [fromLength, fromSystem]);

  useEffect(() => {
    setFromLength(toLength * conversions[toSystem][fromSystem]);
  }, [toLength, toSystem]);

  const handleChangeLengthFrom = e => {
    let value = e.target.value;
    setFromLength(value);
  };

  const handleChangeLengthTo = e => {
    let value = e.target.value;
    setToLength(value);
  };

  return (
    <div className='main'>
      <div className='content'>
        <div className='currency-block'>
          <div className='currency-child-from'>
            <span className='title'>Currency</span>
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onCurrencyChange={e => setFromCurrency(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
          </div>
          <div className='currency-child-to'>
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onCurrencyChange={e => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
              id={`toCurrencyText`}
              style={'1.5px solid #ff7574'}
            />
          </div>
        </div>
        <div className='length-block'>
          <div className='length-child-from'>
            <span className='title'>Length</span>
            <LengthConvertor
              system={fromSystem}
              handleChange={handleChangeLengthFrom}
              handleChangeSystem={e => setFromSystem(e.target.value)}
              length={fromLength}
              inputType='fromLength'
            />
          </div>
          <div className='length-child-to'>
            <LengthConvertor
              system={toSystem}
              handleChange={handleChangeLengthTo}
              handleChangeSystem={e => setToSystem(e.target.value)}
              length={toLength}
              id={`toLengthText`}
              style={'1.5px solid #39acfc'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
