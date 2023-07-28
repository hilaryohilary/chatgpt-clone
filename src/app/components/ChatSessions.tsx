import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { BsThreeDots } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./chatSession.css";

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

  function wrapInPreWithBackTicks(str: string) {
    const regex = /```([^`]*)```/g;
    const formattedDiv = str
      .replace(regex, "<CodeBlock value={$1}/>")
      .replace(/\n/g, "<br/>");
    return <div dangerouslySetInnerHTML={{ __html: formattedDiv }} />;
  }
  function formatString(inputString) {
    const formattedString = inputString.replace(/\. (\*|\d+\.) /g, "<br/>");

    return <div dangerouslySetInnerHTML={{__html: formattedString}}/>;
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
              : "bg-gray-50 text-gray-100 dark:bg-gray-700"
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
              {chat.content.toString().includes("```") ? (
                <ReactMarkdown
                  remarkPlugins={[gfm]}
                  rehypePlugins={[rehypeRaw]}
                  className="md:max-w-2xl max-w-[80vw] overflow-x-hidden lg:max-w-[38rem] xl:max-w-3xl overflow-x"
                >
                  {chat.content}
                </ReactMarkdown>
              ) : (
                  formatString(chat.content)
              )}
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
