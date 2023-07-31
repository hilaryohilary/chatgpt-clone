"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiHide, BiShow, BiSolidErrorCircle } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { NextRequest, NextResponse } from "next/server";

type EmailInputProps = {
  showThirdPartyComponent: (value: boolean) => void;
  isLogin: boolean;
};

const EmailInput: React.FC<EmailInputProps> = (
  { showThirdPartyComponent, isLogin }
) => {
  const [email, setEmail] = useState("");
  const [isvalid, setIsvalid] = useState(true);
  const [validity, setValidity] = useState(false);
  const [isFullNameValid, setisFullNameValid] = useState(true);
  const [password, setpassword] = useState<null | string>(null);
  const [fullname, setFullname] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordComponent, setShowPasswordComponent] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [wrongCredentials, setwrongCredentials] = useState(false);
  const router = useRouter();
  const [
    createUserWithEmailAndPassword,
    newUser,
    createUserloading,
    createUserError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [updateProfile, updating, profilError] = useUpdateProfile(auth);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
    setValidity(e.target.validity.valid);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== null && e.target.value !== "") {
      setpassword(e.target.value.trim());
    }
  };

  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setisFullNameValid(e.target.validity.valid);
    e.target.validity.valid && setFullname(e.target.value.trim());
  };

  const validateEmail = async () => {
    if (validity === true) {
      setIsvalid(true);
      setReadOnly(true);
      setShowPasswordComponent(true);
      showThirdPartyComponent(false);
    } else {
      setIsvalid(false);
    }
  };

  const handleLoginWithEmail = async () => {
    try {
      const user = await signInWithEmailAndPassword(email, password!);
      if (!user) return;
      const accessToken = await user.user.getIdToken();
      localStorage.setItem('token', JSON.stringify(accessToken));
      await router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      if (
        error.message === "Firebase: Error (auth/wrong-password)." ||
        error.message === "Firebase: Error (auth/wrong-password)."
      ) {
        setwrongCredentials(true);
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
      console.log(error.message);
    }
  }, [error]);

  const handleSignUpWithEmail = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(email, password!);
      const accessToken = await newUser?.user.getIdToken();
      if (!newUser) return;
      await updateProfile({ displayName: fullname });
      localStorage.setItem('token', JSON.stringify(accessToken));
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const AuthenticateUser = async () => {
    if (
      validity === false ||
      (password?.length as number) < 8 ||
      password === null
    )
      return;
    if (!isFullNameValid || (fullname === "" && isLogin === false)) {
      toast.error("Please fill in your full name", {
        theme: "colored",
        hideProgressBar: true,
        autoClose: 3000,
        position: "top-center",
      });
      setisFullNameValid(false);
      return;
    }
    isLogin ? await handleLoginWithEmail() : await handleSignUpWithEmail();
  };

  useEffect(() => {
    if (createUserError) {
      if (createUserError.code === "auth/email-already-in-use") {
        toast.error("Account already exists, Please login", {
          theme: "colored",
          position: "top-center",
          hideProgressBar: true,
          autoClose: 2000,
        });
      } else {
        toast.error(createUserError.code, {
          position: "top-center",
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
    if (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/wrong-email"
      ) {
        setwrongCredentials(true);
      } else {
        toast.error(error.code, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
      console.log(error.message);
    }
  }, [error, createUserError]);

  return (
    <>
      <div className="input-container">
        {readOnly === false && (
          <>
            <input
              onChange={handleEmail}
              type="email"
              name="email"
              id="email"
              className={`w-80 rounded border p-3
                             ${
                               isvalid === true
                                 ? "focus:border-green"
                                 : "border-error focus:border-error"
                             } bg-white text-gray-500 outline-none`}
              required
            />
            <label
              htmlFor="email"
              className={`
                            bg-white px-1
                             ${isvalid === true ? "valid" : "invalid"}
                             ${email ? "float" : "return"} text-gray-500
                             
                             `}
            >
              Email Address
            </label>
          </>
        )}
        {readOnly && (
          <div className="mb-2">
            <input
              type="text"
              name="email"
              id="email"
              className="w-80 rounded border-[1px] p-3 text-gray-500 outline-none"
              placeholder={email}
              readOnly
            />
            <div className="cursor-pointer duration-200">
              <Link
                className="curson-pointer absolute right-2 top-2.5 rounded p-1 text-[16px] text-green hover:bg-gray-lightest"
                href="/auth"
              >
                Edit
              </Link>
            </div>
          </div>
        )}

        {!isvalid && (
          <div className="mt-1 flex flex-row items-center gap-2 text-[12px] text-error">
            <BiSolidErrorCircle size={16} /> Email is not valid
          </div>
        )}
      </div>

      {showPasswordComponent === true && (
        <>
          {!isLogin && (
            <div className="input-container">
              <input
                onChange={handleFullName}
                type="fullname"
                name="fullname"
                id="fullname"
                minLength={3}
                placeholder="Full Name"
                className={`w-80 rounded border p-3
                             ${
                               isFullNameValid
                                 ? "focus:border-green"
                                 : "border-error text-error focus:border-error"
                             } mb-2 bg-white text-gray-500 outline-none`}
                required
              />
            </div>
          )}
          <div className="input-container mt-2 pt-2 group-[:nth-of-type(4)]:hover:border-green">
            <input
              onChange={handlePassword}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={`w-80 rounded border-[1px] p-3
                             text-gray-500
                             focus:border-green
                             ${wrongCredentials ? "border-error" : ""}
                             outline-none`}
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="show absolute right-[0px] top-[9px] w-11 cursor-pointer rounded-r px-3.5 py-3.5 duration-300 hover:bg-gray-light active:bg-teal-100 "
            >
              {showPassword ? (
                <BiShow size={20} className="text-gray-500" />
              ) : (
                <BiHide size={20} className=" text-gray-500" />
              )}
            </div>

            <label
              htmlFor="password"
              className={`
                            bg-white px-1
                             ${password ? "float" : "return"}
                             ${
                               wrongCredentials === true
                                 ? "text-error"
                                 : " text-gray-500"
                             }
                             `}
            >
              {isLogin ? "Password" : "Create Password"}
            </label>

            {isLogin && wrongCredentials && (
              <div className="mt-1 flex flex-row items-center gap-2 text-[12px] text-error">
                <BiSolidErrorCircle size={16} /> Wrong Email or Password
              </div>
            )}
          </div>
        </>
      )}
      {password !== null && password !== "" && wrongCredentials !== true && (
        <div className=" mt-2 w-80 rounded border-[1px] border-gray-mid p-3">
          <p className="pb-1 text-gray-600">Your password must contain: </p>
          <div
            className={`${
              (password.length as number) >= 8 ? "text-green" : "text-gray-600"
            } flex flex-row items-center gap-2`}
          >
            {password.length < 8 ? <BsDot /> : <GiCheckMark size={15} />}
            <p>Atleast 8 characters</p>
          </div>
        </div>
      )}
      <div>
        <button
          onClick={() => {
            validateEmail();
            AuthenticateUser();
          }}
          type="submit"
          className="relative mt-6 w-80 rounded bg-green bg-opacity-90 p-3.5 text-white outline-none duration-300 hover:bg-opacity-100"
        >
          Continue
        </button>
      </div>
    </>
  );
};
export default EmailInput;
