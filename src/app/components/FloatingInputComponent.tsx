import React, { useCallback, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { BsStop } from "react-icons/bs";
import { BiDotsHorizontal } from "react-icons/bi";

type FloatingInputComponentProps = {
  sideBarOpened: boolean;
  onSubmitPrompt: (value: string) => void;
  onResponseLoading: boolean;
};

const FloatingInputComponent: React.FC<FloatingInputComponentProps> = ({
  sideBarOpened,
  onSubmitPrompt,
  onResponseLoading,
}) => {
  const [inputPresent, setinputPresent] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const handleInputPrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setinputPresent(true);
      setUserPrompt(e.target.value);
    } else {
      setinputPresent(false);
      setUserPrompt("");
    }
  };


  const handleSubmitPrompt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userPrompt === null || userPrompt === "") return;
    onSubmitPrompt(userPrompt.trim());
    setUserPrompt("");
  };

  useEffect(() => {
    const handleEnterKeyPress = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      if (userPrompt) {
        onSubmitPrompt(userPrompt.trim());
        setUserPrompt("");
      }
    };
    window.addEventListener("keypress", handleEnterKeyPress);
    return () => {
      window.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, [userPrompt, onSubmitPrompt]);

  return (
    <div
      className={`fixed ${
        sideBarOpened ? "md:pl-[250px]" : ""
      } bottom-0 text-dark w-screen dark:transparent`}
    >
      {onResponseLoading && (
        <button className=" hidden p-2 border border-black/10 rounded mx-auto md:flex items-center mb-2 text-gray-700 dark:text-gray-100 gap-2 group text-sm hover:bg-gray-lightest dark:hover:text-gray-800">
          <BsStop size={16} className=" animate-spin" />
          <span>Stop generating</span>
        </button>
      )}
      {/*
      <button className="p-2 border border-black/10 rounded mx-auto flex items-center mb-2 text-gray-700 gap-2 group text-sm hover:bg-gray-lightest ">
        <BiRefresh
          size={16}
          className="group-active:animate-spin"
        />
        <span>Regenerate response</span>
      </button> */}
      <form
        className="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 md:border-0 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs px-2 bg-gradient-to-b from-transparent to-bg-white dark:from-gray-700/10 dark:to-gray-700"
        onSubmit={handleSubmitPrompt}
      >
        <div
          className="relative flex h-full flex-1 items-stretch md:flex-col"
          role="presentation"
        >
          <div className="flex flex-col w-full py-[10px] md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs md:w-4/5 mx-auto">
            <textarea
              onChange={handleInputPrompt}
              tabIndex={0}
              placeholder="Send a message"
              className="m-0 w-full resize-none outline-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0 h-6 overflow-y-hidden max-h-[200px] "
              value={userPrompt}
              autoFocus={true}
            ></textarea>
            {onResponseLoading ? (
              <button
                className={`absolute rounded-md md:bottom-3 p-1 md:p-1 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 text-white enabled:bg-brand-purple bottom-1.5 transition-colors disabled:opacity-40 
                }`}
                disabled={true}
              >
                <span className="">
                  <BiDotsHorizontal className=" animate-pulse" size={18} />
                </span>
              </button>
            ) : (
              <button
                className={`absolute rounded-md md:bottom-3 p-1 md:p-1 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40 ${
                  inputPresent ? "bg-[#19C37D]" : ""
                }`}
                disabled={!inputPresent}
              >
                <span className="">
                  <IoSend size={20} className="" />
                </span>
              </button>
            )}
          </div>
        </div>
        <span className="mx-auto mt-2 text-[12px] text-gray-900 text-center dark:text-gray-100">
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts.{" "}
          <a
            href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            ChatGPT May 24 Version
          </a>
        </span>
      </form>
    </div>
  );
};
export default FloatingInputComponent;
