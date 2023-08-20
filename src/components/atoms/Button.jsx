import React from 'react'

export default function CustomButton({text, handleClick, className, type = 'button', btnRef = null}) {

  const style = `px-10 border rounded-2xl my-3 text-lg font-semibold ${className}`

  return (
    <button 
      ref={btnRef}
      type={type}
     onClick={handleClick}
     className={style}>
      <span>{text}</span>
    </button>
  )
}
