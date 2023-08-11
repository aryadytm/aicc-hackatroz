"use client"

import ChatFragment from "@/components/ChatFragment"
import ChatBubble from "@/components/ChatBubble"
import ChatSidebar from "@/components/ChatSidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ChatTopbar from "@/components/ChatTopbar"

import React, { useEffect, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { ChatItem } from "@/lib/models/ChatItem"


const initialMessages: ChatItem[] = [
  // { role: "user", content: "Please tell me how to improve my CV" },
  // { role: "assistant", content: "Here are some tips to improve your CV." },
]

export default function Consult() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isButtonEnabled, setIsButtonEnabled] = useState(true)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  // useEffect(() => {
  //   // Default show sidebar on desktop
  //   const handleResize = () => {
  //     setIsSidebarOpen(window.innerWidth >= 768)
  //   }
  //   // window.addEventListener("resize", handleResize)
  //   handleResize()
  //   // return () => window.removeEventListener("resize", handleResize)
  // }, [])

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const onButtonClicked = async () => {
    if (input.length === 0) { return }
    
    setInput("")
    setIsButtonEnabled(false)
    
    const updatedMessages = [...messages, { role: "user", content: input }]
    setMessages([...updatedMessages, { role: "assistant", content: "(Writing...)" }])
    
    const response = await fetch("/api/consult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "messages": updatedMessages }),
    })
    const data = await response.json()
    
    setMessages([ ...updatedMessages, { role: "assistant", content: data.response } ])
    setIsButtonEnabled(true)
  }
  
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      onButtonClicked()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row bg-white w-full h-12 items-center">
        <RxHamburgerMenu className="ml-4" onClick={toggleSidebar} />
        <p className="text-slate-500 text-l font-medium ml-4">AI Career Consultant</p>
        <p className="text-blue-700 text-xs border border-blue-700 bg-blue-50 rounded-xl px-1 ml-2 w-fit h-fit">Experiment</p>
      </div>

      <div className="grow flex flex-row bg-slate-100">
        <ChatSidebar className={`${isSidebarOpen ? "hidden" : ""} md:${isSidebarOpen ? "block" : "hidden"}`} />
        <ChatFragment
          messages={messages}
          className={`${!isSidebarOpen ? "hidden" : "flex"} md:flex flex-auto flex-col max-h-screen`}
          messageFieldValue={input}
          isButtonEnabled={isButtonEnabled}
          onInputChanged={onInputChanged}
          onButtonClicked={onButtonClicked}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}
