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
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Welcome, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link href="/login" className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                <Button>Use App</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <h1 className="text-4xl font-medium">AI Career Consultant</h1>
          <p className="text-2xl !leading-tight mx-auto max-w-xl text-center my-4">
            The smartest way to enhance your career
          </p>
          <Button>Start Using AI Career Consultant</Button>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-medium text-center font-primary">We provide everything you need to improve your career.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {resources.map(({ title, subtitle, icon: Icon }) => (
              <p
                key={title}
                className="relative flex flex-col group rounded-lg border p-6 hover:border-blue-500">
                <h3 className="font-bold mb-2 min-h-[40px] lg:min-h-[60px]">{title}</h3>
                <div className="flex flex-col grow gap-4 justify-between">
                  <p className="text-sm opacity-70">{subtitle}</p>
                  <div className="flex justify-between items-center text-primary">
                    <Icon size={26} />
                  </div>
                </div>
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-center text-center text-xs">
          <p>
            Powered by <b>Team Hackatroz</b>
          </p>
        </div>
      </div>
    </div>
  )
}
