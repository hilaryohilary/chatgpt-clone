import React, { useEffect } from "react";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { auth } from "../firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type ThirdPartyAuthComponentsProps = {};

const ThirdPartyAuthComponents: React.FC<
  ThirdPartyAuthComponentsProps
> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (!user) return;
      const accessToken = await user?.user.getIdToken();
      localStorage.setItem("token", JSON.stringify(accessToken));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) console.log(error.message);
  }, [error]);

  const handleSignInError = () => {
    toast.warn("Sign In with Email and Password or Google Account 😎", {
      position: "top-center",
      theme: "colored",
      autoClose: 2000,
    });
  };

  return (
    <>
      <div className="">
        <button
          onClick={handleSignInWithGoogle}
          className="mt-3.5 w-80 rounded p-3.5 text-text-dark outline outline-1 outline-gray-mid duration-300  hover:bg-gray-light hover:bg-opacity-100"
        >
          <span className="flex flex-row items-center gap-4">
            <FcGoogle size={20} /> Continue with Google
          </span>
        </button>
      </div>

      <div className="">
        <button
          className="mt-2 w-80 rounded p-3.5 text-text-dark outline outline-1 outline-gray-mid duration-300 hover:bg-gray-light hover:bg-opacity-100"
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
          className="mt-2 w-80 rounded p-3.5 text-text-dark outline outline-1 outline-gray-mid duration-300 hover:bg-gray-light hover:bg-opacity-100"
          onClick={handleSignInError}
        >
          <span className="flex flex-row items-center gap-4">
            <BsApple size={20} /> Continue with Apple
          </span>
        </button>
      </div>
    </>
  );
};
export default ThirdPartyAuthComponents;
