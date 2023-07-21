import React from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

type ChatSessionsProps = {
  sideBarOpened: boolean;
};

const ChatSessions: React.FC<ChatSessionsProps> = ({ sideBarOpened }) => {
  const [userCredentials] = useAuthState(auth);

  return (
    <div
      className={`${
        sideBarOpened ? "md:pl-[250px]" : ""
      } text-gray-700 font-[400] m-0`}
    >
      <div className="px-2 flex justify-between items-start p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto">
              <h1 className="text-white py-1 rounded px-3 bg-gray-700">{ userCredentials?.displayName?.charAt(0)}</h1>
        <div className="w-full ">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus,
            blanditiis hic? Dolores voluptates deleniti tempora. Hic, adipisci
            ab, voluptatem nisi exercitationem voluptates esse nesciunt sunt
            voluptas, culpa facere odio facilis!
          </p>
        </div>
      </div>
      <div className="px-2 flex justify-between items-start p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto">
        <Image
          src="gpt.svg"
          alt=""
          width={35}
          height={35}
          className="bg-[#19C37D] p-1 rounded text-white"
        />
        <div className="w-full ">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus,
            blanditiis hic? Dolores voluptates deleniti tempora. Hic, adipisci
            ab, voluptatem nisi exercitationem voluptates esse nesciunt sunt
            voluptas, culpa facere odio facilis!
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChatSessions;
