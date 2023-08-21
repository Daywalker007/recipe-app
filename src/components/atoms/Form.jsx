import React from 'react'

export function InputField({name, id, onChange, type = 'text', className, err, ...other}) {
  return (
    <div className={className}>
        <label htmlFor={name} className='block w-fit'>{name}</label>
        <input {...other} type={type} min={(type === 'number' ? '0' : undefined)} id={id && id} name={name} placeholder={name} className='px-5 rounded w-full shadow shadow-iceTheme-300 dark:shadow-iceTheme-400 text-darkBG' onChange={onChange}/>
        <label htmlFor={name} className='text-red-500'>{err}</label>
    </div>
  )
}

export function InputTextArea({name, id, onChange, className, err}) {
  return (
    <div className={className}>
        <label htmlFor={name} className='block w-fit'>{name}</label>
        <span role='textbox' contentEditable id={id && id} name={name} placeholder={name} className='block resize p-3 rounded w-full shadow shadow-iceTheme-300 dark:shadow-iceTheme-400 text-darkBG h-100' onChange={onChange}></span>
        <label htmlFor={name} className='text-red-500'>{err}</label>
    </div>
  )
}

export function InputDropdownField({name, id, onChange, options, className, err}) {
    return (
        <div className={className}>
          <label htmlFor={name} className='block w-fit'>{name}</label>
          <select type='text' id={id && id} name={name} placeholder={name} className='px-5 rounded w-full shadow shadow-iceTheme-300 dark:shadow-iceTheme-400 text-darkBG' onChange={onChange}>
            <option value={null}>Select</option>
            {options?.map((el) => {
                return (<option value={el.val} key={`${el.label}${el.val}`}>{el.label}</option>)
            })}
          </select>
          <label htmlFor={name} className='text-red-500'>{err}</label>
      </div>
    )
  }