import React, { forwardRef } from 'react'

export function InputField({name, id, onChange, type = 'text', className, err, placeholder = null, ...other}) {
  return (
    <div className={className}>
        <label htmlFor={name} className='block w-fit'>{name}</label>
        <input {...other} type={type} min={(type === 'number' ? '0' : undefined)} id={id && id} name={name} placeholder={name ?? placeholder} className='px-5 rounded w-full shadow text-black' onChange={onChange}/>
        <label htmlFor={name} className='text-red-500'>{err}</label>
    </div>
  )
}

/** This component uses onBlur instead of onChange to update text because onChange was causing issues with carat placement */
export const InputTextArea = forwardRef(({name, id, onChange, className, err, placeholder = null, defaultValue=null}, ref) => {
  return (
    <div className={className}>
        <label htmlFor={name} className='block w-fit'>{name}</label>
        <div ref={ref} role='textbox' contentEditable='plaintext-only' id={id && id} name={name} aria-multiline={true} aria-placeholder={name ?? placeholder} dangerouslySetInnerHTML={{__html: defaultValue}} className='block resize p-3 rounded w-full shadow text-black h-100 bg-white' onBlur={onChange}></div>
        <label htmlFor={name} className='text-red-500'>{err}</label>
    </div>
  )
})

export function InputDropdownField({name, id, onChange, options, className, err, placeholder = null, ...other}) {
    return (
        <div className={className}>
          <label htmlFor={name} className='block w-fit'>{name}</label>
          <select {...other} type='text' id={id && id} name={name} placeholder={name ?? placeholder} className='px-5 rounded w-full shadow text-black' onChange={onChange} defaultValue={-1} >
            <option value={-1} disabled hidden>Select</option>
            {options?.map((el, idx) => {
                return (<option value={el.val} key={`${el.label}${el.val}`}>{el.label}</option>)
            })}
          </select>
          <label htmlFor={name} className='text-red-500'>{err}</label>
      </div>
    )
  }