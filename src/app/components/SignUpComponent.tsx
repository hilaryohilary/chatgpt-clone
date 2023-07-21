"use client";
import React, { useState } from 'react';
import EmailInput from './EmailInput';
import ThirdPartyAuthComponents from './ThirdPartyAuthComponents';
import './loginComponent.css'
import Link from 'next/link';


type SignUpComponentProps = {

};

const SignUpComponent: React.FC<SignUpComponentProps> = () => {
    const [thirdParty, setThirdParty] = useState(true)
    const handleShowThirdParty = (value:boolean) => {
        setThirdParty(value);
    }
   
    return <div className='flex flex-col justify-center wrap items-center pt-20 gap-2'>
        <h1 className=' font-[600] text-[32px] mt-8'>Create your account</h1 >
        <p className='w-80 text-center text-[14px] mb-2' > Note that phone verification may be required for signup.Your number will only be used to verify your identity for security purposes.</p >
        <EmailInput showThirdPartyComponent={ handleShowThirdParty } isLogin={ false } />
        
        <div className=' text-sm text-text-dark mt-3'>Already have an account?<a href='/auth/login' className='mx-1.5 text-green'>Login</a></div>
        {
            thirdParty ? (
            <>
            <div className='w-80 flex flex-row flex-nowrap items-center justify-between mt-3'>
                <div className='border-t border-text-dark w-40 gap-5'></div>
                <span className='px-4 text-[12px] text-text-dark font-light'>OR</span>
                <div className=' border-t border-text-dark w-40'></div>
            </div>
            <ThirdPartyAuthComponents />
            <div className='text-green flex flex-row justify-center items-center mt-40 mb-10 text-[14px] gap-1 m'>
                <Link href='https://openai.com/policies/terms-of-use' target='__blank'>Terms of use</Link>
                <span>|</span>
                <Link href='https://openai.com/policies/terms-of-use' target='__blank'>Privacy Policy</Link>
            </div>
            </>
            ) : ''
        }
    </div>

}
export default SignUpComponent;