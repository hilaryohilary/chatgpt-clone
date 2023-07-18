"use client";

import Image from "next/image";
import { useState } from "react";
import { BsPlus, BsSun } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { LiaEllipsisHSolid } from "react-icons/lia";

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div className="flex flex-row">
      <div className="">
        <nav className=" top-0 right-0 left-0 bottom-0 h-screen overflow-y-auto w-[250px] bg-gray-900 p-2 text-white transition ease-in-out">
          <div className="flex flex-row items-center text-center justify-between left-0 right-0">
            <a className="border-white/20 border p-2 w-[180px] gap-2 text-sm rounded-md flex flex-row items-center cursor-pointer duration-200 hover:bg-background-focus-dark">
              <BsPlus size={16} /> <span>New Chat</span>
            </a>

            <button
              onClick={() => setOpenSidebar(!openSidebar)}
              className="ml-auto p-2.5 rounded border border-white/20  hover:bg-background-focus-dark duration-200"
            >
              <Image src="/window.svg" alt="menu" height={16} width={16} />
            </button>
          </div>

          <div className="relative">
            <div className="sticky top-0 z-[16]">
              <h3 className=" h-9 pb-2 pt-3 px-3 text-xs text-gray-500 font-medium text-ellipsis overflow-hidden break-all bg-gray-900">
                Yesterday
              </h3>
            </div>
            <ol>
              <li className="relative z-[15]">
                <a
                  href=""
                  className="flex flex-row items-start py-3 px-3 gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 text-sm"
                >
                  <FiMessageSquare size={25} />
                  <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                    Best React UI Libraries libraryy outcome
                    <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
                  </div>
                </a>
              </li>
            </ol>
          </div>
          <div className="fixed bottom-0 flex flex-col border-t-[1px] border-gray-500 w-[230px]">
            <a
              href=""
              className="flex flex-row items-center py-3 px-3 gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 text-sm mt-2"
            >
              <IoPersonOutline size={16} />
              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                Upgrade to Plus
              </div>
              <span className=" rounded-md bg-orange-300 text-black p-1">
                NEW
              </span>
            </a>

            <a
              href=""
              className="flex flex-row items-center py-3 px-3 gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 text-sm group"
            >
              <h3 className="py-1 px-2 rounded bg-gray-700">H</h3>
              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                Hilary Ogochukwu
              </div>
              <LiaEllipsisHSolid size={16} />
            </a>
          </div>
        </nav>
      </div>
      {/* <button onClick={() => setOpenSidebar(!openSidebar)} className="fixed mt-2 ml-2 p-3 rounded border border-black/20 hover:bg-gray-lightest duration-200">
          <Image src="/window-dark.svg" alt="menu" height={16} width={16} />
        </button> */}
      <div className=" relative flex flex-col text-sm dark:bg-gray-800 justify-center w-full">
        <div className="text-gray-800 w-full mx-auto md:mx-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
          <h1 className="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center">
            ChatGPT Clone
          </h1>
          <div className="md:flex items-start text-center gap-3.5">
            <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
              <h2 className=" flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                <BsSun />
                Examples
              </h2>
              <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                <button className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                  Explain quantum computing in simple terms →
                </button>
                <button className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                  Got any creative ideas for a 10 year old’s birthday? →
                </button>
                <button className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                  How do I make an HTTP request in Javascript? →
                </button>
              </ul>
            </div>

            <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
              <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  ></path>
                </svg>
                Capabilities
              </h2>
              <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                  Remembers what user said earlier in the conversation
                </li>
                <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                  Allows user to provide follow-up corrections
                </li>
                <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                  Trained to decline inappropriate requests
                </li>
              </ul>
            </div>
            <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
              <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Limitations
              </h2>
              <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                  May occasionally generate incorrect information
                </li>
                <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                  May occasionally produce harmful instructions or biased
                  content
                </li>
                <li className="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                  Limited knowledge of world and events after 2021
                </li>
              </ul>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
}
