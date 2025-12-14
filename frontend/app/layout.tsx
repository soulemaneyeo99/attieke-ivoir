import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'Attiéké Ivoir | Épicerie Bio & Locale',
    description: 'Vente de produits agroalimentaires locaux et bio en Côte d\'Ivoire.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
