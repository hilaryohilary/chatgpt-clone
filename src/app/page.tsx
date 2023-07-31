"use client";
import { useState } from "react";
import SidebarComponent from "./components/SidebarComponent";
import FloatingInputComponent from "./components/FloatingInputComponent";
import ChatSuggestions from "./components/ChatSuggestions";
import ChatSessions from "./components/ChatSessions";
import { chatWithAi } from "./api/chat";
import withAuth from "./hoc/withAuth";
import { useHasMounted } from "./hooks/useHasMounted";


 function Home() {
  const [openSideBar, setopenSideBar] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<
    Array<{ role: string; content: string }>
    >([]);
  
  const [id, setId] = useState('');


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
      setId(response.chatId);

      const today = new Date().toLocaleDateString();
      const storedData = localStorage.getItem("chat-history");
      const dataArray = storedData ? JSON.parse(storedData) : [];
      const IndexToUpdate = dataArray.findIndex(
        (obj: any) => obj.date === today
      );
      const updatedChatSessions = [
        ...(IndexToUpdate !== -1 ? dataArray[IndexToUpdate].chatSessions : []),
        {role: "user", content: value},
        {role: "assistant", content: response.responseText}
      ];
      const updatedData = {
        date: today,
        chatSessions: updatedChatSessions,
        id,
      };

      if (IndexToUpdate !== -1) {
        dataArray[IndexToUpdate] = updatedData;
      } else {
        dataArray.push(updatedData);
      }

      localStorage.setItem("chat-history", JSON.stringify(dataArray));
    setChatSessions((prevChatSessions) => [
      ...prevChatSessions,
      { role: "assistant", content: response.responseText },
    ]);
    
    setResponseLoading(response.responseLoading);
  };

   const hasMounted = useHasMounted();

   if (!hasMounted) {
     return null;
   }

  return (
    <div className="dark:bg-gray-800 h-screen overflow-y-auto">
      <SidebarComponent onSideBarOpen={handleSidebarOpen} />

      {userPrompt ? (
        <ChatSessions
          sideBarOpened={openSideBar}
          chatSession={chatSessions}
          onResponseLoading={responseLoading}
        />
      ) : (
        <ChatSuggestions openSideBar={openSideBar} />
      )}

      <FloatingInputComponent
        sideBarOpened={openSideBar}
        onSubmitPrompt={handleUserPrompt}
        onResponseLoading={responseLoading}
      />
    </div>
  );
}
export default withAuth(Home);