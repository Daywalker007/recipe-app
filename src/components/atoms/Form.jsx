import React from 'react'

export function InputField({name, id, onChange, type = 'text', className, err, placeholder = null, ...other}) {
  return (
    <div className={className}>
        <label htmlFor={name} className='block w-fit'>{name}</label>
        <input {...other} type={type} min={(type === 'number' ? '0' : undefined)} id={id && id} name={name} placeholder={placeholder !== null ? placeholder : name} className='px-5 rounded w-full shadow text-black' onChange={onChange}/>
        <label htmlFor={name} className='text-red-500'>{err}</label>
    </div>
  )
}

export function InputTextArea({name, id, onChange, className, err, placeholder = null}) {
  return (
    <div className={className}>
        <label htmlFor={name} className='block w-fit'>{name}</label>
        <div role='textbox' contentEditable='plaintext-only' id={id && id} name={name} aria-multiline={true} aria-placeholder={placeholder !== null ? placeholder : name} className='block resize p-3 rounded w-full shadow text-black h-100 bg-white' onInput={onChange}></div>
        <label htmlFor={name} className='text-red-500'>{err}</label>
    </div>
  )
}

export function InputDropdownField({name, id, onChange, options, className, err, placeholder = null}) {
    return (
        <div className={className}>
          <label htmlFor={name} className='block w-fit'>{name}</label>
          <select type='text' id={id && id} name={name} placeholder={placeholder !== null ? placeholder : name} className='px-5 rounded w-full shadow text-black' onChange={onChange}>
            <option value={null}>Select</option>
            {options?.map((el) => {
                return (<option value={el.val} key={`${el.label}${el.val}`}>{el.label}</option>)
            })}
          </select>
          <label htmlFor={name} className='text-red-500'>{err}</label>
      </div>
    )
  }