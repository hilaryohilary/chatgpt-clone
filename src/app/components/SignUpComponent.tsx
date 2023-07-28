"use client";
import React, { useState } from "react";
import EmailInput from "./EmailInput";
import ThirdPartyAuthComponents from "./ThirdPartyAuthComponents";
import "./loginComponent.css";
import Link from "next/link";

type SignUpComponentProps = {};

const SignUpComponent: React.FC<SignUpComponentProps> = () => {
  const [thirdParty, setThirdParty] = useState(true);
  const handleShowThirdParty = (value: boolean) => {
    setThirdParty(value);
  };

  return (
    <div className="wrap flex flex-col items-center justify-center gap-2 pt-20">
      <h1 className=" mt-8 text-[32px] font-[600]">Create your account</h1>
      <p className="mb-2 w-80 text-center text-[14px]">
        {" "}
        Note that phone verification may be required for signup.Your number will
        only be used to verify your identity for security purposes.
      </p>
      <EmailInput
        showThirdPartyComponent={handleShowThirdParty}
        isLogin={false}
      />

      <div className=" mt-3 text-sm text-text-dark">
        Already have an account?
        <a href="/auth/login" className="mx-1.5 text-green">
          Login
        </a>
      </div>
      {thirdParty ? (
        <>
          <div className="mt-3 flex w-80 flex-row flex-nowrap items-center justify-between">
            <div className="w-40 gap-5 border-t border-text-dark"></div>
            <span className="px-4 text-[12px] font-light text-text-dark">
              OR
            </span>
            <div className=" w-40 border-t border-text-dark"></div>
          </div>
          <ThirdPartyAuthComponents />
          <div className="m mb-10 mt-40 flex flex-row items-center justify-center gap-1 text-[14px] text-green">
            <Link
              href="https://openai.com/policies/terms-of-use"
              target="__blank"
            >
              Terms of use
            </Link>
            <span>|</span>
            <Link
              href="https://openai.com/policies/terms-of-use"
              target="__blank"
            >
              Privacy Policy
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default SignUpComponent;
