"use client";
import { useState, useEffect } from "react";
import { BsSun } from "react-icons/bs";
import SidebarComponent from "./components/SidebarComponent";
import FloatingInputComponent from "./components/FloatingInputComponent";
import ChatSuggestions from "./components/ChatSuggestions";
import ChatSessions from "./components/ChatSessions";
import { useRouter } from "next/navigation";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [openSideBar, setopenSideBar] = useState(false);
  const router = useRouter();
  const [userCredentials] = useAuthState(auth);


  const handleSidebarOpen = (value: boolean) => {
    setopenSideBar(value);
  };

  useEffect(() => {
    if (userCredentials === null || userCredentials === undefined) {
      router.push("/");
    }
  }, [userCredentials, router]);

  
  return <div className="">
      <SidebarComponent onSideBarOpen={handleSidebarOpen} />

      {/* <ChatSuggestions openSideBar /> */}
      <ChatSessions sideBarOpened={openSideBar} />
      <FloatingInputComponent sideBarOpened={openSideBar} />
    </div>
}
