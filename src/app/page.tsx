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
  const router = useRouter();
  const [userCredentials] = useAuthState(auth);
  const [userPrompt, setUserPrompt] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);
  const [chatSessions, setChatSessions] = useState<
    Array<{ role: String; content: String }>
  >([]);

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
      const response = await chatWithAi(
        value,
        chatSessions
      );
    if (!response) return;
      setChatSessions((prevChatSessions) => [
       ...prevChatSessions,
       { role: "assistant", content: response.responseText },
     ]);
    setResponseLoading(response.responseLoading);
    console.log(response.responseLoading);
    
    

     
  };

  useEffect(() => {
    if (userCredentials === null || userCredentials === undefined) {
      router.push("/");
    }
  }, [userCredentials, router]);

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
