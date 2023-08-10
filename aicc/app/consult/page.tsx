"use client"

import ChatFragment, { ChatItem } from "@/components/ChatFragment"
import ChatBubble from "@/components/ChatBubble"
import ChatSidebar from "@/components/ChatSidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ChatTopbar from "@/components/ChatTopbar"

import React, { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"


const messages: Array<ChatItem> = [
  {sender: "User", message: "Please tell me how to improve my CV"},
  {sender: "AI Career Consultant", message: "Here are some tips to improve your CV."},
]

export default function Consult() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row bg-white w-full h-12 items-center">
        <RxHamburgerMenu className="ml-4" onClick={toggleSidebar} />
        <p className="text-slate-500 text-l font-medium ml-4">AI Career Consultant</p>
        <p className="text-blue-700 text-xs border border-blue-700 bg-blue-50 rounded-xl px-1 ml-2 w-fit h-fit">Experiment</p>
      </div>

      <div className="grow flex flex-row bg-slate-100">
        <ChatSidebar className={`${isSidebarOpen ? "" : "hidden"}`} />
        <ChatFragment
          messages={messages}
          className={`${isSidebarOpen ? "hidden" : "flex"} flex-auto md:flex flex-col max-h-screen`}
        />
      </div>
    </div>
  )
}
