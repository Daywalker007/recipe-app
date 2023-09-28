import React, { useEffect } from 'react'

export default function LoggedIn() {

    useEffect(() => {
        setTimeout(() => {
            window.close()
        }, 1000);
    }, [])

  return (
    <div>Successfully Logged In</div>
  )
}
