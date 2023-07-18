"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { BiHide, BiShow, BiSolidErrorCircle } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';

type EmailInputProps = {
    showThirdPartyComponent: (value: boolean) => void;
};

const EmailInput: React.FC<EmailInputProps> = ({ showThirdPartyComponent }) => {

    const [email, setEmail] = useState('');
    const [isvalid, setIsvalid] = useState(true);
    const [validity, setValidity] = useState(false);
    const [authState, setauthState] = useState('');
    const [password, setpassword] = useState<null | string>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordComponent, setShowPasswordComponent] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

        setEmail(e.target.value);
        setValidity(e.target.validity.valid);
    }


    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null && e.target.value !== '') {
            setpassword(e.target.value.trim());
        }
    }

    const validateAndLoginWithEmail = async () => {
        if (validity === true) {
            setIsvalid(true);
            setReadOnly(true);
            setShowPasswordComponent(true);
            showThirdPartyComponent(false);

        } else {
            setIsvalid(false);
        }
    }

    return (
        <>
            <div className='input-container'>
                {readOnly === false && <>
                    <input
                        onChange={handleEmail}
                        type='email' name="email" id="email"
                        className={

                            `p-3 rounded border-[1px] w-80
                             ${isvalid === true ? 'focus:border-green' : 'focus:border-error border-error'} text-gray-500 bg-white`
                             
                        }
                        required
                    />
                    <label
                        htmlFor="email"
                        className=
                        {
                            `
                            bg-white px-1
                             ${isvalid === true ? 'valid' : 'invalid'}
                             ${email ? 'float' : 'return'} text-gray-500
                             
                             `
                        }>
                        Email Address
                    </label>
                </>}
                {
                    readOnly && <div>
                        <input type="text" name="email" id="email" className='p-3 rounded border-[1px] w-80 text-gray-500' placeholder={email} readOnly />
                        <div className='cursor-pointer duration-200'>
                            <Link className='text-green text-[16px] rounded p-1 curson-pointer hover:bg-gray-lightest absolute right-2 top-2.5' href='/auth'>Edit</Link>
                        </div>
                    </div>
                }

                {
                    isvalid === true ? "" : <div className='text-error text-[12px] flex flex-row items-center gap-2 mt-1'><BiSolidErrorCircle size={16} /> Email is not valid</div>
                }

            </div>
            {
                showPasswordComponent === true &&
                <div className='input-container pt-2 group-[:nth-of-type(4)]:hover:border-green'>
                    <input
                        onChange={handlePassword}
                        type={showPassword ? 'text' : 'password'} name="password" id="password"
                        className={

                            `p-3 rounded border-[1px] w-80
                             text-gray-500
                             focus:border-green
                             `

                        }
                        required
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className='show cursor-pointer rounded-r hover:bg-gray-light active:bg-teal-100 duration-300 px-3.5 py-3.5 w-11 absolute right-[0px] top-[9px] '>
                        {showPassword ? <BiShow size={20} className='text-gray-500' /> : <BiHide size={20} className=' text-gray-500' />}
                    </div>

                    <label
                        htmlFor="password"
                        className=
                        {
                            `
                            bg-white px-1
                             text-gray-500
                             ${password ? 'float' : 'return'}
                             `
                        }>
                        Password
                    </label>
                </div>

            }
            {
                (password !== null && password !== '' && <div className=' p-3 w-80 mt-2 border-gray-mid rounded border-[1px]'>
                    <p className='text-gray-600 pb-1'>Your password must contain: </p>
                    <div className={`${password.length as number >= 8 ? 'text-green' : 'text-gray-600'} flex flex-row gap-2 items-center`}>
                        {
                            password.length < 8 ? <BsDot /> : <GiCheckMark size={15}
                            />
                        }
                        <p>Atleast 8 characters</p>
                    </div>
                </div>)
            }
            <div>
                <button onClick={validateAndLoginWithEmail} type='submit' onSubmit={() => { }} className='relative rounded bg-opacity-90 w-80 outline-none bg-green p-3.5 mt-6 text-white hover:bg-opacity-100 duration-300'>Continue</button>
            </div>
        </>)
}
export default EmailInput;