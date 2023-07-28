import React, { useEffect, useState } from "react";
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
      } text-dark dark:transparent bottom-0 w-screen`}
    >
      {onResponseLoading && (
        <button className=" group mx-auto mb-2 hidden items-center gap-2 rounded border border-black/10 p-2 text-sm text-gray-700 hover:bg-gray-lightest dark:text-gray-100 dark:hover:text-gray-800 md:flex">
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
        className="shadow-xs dark:shadow-xs to-bg-white relative flex w-full flex-grow flex-col rounded-xl border border-black/10 bg-white bg-gradient-to-b from-transparent px-2 py-[10px] dark:border-gray-900/50 dark:bg-gray-700 dark:from-gray-700/10 dark:to-gray-700 dark:text-white md:border-0 md:py-4 md:pl-4"
        onSubmit={handleSubmitPrompt}
      >
        <div
          className="relative flex h-full flex-1 items-stretch md:flex-col"
          role="presentation"
        >
          <div className="shadow-xs dark:shadow-xs relative mx-auto flex w-full flex-col rounded-xl border border-black/10 bg-white py-[10px] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white md:w-4/5 md:py-4 md:pl-4">
            <textarea
              onChange={handleInputPrompt}
              tabIndex={ 0 }
              placeholder="Send a message"
              className="m-0 h-6 max-h-[200px] w-full resize-none overflow-y-hidden border-0 bg-transparent p-0 pl-3 pr-10 outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 md:pr-12 "
              value={ userPrompt }
              rows={ 5 }
              cols={5}
              autoFocus={true}
            ></textarea>
            {onResponseLoading ? (
              <button
                className={`enabled:bg-brand-purple } absolute bottom-1.5 right-2 rounded-md p-1 text-white transition-colors disabled:text-gray-400 disabled:opacity-40 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent md:bottom-3 md:right-3 
                md:p-1`}
                disabled={true}
              >
                <span className="">
                  <BiDotsHorizontal className=" animate-pulse" size={18} />
                </span>
              </button>
            ) : (
              <button
                className={`enabled:bg-brand-purple absolute bottom-1.5 right-2 rounded-md p-1 text-white transition-colors disabled:text-gray-400 disabled:opacity-40 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent md:bottom-3 md:right-3 md:p-1 ${
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
        <span className="mx-auto mt-2 text-center text-[12px] text-gray-900 dark:text-gray-100">
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
