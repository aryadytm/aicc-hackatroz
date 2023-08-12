import { Metadata } from 'next/types'
import './globals.css'
import { Poppins } from "next/font/google"

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'AI Career Consultant',
  description: 'The smartest way to improve your career',
  icons: {icon: '/favicon.ico'}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className={`min-h-screen bg-background ${font.className}`}>
          {children}
        </main>
      </body>
    </html>
  )
}
