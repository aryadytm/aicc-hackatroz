import { twMerge } from "tailwind-merge"
import { SlLogout, SlQuestion, SlPlus } from "react-icons/sl"
import { AiOutlinePlus } from "react-icons/ai"

interface ChatSidebarProps {
  className?: string
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ className }) => {
  return (
    <div className={twMerge("bg-white min-w-[256px] m-4 rounded-2xl", className)}>
      <div className="flex flex-col min-h-full">
        {/* <p className="text-slate-500 mt-4 ml-4 text-l font-medium">AI Career Consultant</p>
        <p className="text-blue-700 text-xs border border-blue-700 bg-blue-50 rounded-xl px-1 ml-4 w-fit">Experiment</p> */}
        <div className="flex flex-row bg-blue-100 rounded-full p-2 m-2 mt-4">
          <AiOutlinePlus size={14} className="my-auto ml-2" />
          <p className="ml-4 my-auto">New consultation</p>
        </div>
        <div className="flex flex-row bg-blue-100 rounded-full p-2 m-2">
          <SlQuestion size={14} className="my-auto ml-2" />
          <p className="ml-4 my-auto">Help</p>
        </div>
        <div className="flex-auto"></div>
        <div className="flex flex-row bg-red-100 rounded-full p-2 m-2 mb-4">
          <SlLogout size={14} className="my-auto ml-2" />
          <p className="ml-4 my-auto">Sign out</p>
        </div>
      </div>
    </div>
  )
}


export default ChatSidebar