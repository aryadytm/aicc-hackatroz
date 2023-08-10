"use client"

import { twMerge } from "tailwind-merge"
import ChatBubble from "./ChatBubble"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export interface ChatItem {
  sender: string
  message: string
}

interface ChatFragmentProps {
  messages?: Array<ChatItem>
  className?: string
  onInputChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onButtonClicked?: () => void
}

const ChatFragment: React.FC<ChatFragmentProps> = ({ messages, className, onInputChanged, onButtonClicked }) => {
  return (
    <div className={twMerge("", className)}>
      <div className="flex-grow flex flex-col">
        <div className="flex-grow flex flex-col gap-2 overflow-auto h-0">
          <div className="container max-w-3xl">
            {messages &&
              messages.map((message, index) => (
                <ChatBubble
                  key={index}
                  author={message.sender}
                  message={message.message}
                  avatar="" // Add the appropriate avatar here
                />
              ))}
          </div>
        </div>

        <div className="flex-none container max-w-3xl">
          <div className="flex flex-row items-center gap-2 pb-4">
            <Input
              className="rounded-full shadow h-14 text-l"
              placeholder="Send a message"
              onChange={onInputChanged} // Add the onInputChanged event handler
            />
            <Button
              className="h-14 bg-blue-500 rounded-full shadow shadow-blue-500"
              onClick={onButtonClicked} // Add the onButtonClicked event handler
            >
              Ask
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatFragment
