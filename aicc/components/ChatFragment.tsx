import { twMerge } from "tailwind-merge"
import ChatBubble from "./ChatBubble"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ChatItem } from "@/lib/models/ChatItem"
import { useEffect, useRef } from "react"

interface ChatFragmentProps {
  messages: ChatItem[]
  className?: string
  messageFieldValue?: string
  isButtonEnabled?: boolean
  onInputChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onButtonClicked?: () => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onFinishedTyping: () => any
}

const ChatFragment: React.FC<ChatFragmentProps> = ({
  messages,
  className,
  messageFieldValue,
  isButtonEnabled,
  onInputChanged,
  onButtonClicked,
  onKeyDown,
  onFinishedTyping
}) => {
  
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }, [messages])
  
  return (
    <div className={twMerge("", className)}>
      <div className="flex-grow flex flex-col">
        <div className="flex-grow flex flex-col gap-2 overflow-auto h-0">
          <div className="container max-w-3xl">
            {messages &&
              messages.map((message, index) => (
                <ChatBubble
                  key={index}
                  author={message.role}
                  message={message.content}
                  avatar="" // Add the appropriate avatar here
                  onFinishedTyping={onFinishedTyping}
                />
              ))}
            <div className="" ref={ref}></div>
          </div>
        </div>

        <div className="flex-none container max-w-3xl">
          <div className="flex flex-row items-center gap-2 pb-4">
            <Input
              className="rounded-full shadow h-14 text-l"
              placeholder="Consult with AI"
              onChange={onInputChanged}
              onKeyDown={onKeyDown}
              value={messageFieldValue}
            />
            <Button className="h-14 bg-blue-500 rounded-full shadow shadow-blue-500" onClick={onButtonClicked} disabled={!isButtonEnabled}>
              Ask
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatFragment
