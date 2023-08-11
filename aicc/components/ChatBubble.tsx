import React from "react"
import { FaUser, FaRobot } from "react-icons/fa6"


interface ChatBubbleProps {
  author: string
  message: string
  avatar: string
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ author, message }) => {
  
  const isBot = author.toLowerCase().includes("assistant")
  const userColor = isBot ? "text-blue-600" : "text-slate-400"
  const bg = isBot ? "bg-blue-500" : "bg-gray-400"
  const shadow = isBot ? "border border-blue-500 shadow-sm shadow-blue-500" : ""
  const Icon = isBot ? FaRobot : FaUser
  
  return (
    <div className={`flex flex-row mb-4 mt-4 max-w-3xl mx-auto bg-white p-4 rounded-2xl ${shadow}`}>
      <div className={`mt-1`}>
        <Icon className={`text-white ${bg} p-2 rounded-full`} size={34} />
      </div>
      <div>
        <div className="flex flex-col ml-4">
          <h4 className={`font-medium text-sm ${userColor}`}>{isBot ? "AI Career Consultant" : "User"}</h4>
          <p className="break-words text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatBubble
