import React from 'react'

export default function CustomButton({text, handleClick, className, type = 'button', btnRef = null, ...other}) {

  const style = `px-4 py-1 border rounded-2xl my-3 text-sm font-semibold ${className}`

  return (
    <button 
      ref={btnRef}
      type={type}
     onClick={handleClick}
     className={style}
     {...other}>
      {text}
    </button>
  )
}
