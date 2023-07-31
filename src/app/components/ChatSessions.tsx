import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { BsThreeDots } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./chatSession.css";
import CodeBlock from "./Codeblock";

type ChatSessionsProps = {
  sideBarOpened: boolean;
  chatSession: { role: string; content: string }[];
  onResponseLoading: boolean;
};

const ChatSessions: React.FC<ChatSessionsProps> = ({
  sideBarOpened,
  chatSession,
  onResponseLoading,
}) => {
  const [userCredentials] = useAuthState(auth);

  function formatString(inputString) {
    const formattedString = inputString.replace(/\. (\*|\d+\.) /g, "$1<br>");

    return <div dangerouslySetInnerHTML={{ __html: formattedString }} />;
  }

  function shouldDisplayAsMarkdown(inputString) {
    const markdownRegex =
      /^#{1,6}\s|\n(?:\s{0,4}[*+-]\s|\s{0,4}\d+\.\s)|[*_]{1,2}|[`~]{1,3}/;
    return markdownRegex.test(inputString);
  }

  return (
    <div
      className={`${
        sideBarOpened ? "md:pl-[250px]" : ""
      } m-0 font-[400] text-gray-800 dark:bg-gray-800 dark:text-gray-100`}
    >
      {chatSession.map((chat, index) => (
        <div
          key={index}
          className={`border-b border-black/10 ${
            chat.role === "user"
              ? ""
              : "bg-gray-50 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-700"
          } ${
            chat === chatSession[chatSession.length - 1] ? "mb-[140px]" : ""
          }`}
        >
          <div
            className={`
            m-auto flex items-start justify-between gap-4 p-4 px-2 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-[38rem] lg:px-0 xl:max-w-3xl`}
          >
            {chat.role === "user" ? (
              <h1 className="rounded bg-gray-700 px-3 py-1 text-white">
                {userCredentials?.displayName?.charAt(0)}
              </h1>
            ) : (
              <Image
                src="gpt.svg"
                alt=""
                width={35}
                height={35}
                className="rounded bg-[#19C37D] p-1 text-white"
              />
            )}

            <div className={`w-full p-1`}>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code: CodeBlock,
                } }
                className="overflow-x chats max-w-[80vw] list-decimal overflow-x-hidden text-sm md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl"
              >
                {chat.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}

      {onResponseLoading && (
        <div className=" bg-gray-50 dark:bg-gray-700">
          <div
            className="
            m-auto mb-[200px] mt-[-140px] flex items-start justify-between gap-4 p-4 px-2 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-[38rem] lg:px-0 xl:max-w-3xl "
          >
            <Image
              src="gpt.svg"
              alt=""
              width={35}
              height={35}
              className="rounded bg-[#19C37D] p-1 text-white"
            />
            <div className="w-full p-1">
              <BsThreeDots className="animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatSessions;
