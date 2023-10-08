import React, { useEffect } from 'react'
import CustomButton from '../atoms/Button'
import { InputField } from '../atoms/Form'
import { getUser } from '../util/user-endpoints'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate()

    useEffect(() => {
        // Call an inmmediately called function that gets the user data        
        (async () => {
            const authUser = await getUser()

            if(authUser._id)
                navigate('/home')
        })()
    }, [])

    const googleAuth = async () => {
        let timer = null
        const childWindow = window.open(
            `${import.meta.env.VITE_API_URL}/auth/google/callback/`,
            '_blank',
            'width=500,height=600'
        )

        if(childWindow){
            timer = setInterval(async () => {
                if(childWindow.closed){
                    console.info('User is authenticated')
                    const authUser = await getUser()
                    // Remove interval to avoid memory issues
                    if(authUser && timer){
                        clearInterval(timer)
                        navigate('/home')
                    }
                }
            }, 500);
        }
    }

  return (
    <div className='body-height flex justify-center items-center'>
        <section className='bg-white text-black p-10 rounded-xl shadow-md w-full'>
            <h1 className='text-center text-2xl'>Login</h1>
            <h2 className='text-center text-md'>sub text</h2>
            <form action="#" method="post" className='space-y-3'>

                <InputField name={'Email'} id={'login-email'} onChange={() => {}} type='email' />
                <InputField name={'Password'} id={'login-pass'} onChange={() => {}} type='password' />

                <div className='flex justify-center gap-5'>
                    <CustomButton text={'Login with Google'} handleClick={googleAuth} className={'w-full'}/>
                    <CustomButton text={'Create'} handleClick={() => {}} className={'w-2/5'} />
                </div>
            </form>
        </section>
    </div>
  )
}
