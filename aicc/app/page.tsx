"use client"

import Link from "next/link"
import Image from "next/image"
import { FaBusinessTime, FaBriefcase, FaWrench } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// export const dynamic = "force-dynamic"

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


const srcs = [
  "https://www.youtube.com/embed/H0-MVDa4A8k?si=egk6DxSAEJuCAqvQ",
  // "https://www.youtube.com/embed/UkUiQRquVnI?si=rQh0WDmWPZ9l81y-"
]

export default function Landing() {
  const [srcIndex, setSrcIndex] = useState(Math.floor(Math.random() * srcs.length))

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-foreground">
          <div className="flex flex-row items-center">
            <img src="/aicc-logo.jpg" alt="AI Career Consultant Logo" className="w-24" />
            <p className="text-slate-500 text-l font-medium ml-4 hidden md:block">AI Career Consultant</p>
            <p className="text-green-700 text-xs border border-green-700 bg-blue-50 rounded-xl w-fit h-fit ml-2 p-1">New!</p>
          </div>
          <div>
            <Link href="/consult" className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
              <Button>Use App</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground md:mx-auto mx-8">
        <div className="flex flex-col items-center lg:mt-20 mb-4 lg:mb-20">
          <p className="text-purple-700 border border-purple-700 bg-blue-50 rounded-xl w-fit h-fit mb-4 p-1">New Innovation!</p>
          <h1 className="text-4xl font-xl font-bold text-center">AI Career Consultant</h1>
          <p className="text-xl text-slate-500 mx-auto text-center my-4">
            Ready to take your career to new heights? Introducing AI Career Consultant, the smartest way to enhance your career.
          </p>
          <Link href="/consult">
            <Button>Get Started</Button>
          </Link>
          <iframe
            className="mt-8 mx-auto max-w-sm md:max-w-4xl md:max-h-full rounded-2xl shadow-xl max-h-56"
            width="720"
            height="405"
            src={srcs[srcIndex]}
            title="AI Career Consultant Demo Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
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
