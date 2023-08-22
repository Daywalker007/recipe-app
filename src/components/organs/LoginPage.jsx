import React from 'react'
import CustomButton from '../atoms/Button'
import { Link } from 'react-router-dom'
import { InputField } from '../atoms/Form'

export default function LoginPage() {
  return (
    <div className='body-height flex justify-center items-center'>
        <section className='bg-white text-black p-10 rounded-xl shadow-md w-full'>
            <h1 className='text-center text-2xl'>Login</h1>
            <h2 className='text-center text-md'>sub text</h2>
            <form action="#" method="post" className='space-y-3'>

                <InputField name={'Email'} id={'login-email'} onChange={() => {}} type='email' />
                <InputField name={'Password'} id={'login-pass'} onChange={() => {}} type='password' />

                <div className='flex justify-center gap-5'>
                    <Link to={'/recipe'} className='block w-2/5'>
                        <CustomButton text={'Login'} handleClick={() => {}} className={'w-full'}/>
                    </Link>
                    <CustomButton text={'Create'} handleClick={() => {}} className={'w-2/5'} />
                </div>
            </form>
        </section>
    </div>
  )
}
