import React, { useState, useEffect } from "react"
import { FaUser, FaRobot } from "react-icons/fa6"
import { Skeleton } from "./ui/skeleton"
import ReactMarkdown from "react-markdown"


const msPerWord = 20

interface ChatBubbleProps {
  author: string
  message: string
  avatar: string
  onFinishedTyping: () => any
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ author, message, onFinishedTyping }) => {
  const isBot = author.toLowerCase().includes("assistant")
  const userColor = isBot ? "text-blue-500" : "text-purple-500"
  const bg = isBot ? "bg-blue-500" : "bg-purple-500"
  const shadow = isBot ? "border border-blue-500 shadow-sm shadow-blue-500" : ""
  const Icon = isBot ? FaRobot : FaUser

  // const [displayMessage, setDisplayMessage] = useState(message)

  // Reenable button after 50ms * number of characters
  // Double the second character
  // Remove the undefined
  
  // useEffect(() => {
  //   if (!isBot) {
  //     setDisplayMessage(message)
  //     return;
  //   }
    
  //   if (message.length === 0) {
  //     return;
  //   }
    
  //   let thisMessage = message
  //   thisMessage = thisMessage.substring(0, 1) + thisMessage.charAt(1) + thisMessage.charAt(1) + thisMessage.substring(2)

  //   let index = 0
    
  //   const timer = setInterval(() => {
  //     if (index < thisMessage.length - 1) {
  //       setDisplayMessage((prev) => prev + thisMessage[index])
  //       index++
  //     } else {
  //       clearInterval(timer)
  //       onFinishedTyping()
  //     }
  //   }, msPerWord)
    
  //   return () => clearInterval(timer)
  // }, [ message ])

  return (
    <div className={`flex flex-row mb-4 mt-4 max-w-3xl mx-auto bg-white p-4 rounded-2xl ${shadow}`}>
      <div className={`mt-1`}>
        <Icon className={`text-white ${bg} p-2 rounded-full`} size={34} />
      </div>
      <div>
        <div className="flex flex-col ml-4">
          <h4 className={`font-bold text-sm ${userColor}`}>{isBot ? "AI Career Consultant" : "You"}</h4>
          <p className="break-words text-sm list-inside">
            {message.length === 0 ? (
              <Skeleton className="w-full h-4 rounded-full bg-blue-200" />
            ) : (
              <ReactMarkdown className="[&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2 [&>*:last-child]:mb-0">{message}</ReactMarkdown>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatBubble
