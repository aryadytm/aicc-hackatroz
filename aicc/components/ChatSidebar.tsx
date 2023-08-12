import { twMerge } from "tailwind-merge"
import { SlLogout, SlQuestion, SlPlus } from "react-icons/sl"
import { AiOutlinePlus } from "react-icons/ai"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

interface ChatSidebarProps {
  className?: string
}

const helpMarkdown = `
**Q: What is AI Career Consultant?**\n
A: AI Career Consultant is a platform that uses AI to provide career advice based on the uploaded CV or portfolio.\n
\n
**Q: What are possible uses of AI Career Consultant?**\n
A: You can ask AI Career Consultant to do various things below:\n
- Review your CV's strength and weakness, and how to overcome them.
- Suggest best position and company based on your CV.
- Recommend training and courses to improve your skills.
- Ask for interview simulation by generating related interview questions.
\n
**Q: Can I use languages other than English?**\n
A: Currently, AI Career Consultant is trained on English data. Other languages might not work correctly. We recommended you to use English CV only.
`

const ChatSidebar: React.FC<ChatSidebarProps> = ({ className }) => {
  return (
    <div className={twMerge("bg-white min-w-[256px] m-4 rounded-2xl", className)}>
      <div className="flex flex-col min-h-full">
        {/* <p className="text-slate-500 mt-4 ml-4 text-l font-medium">AI Career Consultant</p>
        <p className="text-blue-700 text-xs border border-blue-700 bg-blue-50 rounded-xl px-1 ml-4 w-fit">Experiment</p> */}
        <Link href="/consult" onClick={() => window.location.reload()}>
          <div className="flex flex-row bg-blue-100 rounded-full p-2 m-2 mt-4 hover:bg-blue-200">
            <AiOutlinePlus size={14} className="my-auto ml-2" />
            <p className="ml-4 my-auto font-medium">New consultation</p>
          </div>
        </Link>

        <Dialog>
          <DialogTrigger>
            <div className="flex flex-row bg-blue-100 rounded-full p-2 m-2 hover:bg-blue-200">
              <SlQuestion size={14} className="my-auto ml-2" />
              <p className="ml-4 my-auto font-medium">Help</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-primary">AI Career Consultant Help & FAQ</DialogTitle>
            <DialogDescription>
              <ReactMarkdown className="text-slate-800 [&>p]:mt-2">{helpMarkdown}</ReactMarkdown>
            </DialogDescription>
          </DialogContent>
        </Dialog>

        <div className="flex-auto"></div>
        <Link href="/">
          <div className="flex flex-row bg-red-100 rounded-full p-2 m-2 mb-4 hover:bg-red-200">
            <SlLogout size={14} className="my-auto ml-2" />
            <p className="ml-4 my-auto font-medium">Sign out</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ChatSidebar
