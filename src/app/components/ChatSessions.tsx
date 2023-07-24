import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { BsThreeDots } from "react-icons/bs";

type ChatSessionsProps = {
  sideBarOpened: boolean;
  chatSession: { role: String; content: String }[];
  onResponseLoading: boolean;
};

const ChatSessions: React.FC<ChatSessionsProps> = ({
  sideBarOpened,
  chatSession,
  onResponseLoading,
}) => {
  const [userCredentials] = useAuthState(auth);

  return (
    <div
      className={`${
        sideBarOpened ? "md:pl-[250px]" : ""
      } text-gray-800 font-[400] m-0`}
    >
      {chatSession.map((chat, index) => (
        <div
          key={index}
          className={`border-b border-black/10 ${
            chat.role === "user" ? "" : "bg-gray-50"
          } ${
            chat === chatSession[chatSession.length - 1] ? "mb-[140px]" : ""
          }`}
        >
          <div
            className={`
            px-2 flex justify-between items-start p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto`}
          >
            {chat.role === "user" ? (
              <h1 className="text-white py-1 rounded px-3 bg-gray-700">
                {userCredentials?.displayName?.charAt(0)}
              </h1>
            ) : (
              <Image
                src="gpt.svg"
                alt=""
                width={35}
                height={35}
                className="bg-[#19C37D] p-1 rounded text-white"
              />
            )}

            <div className={`w-full p-1`}>
              <p>{chat.content}</p>
            </div>
          </div>
        </div>
      ))}

      {onResponseLoading && (
        <div className=" bg-gray-50">
          <div
            className="
            px-2 flex justify-between items-start p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto mt-[-140px]  "
          >
            <Image
              src="gpt.svg"
              alt=""
              width={35}
              height={35}
              className="bg-[#19C37D] p-1 rounded text-white"
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
