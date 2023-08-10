import './globals.css'
import { Open_Sans } from "next/font/google"

const font = Open_Sans({
  weight: ["300", "400", "500", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
})

export const metadata = {
  title: 'AI Career Consultant',
  description: 'The smartest way to improve your career',
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
