import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gourav Kumar Ojha — AI/ML Researcher | Deep Learning | ISRO Collaborator",
  description:
    "AI/ML Researcher with 2 papers under review at Elsevier journals. Experienced in deep learning, NLP, computer vision, multi-modal systems, and large-scale scientific data pipelines. 3x Hackathon Winner and co-founder of a defence-tech AI startup.",
  keywords: [
    "AI researcher",
    "machine learning",
    "deep learning",
    "ISRO",
    "Elsevier",
    "NLP",
    "computer vision",
    "Gourav Kumar Ojha",
    "portfolio",
  ],
  authors: [{ name: "Gourav Kumar Ojha" }],
  openGraph: {
    title: "Gourav Kumar Ojha — AI/ML Researcher",
    description:
      "AI/ML Researcher with 2 papers under review at Elsevier. ISRO Collaborator. 3x Hackathon Winner. Defence-tech Co-Founder.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gourav Kumar Ojha — AI/ML Researcher",
    description:
      "AI/ML Researcher with 2 papers under review at Elsevier. ISRO Collaborator. 3x Hackathon Winner.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="dark antialiased font-sans font-serif font-mono"
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
