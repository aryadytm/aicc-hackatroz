import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import SupabaseLogo from '../components/SupabaseLogo'
import NextJsLogo from '../components/NextJsLogo'
import { FaBusinessTime, FaBriefcase, FaWrench } from 'react-icons/fa6'
import { Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'


export const dynamic = 'force-dynamic'

const resources = [
  {
    title: "Suggest Best Company & Position based on Your CV",
    subtitle: "Personalized recommendations for your ideal company and position",
    icon: FaBriefcase,
  },
  {
    title: "Recommend Courses and Training to Improve Your Skills",
    subtitle: "Tailored course suggestions to enhance your skillset based on your weakness",
    icon: FaWrench,
  },
  {
    title: "AI Interview Simulation",
    subtitle: "Practice and prepare for job interviews to ace your next job",
    icon: FaBusinessTime,
  },
]

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-foreground">
          <div className="flex flex-row">
            <h1 className="text-slate-500 text-xl font-medium ml-4">AI Career Consultant</h1>
          </div>
          <div>
            {user ? (
              <Link href="/consult" className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                <Button>Use App</Button>
              </Link>
            ) : (
              // <div className="flex items-center gap-4">
              //   Welcome, {user.email}!
              //   <LogoutButton />
              // </div>
              <Link href="/consult" className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                <Button>Use App</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground md:mx-auto mx-8">
        <div className="flex flex-col items-center lg:mt-20 mb-4 lg:mb-20">
          <p className="text-blue-700 border border-blue-700 bg-blue-50 rounded-xl w-fit h-fit mb-4 p-1">New Innovation!</p>
          <h1 className="text-4xl font-xl font-bold text-center">AI Career Consultant</h1>
          <p className="text-xl text-slate-500 mx-auto text-center my-4">
            Ready to take your career to new heights? Introducing AI Career Consultant, the smartest way to enhance your career.
          </p>
          <Link href="/consult">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 min-w-full">
        <div className="flex flex-col gap-4 text-foreground max-w-4xl mt-20 md:mx-auto mx-8">
          <h2 className="text-4xl font-xl font-bold text-center">Features</h2>
          <p className="text-xl text-slate-500 mx-auto text-center my-4">
            We provide everything you need to improve your career. With our advanced AI, it will help you advance your career.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
            {resources.map(({ title, subtitle, icon: Icon }) => (
              <div key={title} className="relative flex flex-col group rounded-xl p-6 border bg-white">
                <h3 className="font-bold mb-2 min-h-[40px] lg:min-h-[60px]">{title}</h3>
                <div className="flex flex-col grow gap-4 justify-between">
                  <p className="text-sm opacity-70">{subtitle}</p>
                  <div className="flex justify-between items-center text-primary">
                    <Icon size={26} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xl text-slate-500 mx-auto text-center mt-8 pb-24">Using AI Career Consultant is simple as using OpenAI ChatGPT.</p>
        </div>
      </div>

      <div className="flex flex-col mt-40 max-w-4xl md:mx-auto mx-8 pb-40">
        <h2 className="text-4xl font-xl font-bold text-center">Start Using AI Career Consultant Now!</h2>
        <p className="text-xl text-slate-500 mx-auto text-center my-4">
          This is a one time opportunity to improve your career. Stop wasting your time and start using this app now.
        </p>
        <Link href="/consult" className="mx-auto">
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  )
}
