"use client";
import { useState, useEffect } from "react";
import SidebarComponent from "./components/SidebarComponent";
import FloatingInputComponent from "./components/FloatingInputComponent";
import ChatSuggestions from "./components/ChatSuggestions";
import ChatSessions from "./components/ChatSessions";
import { useRouter } from "next/navigation";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { chatWithAi } from "./api/chat";

export default function Home() {
  const [openSideBar, setopenSideBar] = useState(false);
  const [userCredentials] = useAuthState(auth);
  const [userPrompt, setUserPrompt] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<
    Array<{ role: String; content: String }>
    >([]);
  
  const [id, setId] = useState('');
  const router = useRouter();


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
    if (userCredentials) {
      if (chatSessions.length !== 0) {
        const today = new Date().toLocaleDateString();
        const storedData = localStorage.getItem("chat-history");
        const dataArray = storedData ? JSON.parse(storedData) : [];
        const IndexToUpdate = dataArray.findIndex(
          (obj: any) => obj.date === today
        );
        if (IndexToUpdate !== -1) {
          dataArray[IndexToUpdate] = { date: today, chatSessions, id };
        } else {
          dataArray.push({ date: today, chatSessions, id });
        }

        localStorage.setItem("chat-history", JSON.stringify(dataArray));

        
      }
      return;
    }
    // router.push("/auth");
  }, [userCredentials, router, chatSessions, id]);

  return (
    <div className="">
      <SidebarComponent onSideBarOpen={handleSidebarOpen} />

      {userPrompt ? (
        <ChatSessions
          sideBarOpened={openSideBar}
          chatSession={chatSessions}
          onResponseLoading={responseLoading}
        />
      ) : (
        <ChatSuggestions openSideBar />
      )}

      <FloatingInputComponent
        sideBarOpened={openSideBar}
        onSubmitPrompt={handleUserPrompt}
        onResponseLoading={responseLoading}
      />
    </div>
  );
}
