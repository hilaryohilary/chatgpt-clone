import React from 'react';
import { BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

type ThirdPartyAuthComponentsProps = {
    
};

const ThirdPartyAuthComponents:React.FC<ThirdPartyAuthComponentsProps> = () => {
    
    return <>
        <div>
            <button className='rounded text-text-dark outline-1 outline-gray-mid outline w-80 p-3.5 mt-3.5 hover:bg-opacity-100 duration-300 hover:bg-gray-light'>
                <span className='flex flex-row items-center gap-4'><FcGoogle size={20} /> Continue with Google</span>
            </button>
        </div>

        <div>
            <button className='rounded text-text-dark outline-1 outline-gray-mid outline w-80 p-3.5 mt-2 hover:bg-opacity-100 duration-300 hover:bg-gray-light'>
                <span className='flex flex-row items-center gap-4'><Image src='/microsoft.svg' width={20} height={20} alt='' /> Continue with Microsoft Account</span>
            </button>
        </div>

        <div>
            <button className='rounded text-text-dark outline-1 outline-gray-mid outline w-80 p-3.5 mt-2 hover:bg-opacity-100 hover:bg-gray-light duration-300'>
                <span className='flex flex-row items-center gap-4'><BsApple size={20} /> Continue with Apple</span>
            </button>
        </div>
    </>
}
export default ThirdPartyAuthComponents;