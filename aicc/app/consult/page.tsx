"use client"

import ChatFragment from "@/components/ChatFragment"
import ChatSidebar from "@/components/ChatSidebar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import React, { useEffect, useState, useRef } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { ChatItem } from "@/lib/models/ChatItem"
import { Input } from "@/components/ui/input"
import { convertPDFToText } from "@/lib/utils" // Import the PDF conversion utility
import { chatCompletion } from "@/lib/chat-completion"
import { LLMResult } from "langchain/schema"

const initialMessages: ChatItem[] = []

export default function Consult() {
  // Pre Consult
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ linkedinUrl, setLinkedinUrl ] = useState("")

  // Chat
  const [ messages, setMessages ] = useState(initialMessages)
  const [ cvText, setCvText ] = useState("")
  const [ input, setInput ] = useState("")
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(true)
  const [ isAskButtonEnabled, setAskButtonEnabled ] = useState(true)

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
    setAskButtonEnabled(false)
    setMessages([ ...messages, { role: "user", content: input }, { role: "assistant", content: "" } ])

    const promptMessages: ChatItem[] = [
      {
        role: "user",
        content: `You need to act as AI Career Consultant developed by Arya Adyatma. I give you the CV or Portfolio, then I can ask anything about the CV or Portfolio. IMPORTANT: Do not answer questions that are out of the scope of AI Career Consultant.\n\n`,
      },
      {
        role: "assistant",
        content:
          "Hi, I'm AI Career Consultant, and I have received your uploaded document. Now you can ask me anything about careers and your CV. Please don't talk anything outside of career consulting.",
      },
      ...messages.slice(1),
      {
        role: "user",
        content: `uploaded_document = "${cvText}" user_input = "${input}" (SYSTEM NOTE: This is AI Career Consultant program that responds based on uploaded_document. If user_input is not related to career consulting or the uploaded_document, please reject it politely)`,
      },
    ]

    console.log(JSON.stringify(promptMessages))

    let fullText = ""

    const completion = await chatCompletion(
      promptMessages,
      (token: string) => {
        // On LLM New Token Streaming
        fullText += token
        setMessages([ ...messages, { role: "user", content: input }, { role: "assistant", content: fullText.trim() } ])
        console.log(token)
      },
      (output: LLMResult) => {
        // LLM End
        setMessages([ ...messages, { role: "user", content: input }, { role: "assistant", content: output.generations[ 0 ][ 0 ].text.trim() } ])
        setAskButtonEnabled(true)
      }
    )
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isAskButtonEnabled) {
      event.preventDefault()
      onAskButtonClicked()
    }
  }

  const onFinishedTyping = () => {
    setAskButtonEnabled(true)
  }

  const downloadChat = () => {
    const chatText = messages.map((message) => `${message.role}: ${message.content}`).join("\n") // Convert messages array to text format
    const element = document.createElement("a")
    const file = new Blob([ chatText ], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "consultation.txt"
    document.body.appendChild(element)
    element.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[ 0 ]
    if (file) {
      const text = await convertPDFToText(file)

      if (text.length === 0) {
        setErrorMessage("Error: The uploaded CV doesn't contain text. The CV file may be an image, we don't support that right now. Please upload a file that contains text.")
        return
      }
      
      startConsulting(text)
    } else {
      setErrorMessage("Error reading uploaded CV file.")
    }
  }

  const handleClickConsult = async () => {
    // First, fetch the LinkedIn profile then convert it to plain text
    try {
      const response = await fetch(linkedinUrl)
      const html = await response.text()
      const doc = new DOMParser().parseFromString(html, "text/html")
      const linkedinPlainText = doc.body.innerText
    } catch (error) {
      console.error(error)
      setErrorMessage("Error fetching LinkedIn profile. Please make sure the URL is correct and try again.")
      return
    }

    setMessages(result.chatItems)
    setCvText(linkedinPlainText)
    setAskButtonEnabled(true)
  }
  
  const startConsulting = async (uploadedCvText: string) => {
    setErrorMessage("")
    setAskButtonEnabled(true)
    setCvText(uploadedCvText)
    setMessages([
      // { role: "assistant", content: `Upload CV Success. Here is your CV: ${text}` }
      { role: "assistant", content: "Hello, I have received your uploaded CV. Now you're ready to consult with me regarding your career. Please ask me anything." },
    ])
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row bg-white w-full h-12 items-center">
        <RxHamburgerMenu className="ml-4" onClick={toggleSidebar} />
        <p className="text-slate-500 text-l font-medium ml-4">AI Career Consultant</p>
        <p className="text-blue-700 text-xs border border-blue-700 bg-blue-50 rounded-xl px-1 ml-2 w-fit h-fit">Consult</p>
      </div>

      <div className="grow flex flex-row bg-slate-100">
        <ChatSidebar onDownloadChatClicked={downloadChat} className={`${isSidebarOpen ? "hidden" : ""} md:block`} />
        {cvText.length > 0 ? (
          <ChatFragment
            messages={messages}
            className={`${!isSidebarOpen ? "hidden" : "flex"} md:flex flex-auto flex-col max-h-screen`}
            messageFieldValue={input}
            isButtonEnabled={isAskButtonEnabled}
            onInputChanged={onTextInputChanged}
            onButtonClicked={onAskButtonClicked}
            onKeyDown={onKeyDown}
            onFinishedTyping={onFinishedTyping}
          />
        ) : (
            <div className={`${!isSidebarOpen ? "hidden" : "flex"} md:flex flex-grow flex-col gap-2 h-fit m-auto max-w-xs md:max-w-xl bg-white p-4 rounded-2xl`}>
              <p className="font-bold">Upload Your CV</p>
              <p className="">Before you can consult you career with the AI, please upload your CV in PDF.</p>
              <Input
                className="rounded-full bg-green-100 hover:bg-green-200 border-none"
                id="file_cv"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <p className="font-bold mt-8">OR Use A LinkedIn Profile</p>
              <p className="">You can also use your LinkedIn profile to consult your career.</p>
              <Input id="input_linkedin_profile" type="url" placeholder="https://www.linkedin.com/in/YOUR_USER_NAME" onChange={(event) => setLinkedinUrl(event.target.value)} />
              <Button className="mt-4">Consult</Button>
              <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
            </div>
        )}
      </div>
    </div>
  )
}
