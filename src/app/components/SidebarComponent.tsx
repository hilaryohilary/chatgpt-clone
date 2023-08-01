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
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  const handleLogOut = async () => {
   localStorage.removeItem('token');
    await signOut();
    router.push('/auth');
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
      <nav className="flex items-center justify-between bg-gray-900 p-2 text-gray-light md:hidden">
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
        className={`fixed bottom-0 left-0 right-0 top-0 z-20 h-screen w-[320px] overflow-y-auto bg-gray-900 p-2 text-white transition ease-in-out md:w-[250px] ${
          openSidebar ? "md:translate-x-0" : "md:translate-x-[-250px]"
        } ${
          openMobileSidebar === true ? "translate-x-0" : "translate-x-[-320px]"
        } duration-300`}
      >
        <div className="left-0 right-0 flex flex-row items-center justify-between text-center">
          <a
            className="flex w-full cursor-pointer flex-row items-center gap-2 rounded-md border border-white/20 p-2 text-sm duration-200 hover:bg-background-focus-dark md:w-[180px]"
            href="/"
          >
            <BsPlus size={16} /> <span>New Chat</span>
          </a>

          <button
            onClick={() => setOpenSidebar(false)}
            className="hidden rounded border border-white/20 p-2.5 duration-200  hover:bg-background-focus-dark md:block"
          >
            <Image src="/window.svg" alt="menu" height={16} width={16} />
          </button>
        </div>

        {loadingChats ? (
          <div className="flex h-20 items-center justify-center">
              <PiSpinner size={20} className="animate-spin" />
          </div>
        ) : (
          Object.entries(sortedandGroupedChatData).map(([category, items]) => (
            <div key={category} className="relative">
              <div className="sticky top-0 z-[16]">
                <h3 className=" h-9 overflow-hidden text-ellipsis break-all bg-gray-900 px-3 pb-2 pt-3 text-xs font-medium text-gray-500">
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
                          className="relative flex cursor-pointer flex-row items-center gap-3 break-all rounded-md px-3 py-3 text-sm hover:bg-[#2A2B32] hover:pr-4"
                        >
                          <FiMessageSquare size={18} />

                          <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
                            {item.chatSessions[0] !== undefined
                              ? `User Prompt: ${item.chatSessions[0].content.slice(
                                  0,
                                  20
                                )}`
                              : ""}
                            <div className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
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
        <div className="absolute bottom-0 left-0 right-0 flex flex-col border-t-[1px] border-gray-500">
          <a
            href=""
            className="relative mt-2 flex cursor-pointer flex-row items-center gap-3 break-all rounded-md px-3 py-3 text-sm hover:bg-[#2A2B32] hover:pr-4"
          >
            <IoPersonOutline size={16} />
            <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
              Upgrade to Plus
            </div>
            <span className=" rounded-md bg-orange-300 p-1 text-black">
              NEW
            </span>
          </a>
          <a
            href="#"
            className="relative mt-2 flex cursor-pointer flex-row items-center gap-3 break-all rounded-md px-3 py-3 text-sm hover:bg-[#2A2B32] hover:pr-4"
            onClick={handleLogOut}
          >
            <BiLogOut size={16} />
            <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
              Log Out
            </div>
          </a>

          <a
            href=""
            className="group relative flex cursor-pointer flex-row items-center gap-3 break-all rounded-md px-3 py-3 text-sm hover:bg-[#2A2B32] hover:pr-4"
          >
            {userCredentials?.photoURL === null ||
            userCredentials?.photoURL === undefined ? (
              <h3 className="rounded bg-gray-700 px-2 py-1">
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

            <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
              {userCredentials?.displayName}
            </div>
            <LiaEllipsisHSolid size={16} />
          </a>
        </div>
      </nav>
      <div
        className={`absolute left-[320px] top-0 z-20 m-2 cursor-pointer border-2 border-gray-lightest p-1 text-gray-lightest md:hidden ${
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
          className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black opacity-70 md:hidden"
          onClick={() => {
            setOpenMobileSidebar(false);
          }}
        ></div>
      )}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className={`hidden ${
          !openSidebar ? "md:block" : ""
        }fixed ml-2 mt-2 cursor-pointer rounded border border-black/20 p-3 duration-200 hover:bg-gray-500 dark:border-gray-100`}
      >
        <Image
          className="dark:hidden block"
          src="/window-dark.svg"
          alt="menu"
          height={16}
          width={16}
        />
        <Image
          className="hidden dark:block"
          src="/window.svg"
          alt="menu"
          height={16}
          width={16}
        />
      </button>
    </>
  );
};
export default SidebarComponent;
