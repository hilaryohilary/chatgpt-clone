import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { PiSpinner } from "react-icons/pi";
import { IoMenuOutline, IoAdd, IoPersonOutline } from "react-icons/io5";
import { LiaEllipsisHSolid } from "react-icons/lia";
import Image from "next/image";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import {
  groupByDateCategory,
  chatHistory,
  sortByDate,
} from "../helperFunctions/groupByDateCategory";

type SidebarComponentProps = {
  onSideBarOpen: (value: boolean) => void;
};

const SidebarComponent: React.FC<SidebarComponentProps> = ({
  onSideBarOpen,
}) => {
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [signOut, loading, error] = useSignOut(auth);

  const [userCredentials] = useAuthState(auth);
  const prevChatHistory = localStorage.getItem("chat-history");
  const [loadingChats, setloadingChats] = useState(true);

  const [sortedandGroupedChatData, setSortedAndGroupedChatData] = useState<{
    [key: string]: chatHistory[];
  }>({});

  const handleLogOut = async () => {
    await signOut();
  };

  useEffect(() => {
    onSideBarOpen(openSidebar);
    const parsedprevChatHistory = prevChatHistory
      ? JSON.parse(prevChatHistory)
      : [];
    const sortedChat = sortByDate(parsedprevChatHistory);
    const groupedChat = groupByDateCategory(sortedChat);
    setSortedAndGroupedChatData(groupedChat);
    setTimeout(() => {
      setloadingChats(false);
    }, 2000);
  }, [onSideBarOpen, openSidebar, prevChatHistory, loadingChats]);

  // console.log(sortedandGroupedChatData);
  // const zzz = Object.entries(sortedandGroupedChatData).map(
  //   ([category, items]) =>
  //     items
  //       .filter((item) => item.id !== "")
  //       .map((item) => console.log(item.chatSessions[0]))
  // );
  // console.log(zzz);
  return (
    <>
      <nav className="md:hidden bg-gray-900 text-gray-light flex justify-between p-2 items-center">
        <IoMenuOutline
          size={24}
          onClick={() => {
            setOpenMobileSidebar(true);
          }}
          className="cursor-pointer"
        />
        <h1 className="text-center font-normal">New Chat</h1>
        <IoAdd size={24} onClick={() => {}} className="cursor-pointer" />
      </nav>
      <nav
        className={`fixed top-0 right-0 left-0 bottom-0 h-screen overflow-y-auto md:w-[250px] w-[320px] bg-gray-900 p-2 text-white transition ease-in-out z-20 ${
          openSidebar ? "md:translate-x-0" : "md:translate-x-[-250px]"
        } ${
          openMobileSidebar === true ? "translate-x-0" : "translate-x-[-320px]"
        } duration-300`}
      >
        <div className="flex flex-row items-center text-center justify-between left-0 right-0">
          <a
            className="border-white/20 border p-2 w-full md:w-[180px] gap-2 text-sm rounded-md flex flex-row items-center cursor-pointer duration-200 hover:bg-background-focus-dark"
            href="/"
          >
            <BsPlus size={16} /> <span>New Chat</span>
          </a>

          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="hidden md:block p-2.5 rounded border border-white/20  hover:bg-background-focus-dark duration-200"
          >
            <Image src="/window.svg" alt="menu" height={16} width={16} />
          </button>
        </div>

        {loadingChats ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <PiSpinner size={26} className="animate-spin" />
            </div>
          </div>
        ) : (
          Object.entries(sortedandGroupedChatData).map(([category, items]) => (
            <div key={category} className="relative">
              <div className="sticky top-0 z-[16]">
                <h3 className=" h-9 pb-2 pt-3 px-3 text-xs text-gray-500 font-medium text-ellipsis overflow-hidden break-all bg-gray-900">
                  {category}
                </h3>
              </div>
              <ol>
                {items
                  .filter((item) => item.id !== "")
                  .map((item, index) => (
                    <li key={index} className="relative z-[15]">
                      {item.chatSessions[0] !== undefined ? (
                        <a
                          href={`/${item.id}`}
                          className="flex flex-row items-center py-3 px-3 gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 text-sm"
                        >
                          <FiMessageSquare size={18} />

                          <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                            {item.chatSessions[0] !== undefined
                              ? `User Prompt: ${item.chatSessions[0].content.slice(
                                  0,
                                  20
                                )}`
                              : ""}
                            <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
                          </div>
                        </a>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
              </ol>
            </div>
          ))
        )}
        <div className="absolute bottom-0 flex flex-col border-t-[1px] border-gray-500 left-0 right-0">
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
            href="#"
            className="flex flex-row items-center py-3 px-3 gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 text-sm mt-2"
            onClick={handleLogOut}
          >
            <BiLogOut size={16} />
            <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
              Log Out
            </div>
          </a>

          <a
            href=""
            className="flex flex-row items-center py-3 px-3 gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 text-sm group"
          >
            {userCredentials?.photoURL === null ||
            userCredentials?.photoURL === undefined ? (
              <h3 className="py-1 px-2 rounded bg-gray-700">
                {userCredentials?.displayName?.charAt(0)}
              </h3>
            ) : (
              <Image
                src={userCredentials.photoURL}
                alt=""
                width={28}
                height={28}
              />
            )}

            <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
              {userCredentials?.displayName}
            </div>
            <LiaEllipsisHSolid size={16} />
          </a>
        </div>
      </nav>
      <div
        className={`md:hidden cursor-pointer border-2 z-20 text-gray-lightest border-gray-lightest absolute left-[320px] top-0 p-1 m-2 ${
          openMobileSidebar ? "" : "hidden"
        }`}
      >
        <IoMdClose
          size={25}
          onClick={() => {
            setOpenMobileSidebar(false);
          }}
          className="duration-300"
        />
      </div>
      {openMobileSidebar && (
        <div
          className="md:hidden absolute top-0 right-0 left-0 bottom-0 bg-black opacity-70 z-10"
          onClick={() => {
            setOpenMobileSidebar(false);
          }}
        ></div>
      )}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className={`hidden ${
          !openSidebar ? "md:block" : ""
        } fixed mt-2 ml-2 p-3 rounded border border-black/20 hover:bg-gray-lightest duration-200 cursor-pointer group`}
      >
        <Image src="/window-dark.svg" alt="menu" height={16} width={16} />
      </button>
    </>
  );
};
export default SidebarComponent;
