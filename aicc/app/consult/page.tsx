"use client"

import ChatFragment from "@/components/ChatFragment"
import ChatSidebar from "@/components/ChatSidebar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import React, { useEffect, useState, useRef } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { ChatItem } from "@/lib/models/ChatItem"
import { Input } from "@/components/ui/input"
import { convertPDFToText, getLinkedinUsername } from "@/lib/utils" // Import the PDF conversion utility
import { chatCompletion } from "@/lib/chat-completion"
import { LLMResult } from "langchain/schema"

const initialMessages: ChatItem[] = []

export default function Consult() {
  // Pre Consult
  const [errorMessage, setErrorMessage] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  // Chat
  const [messages, setMessages] = useState(initialMessages)
  const [cvText, setCvText] = useState("")
  const [userMessage, setInput] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAskButtonEnabled, setAskButtonEnabled] = useState(true)
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const onChatTextInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }
  
  const onCVFileInputChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      const text = await convertPDFToText(file)

      if (text.length === 0) {
        setErrorMessage(
          "Error: The uploaded CV doesn't contain text. The CV file may be an image, we don't support that right now. Please upload a file that contains text."
        )
        return
      }

      startConsulting(text)
    } else {
      setIsLoading(false)
      setErrorMessage("Error reading uploaded CV file.")
    }
  }
  
  const onClickConsultButton = async () => {
    if (linkedinUrl.length === 0) {
      return
    }
    // Fetch the LinkedIn profile using our backend service
    try {
      setIsLoading(true)
      const linkedinUsername = getLinkedinUsername(linkedinUrl)
      const linkedin_api_url = "https://aicc-python-api.bytebooster.dev"
      const response = await fetch(`${linkedin_api_url}/linkedin_profile/${linkedinUsername}`)
      const data = await response.json()

      if (data && data.result) {
        startConsulting(data.result)
      } else {
        setIsLoading(false)
        setErrorMessage("Error fetching LinkedIn profile. Please make sure the URL is correct and try again.")
      }
    } catch (error) {
      setIsLoading(false)
      setErrorMessage("Error fetching LinkedIn profile. Please make sure the URL is correct and try again.")
    }
  }

  const onClickAskButton = async () => {
    if (userMessage.length === 0) {
      return
    }

    setInput("")
    setAskButtonEnabled(false)
    setMessages([...messages, { role: "user", content: userMessage.slice(0, 1000) }, { role: "assistant", content: "" }])

    const getLastNMessages = (n: number) => {
      // Get last N messages except the first one in the messages array
      return messages.slice(-n).slice(1)
    }
    
    const promptMessages: ChatItem[] = [
      {
        role: "user",
        content: `You need to act as AI Career Consultant developed by Team Hackatroz for BINUS Hackathon SOCS 2023. The user will give you the CV or Portfolio, then they can ask anything about the CV or Portfolio. IMPORTANT: Do not answer questions that are out of the scope of AI Career Consultant.`,
      },
      {
        role: "assistant",
        content: `Sure, I can help you with that. Please upload your CV or Portfolio in PDF format. I will analyze it and then you can ask me anything about your CV or Portfolio. Make sure the document is CV and you must not ask anything that is out of the scope of AI Career Consultant.`,
      },
      {
        role: "user",
        content: `uploaded_document = """${cvText.slice(0, 8000)}"""\n\n(SYSTEM NOTE: This is AI Career Consultant program that responds based on uploaded_document. If user_input or uploaded_document is not related to career consulting, please reject it politely)`,
      },
      {
        role: "assistant",
        content: `Thank you for uploading your CV. Now you can ask me anything about your CV or Portfolio. Make sure the question is related to your career. If you ask anything that is out of the scope of AI Career Consultant, I will reject it politely.`,
      },
      ...getLastNMessages(5),
      {
        role: "user",
        content: `user_input = """${userMessage}"""`,
      },
    ]

    console.log(JSON.stringify(promptMessages))

    let fullText = ""

    const completion = await chatCompletion(
      promptMessages,
      (token: string) => {
        // On LLM New Token Streaming
        fullText += token
        setMessages([...messages, { role: "user", content: userMessage }, { role: "assistant", content: fullText.trim() }])
        console.log(token)
      },
      (output: LLMResult) => {
        // LLM End
        setMessages([...messages, { role: "user", content: userMessage }, { role: "assistant", content: output.generations[0][0].text.trim() }])
        setAskButtonEnabled(true)
      }
    )
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isAskButtonEnabled) {
      event.preventDefault()
      onClickAskButton()
    }
  }

  const onFinishedTyping = () => {
    // setAskButtonEnabled(true)
  }

  const downloadChat = () => {
    if (cvText.length === 0) {
      return
    }
    const chatText = messages.map((message) => `${message.role}: ${message.content}`).join("\n") // Convert messages array to text format
    const element = document.createElement("a")
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().slice(0, 19).replace(/[-T]/g, "_").replace(/:/g, "-")
    const filename = `AI-Career-Consultation_${formattedDate}.txt`
    const file = new Blob([chatText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
  }

  const startConsulting = async (uploadedCvText: string) => {
    setIsLoading(false)
    setErrorMessage("")
    setAskButtonEnabled(true)
    setCvText(uploadedCvText)
    setMessages([
      // { role: "assistant", content: `Upload CV Success. Here is your CV: ${text}` }
      {
        role: "assistant",
        content: "Hello, I have received your uploaded CV. Now you're ready to consult with me regarding your career. Please ask me anything.",
      },
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
            messageFieldValue={userMessage}
            isButtonEnabled={isAskButtonEnabled}
            onInputChanged={onChatTextInputChanged}
            onButtonClicked={onClickAskButton}
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
              onChange={onCVFileInputChanged}
            />
            <p className="font-bold mt-8">OR Use A LinkedIn Profile</p>
            <p className="">You can also use your LinkedIn profile to consult your career.</p>
            <Input
              id="input_linkedin_profile"
              type="url"
              placeholder="https://www.linkedin.com/in/YOUR-USER-NAME"
              onChange={(event) => setLinkedinUrl(event.target.value)}
            />
            <Button className="mt-4" onClick={onClickConsultButton} disabled={isLoading}>
              Consult
              </Button>
              {isLoading && (
                <p className="mt-2 text-sm text-slate-800">Reading your CV...</p>
              )}
            <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
