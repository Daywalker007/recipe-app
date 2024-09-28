import React, { forwardRef } from 'react'

export function InputField({...props}) {
  return (
    <div className={props.className}>
        <label htmlFor={props.name} className='block w-fit'>{props.name}</label>
        <input type={props.type} min={(props.type === 'number' ? '0' : undefined)} id={props.id && props.id} name={props.name} placeholder={props.placeholder ?? props.name} className='px-5 rounded w-full shadow text-black' onChange={props.onChange}/>
        <label htmlFor={props.name} className='text-red-500'>{props.err}</label>
    </div>
  )
}
// export function InputField({name, id, onChange, type = 'text', className, err, placeholder, ...other}) {
//   return (
//     <div className={className}>
//         <label htmlFor={name} className='block w-fit'>{name}</label>
//         <input {...other} type={type} min={(type === 'number' ? '0' : undefined)} id={id && id} name={name} placeholder={placeholder ?? name} className='px-5 rounded w-full shadow text-black' onChange={onChange}/>
//         <label htmlFor={name} className='text-red-500'>{err}</label>
//     </div>
//   )
// }

/** This component uses onBlur instead of onChange to update text because onChange was causing issues with carat placement */
export const InputTextArea  = ({...props}) => {
  return (
    <div className={props.className}>
        <label htmlFor={props.name} className='block w-fit'>{props.name}</label>
        <div role='textbox' contentEditable='plaintext-only' id={props.id && props.id} data-name={props.name} aria-multiline={true} aria-placeholder={props.placeholder ?? props.name} dangerouslySetInnerHTML={{__html: props.defaultValue}} className='block resize p-3 rounded w-full shadow text-black h-100 bg-white' onBlur={props.onChange}></div>
        <label htmlFor={props.name} className='text-red-500'>{props.err}</label>
    </div>
  )
}
// export const InputTextArea = forwardRef(({name, id, onChange, className, err, placeholder, defaultValue}, ref) => {
//   return (
//     <div className={className}>
//         <label htmlFor={name} className='block w-fit'>{name}</label>
//         <div ref={ref} role='textbox' contentEditable='plaintext-only' id={id && id} name={name} aria-multiline={true} aria-placeholder={placeholder ?? name} dangerouslySetInnerHTML={{__html: defaultValue}} className='block resize p-3 rounded w-full shadow text-black h-100 bg-white' onBlur={onChange}></div>
//         <label htmlFor={name} className='text-red-500'>{err}</label>
//     </div>
//   )
// })

export function InputDropdownField({...props}) {
    return (
        <div className={props.className}>
          <label htmlFor={props.name} className='block w-fit'>{props.name}</label>
          <select {...props} id={props.id && props.id} name={props.name} className='px-5 rounded w-full shadow text-black' onChange={props.onChange} defaultValue={-1} >
            <option value={-1} disabled hidden>Select</option>
            {props.options?.map((el, idx) => {
                return (<option value={el.val} key={`${el.label}${el.val}`}>{el.label}</option>)
            })}
          </select>
          <label htmlFor={props.name} className='text-red-500'>{props.err}</label>
      </div>
    )
  }