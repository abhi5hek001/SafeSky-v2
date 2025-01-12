import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "SafeSky- A Revolutionary Aerial Hazard Monitoring System",
  description: "It is Smart India Hackathon 2023 project which monitors the aerial location of hazardous atmosphere near industries.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
    
  )
}