import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '전서진의 한글 용사 천재 되기 프로젝트',
  description: '매일매일 성장하는 전서진의 한글 실력!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
