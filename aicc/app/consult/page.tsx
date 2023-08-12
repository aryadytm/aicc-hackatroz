"use client"

import ChatFragment from "@/components/ChatFragment"
import ChatSidebar from "@/components/ChatSidebar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import React, { useEffect, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { ChatItem } from "@/lib/models/ChatItem"
import { Input } from "@/components/ui/input"
import { convertPDFToText } from "@/lib/utils" // Import the PDF conversion utility

const initialMessages: ChatItem[] = []

export default function Consult() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isButtonEnabled, setIsButtonEnabled] = useState(true)
  const [messages, setMessages] = useState(initialMessages)
  const [cvText, setCvText] = useState("")
  const [input, setInput] = useState("")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const onTextInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const onAskButtonClicked = async () => {
    if (input.length === 0) {
      return
    }

    setInput("")
    setIsButtonEnabled(false)
    setMessages([ ...messages, { role: "user", content: input }, { role: "assistant", content: "" } ])
    
    const promptMessages: ChatItem[] = [
      {
        role: "system",
        content: `You are AI Career Consultant designed by Arya Adyatma. User give you the CV or Portfolio, then they can ask anything about the CV or Portfolio. IMPORTANT: Don't answer questions that are out of the scope of AI Career Consultant. This is the CV uploaded by user in raw plaintext (converted from PDF):\n\n${cvText}`,
      },
      {
        role: "user",
        content: "how to build muscle?",
      },
      {
        role: "assistant",
        content: "Sorry, as AI Career Consultant, I can't answer out of topic questions such as how to build muscle.",
      },
      ...messages.slice(1),
      // {
      //   role: "user",
      //   content: `Hi AI Career Consultant. Here is my CV in plaintext: \n\n\`\`\`${cvText}\n\`\`\`\n. Here is my worries about my CV: "${input}". (NOTE: If my worries is about something outside of my CV, please don't answer me)`
      // }
      {
        role: "user",
        content: `${input}`,
      },
    ]
    
    console.log(JSON.stringify(promptMessages))

    const response = await fetch("/api/consult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: promptMessages }),
    })
    const data = await response.json()
    let resp: string = data.response 
    resp = resp.replace("Assistant: ", "")

    setMessages([...messages, { role: "user", content: input }, { role: "assistant", content: resp }])
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      onAskButtonClicked()
    }
  }
  
  const onFinishedTyping = () => {
    setIsButtonEnabled(true)
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const text = await convertPDFToText(file)
      setIsButtonEnabled(false)
      setCvText(text)
      setMessages([
        // { role: "assistant", content: `Upload CV Success. Here is your CV: ${text}` }
        { role: "assistant", content: "Hello, I have received your uploaded CV. Now you're ready to consult with me regarding your career. Please ask me anything." },
      ])
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row bg-white w-full h-12 items-center">
        <RxHamburgerMenu className="ml-4" onClick={toggleSidebar} />
        <p className="text-slate-500 text-l font-medium ml-4">AI Career Consultant</p>
        <p className="text-blue-700 text-xs border border-blue-700 bg-blue-50 rounded-xl px-1 ml-2 w-fit h-fit">Consult</p>
      </div>

      <div className="grow flex flex-row bg-slate-100">
        <ChatSidebar className={`${isSidebarOpen ? "hidden" : ""} sm:${isSidebarOpen ? "block" : "hidden"}`} />
        {cvText.length > 0 ? (
          <ChatFragment
            messages={messages}
            className={`${!isSidebarOpen ? "hidden" : "flex"} md:flex flex-auto flex-col max-h-screen`}
            messageFieldValue={input}
            isButtonEnabled={isButtonEnabled}
            onInputChanged={onTextInputChanged}
            onButtonClicked={onAskButtonClicked}
            onKeyDown={onKeyDown}
            onFinishedTyping={onFinishedTyping}
          />
        ) : (
          <div
            className={`${
              !isSidebarOpen ? "hidden" : "flex"
            } md:flex flex-grow flex-col gap-2 h-fit m-auto max-w-xs md:max-w-xl bg-white p-4 rounded-2xl`}>
            <p className="font-bold">Upload Your CV</p>
            <p className="">Before you can consult you career with the AI, please upload your CV in PDF.</p>
            <Input
              className="rounded-full bg-green-100 hover:bg-green-200 border-none"
              id="file_cv"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}
