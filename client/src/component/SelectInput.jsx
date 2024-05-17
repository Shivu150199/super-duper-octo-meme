import React from 'react'

const SelectInput = ({label,fo,so,to,id,onChange}) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      
      </div>
      <select className="select select-bordered" id={id} onChange={onChange}>
        <option disabled >
          Choose an option
        </option>
        <option value={fo}>{fo}</option>
        <option value={so}>{so}</option>
        <option value={to}>{to}</option>
  
      </select>

    </label>
  )
}

export default SelectInput
