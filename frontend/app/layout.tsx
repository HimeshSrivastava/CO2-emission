import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: 'Carbon Intelligence Platform | Track. Predict. Reduce.',
  description: 'AI-powered platform to monitor, predict, and reduce CO₂ emissions. Join the movement towards a sustainable future with real-time analytics and personalized recommendations.',
  keywords: ['carbon emissions', 'CO2 tracking', 'sustainability', 'AI forecasting', 'climate change', 'carbon footprint'],
  authors: [{ name: 'Carbon Intelligence' }],
  openGraph: {
    title: 'Carbon Intelligence Platform',
    description: 'AI-powered CO₂ emissions tracking and reduction platform',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#4a9c6d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
