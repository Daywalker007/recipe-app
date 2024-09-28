interface ICustomButtonProps {
  text: string,
  className?: string,
  type?: 'button' | 'submit' | 'reset' | undefined,
  btnRef?: any,
  handleClick?: () => void
  [props:string]: any
}
const CustomButton = ({text, className, handleClick, type = 'button', btnRef = null, ...props}:ICustomButtonProps)  =>{

  const style = `px-4 py-1 border rounded-2xl my-3 text-sm font-semibold ${className}`

  return (
    <button 
      ref={btnRef}
      type={type}
     className={style}
     onClick={handleClick}
     {...props}>
      {text}
      {props.children}
    </button>
  )
}

export default CustomButton
