"use client"
import { useParams } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import SidebarComponent from '../components/SidebarComponent';
import ChatSessions from '../components/ChatSessions';
import FloatingInputComponent from '../components/FloatingInputComponent';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { chatWithAi } from "../api/chat";


type pageProps = {
};

const Page:React.FC<pageProps> = () => {
    const params = useParams();
    const {chatId} = params;
    console.log(chatId);
     const [openSideBar, setopenSideBar] = useState(false);
     const [userCredentials] = useAuthState(auth);
     const [userPrompt, setUserPrompt] = useState("");
     const [responseLoading, setResponseLoading] = useState(false);
     const [chatSessions, setChatSessions] = useState<
       Array<{ role: String; content: String }>
     >([]);
    const [id, setId] = useState("");
    
    const prevChatHistory = localStorage.getItem('chat-history');
    const parsedprevChatHistory = prevChatHistory ? JSON.parse(prevChatHistory) : [];
    console.log(parsedprevChatHistory);
    

     const handleSidebarOpen = (value: boolean) => {
       setopenSideBar(value);
    };
     const handleUserPrompt = async (value: string) => {
       if (value === "") return;
       setUserPrompt(value);
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
       setChatSessions((prevChatSessions) => [
         ...prevChatSessions,
         { role: "assistant", content: response.responseText },
       ]);
       setId(response.chatId);
       console.log(id);

       setResponseLoading(response.responseLoading);
     };

    useEffect(() => {
      parsedprevChatHistory
        .filter((chat: any) => chatId === chat.id)
        .map((chat: any) => {
          if (chat) {
            console.log(chat["chatSessions"]);
            setChatSessions((prevChatSessions) => [
              ...prevChatSessions,
              ...chat["chatSessions"],
            ]);
          }
        });
    }, [chatId, parsedprevChatHistory])
    
     return (
       <div className="">
         <SidebarComponent onSideBarOpen={handleSidebarOpen} />

           <ChatSessions
             sideBarOpened={openSideBar}
             chatSession={chatSessions}
             onResponseLoading={responseLoading}
           />
         

         <FloatingInputComponent
           sideBarOpened={openSideBar}
           onSubmitPrompt={handleUserPrompt}
           onResponseLoading={responseLoading}
         />
       </div>
     );
}
export default Page;