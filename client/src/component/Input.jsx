import React from 'react'

const Input = ({label,type,placeholder,onChange,id,value}) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
        {/* <span className="label-text-alt">Top Right label</span> */}
      </div>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        onChange={onChange}
        id={id}
      />
  
    </label>
  )
}

export default Input
