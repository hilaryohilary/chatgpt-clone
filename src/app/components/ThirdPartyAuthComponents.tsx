import React, { useEffect } from 'react';
import { BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { auth } from "../firebase";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
type ThirdPartyAuthComponentsProps = {
    
};

const ThirdPartyAuthComponents: React.FC<ThirdPartyAuthComponentsProps> = () => {
   const [signInWithGoogle, user, loading, error] =
        useSignInWithGoogle(auth);
    const router = useRouter();
    
    const handleSignInWithGoogle = async () => {
        try {
            const user = await signInWithGoogle();
            console.log(user);
            if (!user) return;
            router.push('/');
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (error) console.log(error.message)
    }, [error]);
    
    const handleSignInError = () => {
        toast.warn("Sign In with Email and Password or Google Account 😎", {
            position: "top-center",
            theme: "colored",
            autoClose: 2000
        })
    }
    
    return (
      <>
        <div className="">
          <button
            onClick={handleSignInWithGoogle}
            className="rounded text-text-dark outline-1 outline-gray-mid outline w-80 p-3.5 mt-3.5 hover:bg-opacity-100  duration-300 hover:bg-gray-light"
          >
            <span className="flex flex-row items-center gap-4">
              <FcGoogle size={20} /> Continue with Google
            </span>
          </button>
        </div>

        <div className="">
          <button
            className="rounded text-text-dark outline-1 outline-gray-mid outline w-80 p-3.5 mt-2 hover:bg-opacity-100 duration-300 hover:bg-gray-light"
            onClick={handleSignInError}
          >
            <span className="flex flex-row items-center gap-4">
              <Image src="/microsoft.svg" width={20} height={20} alt="" />{" "}
              Continue with Microsoft Account
            </span>
          </button>
        </div>

        <div className="">
          <button
            className="rounded text-text-dark outline-1 outline-gray-mid outline w-80 p-3.5 mt-2 hover:bg-opacity-100 hover:bg-gray-light duration-300"
            onClick={handleSignInError}
          >
            <span className="flex flex-row items-center gap-4">
              <BsApple size={20} /> Continue with Apple
            </span>
          </button>
        </div>
      </>
    );
}
export default ThirdPartyAuthComponents;