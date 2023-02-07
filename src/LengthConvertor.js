import React from 'react';

export default function LengthConvertor({
  system,
  handleChange,
  length,
  handleChangeSystem,
  id,
  style,
}) {
  return (
    <div className='length-info' id={id}>
      <input onChange={handleChange} value={length} className='input' id={id} style={{borderBottom: style}}/>
      <select value={system} onChange={handleChangeSystem} id={id} >
        <option value='Metr'>Metr</option>
        <option value='Kilometr'>Km</option>
        <option value='Cm'>Cm</option>
      </select>
    </div>
  );
}
