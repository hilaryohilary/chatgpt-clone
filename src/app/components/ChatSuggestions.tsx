import React from "react";
import { BsSun } from "react-icons/bs";

type ChatSuggestionsProps = {
  openSideBar: boolean;
};

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ openSideBar }) => {
  return (
    <div
      className={`${
        openSideBar ? "md:pl-[250px]" : ""
      } relative flex w-full flex-col justify-center text-sm dark:bg-gray-800`}
    >
      <div className="md:mx-w-2xl mx-auto w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:h-full md:flex-col lg:max-w-3xl">
        <h1 className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 sm:mt-[10vh]">
          ChatGPT Clone
        </h1>
        <div className="items-start gap-3.5 text-center md:flex">
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className=" m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <BsSun />
              Examples
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <button className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900">
                Explain quantum computing in simple terms →
              </button>
              <button className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900">
                Got any creative ideas for a 10 year old’s birthday? →
              </button>
              <button className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900">
                How do I make an HTTP request in Javascript? →
              </button>
            </ul>
          </div>

          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                ></path>
              </svg>
              Capabilities
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                Remembers what user said earlier in the conversation
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                Allows user to provide follow-up corrections
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                Trained to decline inappropriate requests
              </li>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
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
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                May occasionally generate incorrect information
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                May occasionally produce harmful instructions or biased content
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                Limited knowledge of world and events after 2021
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatSuggestions;
