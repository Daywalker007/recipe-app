import { useEffect } from 'react'

export default function LoggedIn() {

    useEffect(() => {
      // Hide navbar
      const navBar = document.querySelector('nav')!
      navBar.style.display = 'none'

        setTimeout(() => {
            window.close()
        }, 1000);
    }, [])

  return (
    <div className='h-[100dvh] flex justify-center items-center'>
      <h2 className='inline-block h-fit text-4xl'>Successfully Logged In</h2>
    </div>
  )
}
