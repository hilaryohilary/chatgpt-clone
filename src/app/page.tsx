"use client";
import { useState } from "react";
import { BsSun } from "react-icons/bs";
import SidebarComponent from "./components/SidebarComponent";
import FloatingInputComponent from "./components/FloatingInputComponent";
import ChatSuggestions from "./components/ChatSuggestions";
import ChatSessions from "./components/ChatSessions";

export default function Home() {
  const [openSideBar, setopenSideBar] = useState(false);

  const handleSidebarOpen = (value: boolean) => {
    setopenSideBar(value);
  };
  return (
    <div className="">
      <SidebarComponent onSideBarOpen={handleSidebarOpen} />

      {/* <ChatSuggestions openSideBar /> */}
      <ChatSessions sideBarOpened={openSideBar} />
      <FloatingInputComponent sideBarOpened={openSideBar} />
    </div>
  );
}
