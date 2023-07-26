"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SidebarComponent from "../components/SidebarComponent";
import ChatSessions from "../components/ChatSessions";
import FloatingInputComponent from "../components/FloatingInputComponent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { chatWithAi } from "../api/chat";
import { getInitialChatState } from "../helperFunctions/getLocalStorage";
import ChatSuggestions from "../components/ChatSuggestions";
import { redirect } from "next/navigation";
import { GetServerSideProps } from "next";

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  const params = useParams();
  const { chatId } = params;
  const [openSideBar, setopenSideBar] = useState(false);
  const [userCredentials] = useAuthState(auth);
  const [responseLoading, setResponseLoading] = useState(false);

  const prevChat = getInitialChatState(chatId);

  const [chatSessions, setChatSessions] = useState<
    Array<{ role: string; content: string }>
    >(prevChat[0].chatSessions);
  
  const handleSidebarOpen = (value: boolean) => {
    setopenSideBar(value);
  }

  const handleUserPrompt =async(value: string) => {
    if (value === '') return;
     setChatSessions((prevChatSessions) => [
       ...prevChatSessions,
       { role: "user", content: value },
     ]);
    setResponseLoading(true);
    const response = await chatWithAi(value, chatSessions);
    if (!response) {
      setResponseLoading(false);
      return;
    }
    const storedData = localStorage.getItem("chat-history");
    const dataArray = storedData ? JSON.parse(storedData) : [];
    const IndexToUpdate = dataArray.findIndex((obj: any) => obj.id === chatId);
    console.log(IndexToUpdate);

    const updatedHistory = [
      ...prevChat[0].chatSessions,
      { role: "user", content: value },
      {role: "assistant", content: response.responseText}
    ]
    const updatedData = {
      date: new Date().toLocaleString(),
      chatSessions: updatedHistory,
      id: chatId
    }

    if (IndexToUpdate !== -1) {
      dataArray[IndexToUpdate] = updatedData;
    } else {
      dataArray.push(updatedData);
    }

    localStorage.setItem('chat-history', JSON.stringify(dataArray));
     setChatSessions((prevChatSessions) => [
       ...prevChatSessions,
       { role: "assistant", content: response.responseText },
     ]);
    
    setResponseLoading(false);

  }

  // useEffect(() => {
  //   if (!userCredentials) {
  //     redirect('/auth');
  //   }
  // })

  return (
    <div className="dark:bg-gray-800 h-screen overflow-y-auto">
      <SidebarComponent onSideBarOpen={handleSidebarOpen} />

      {prevChat[0].chatSessions[0] === undefined ? (
        <ChatSuggestions openSideBar />
      ) : (
        <ChatSessions
          sideBarOpened={openSideBar}
          chatSession={chatSessions}
          onResponseLoading={responseLoading}
        />
      )}

      <FloatingInputComponent
        sideBarOpened={openSideBar}
        onSubmitPrompt={handleUserPrompt}
        onResponseLoading={responseLoading}
      />
    </div>
  );
};
export default Page;
