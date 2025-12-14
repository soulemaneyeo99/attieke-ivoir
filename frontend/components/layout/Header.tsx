"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, ShoppingCart, Search, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/cn'
import { useCartStore } from '@/store/cart'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CartSheet } from '@/components/cart/CartSheet'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const cartCount = useCartStore((state) => state.count)

    // Hydration fix for persisted store
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        useCartStore.persist.rehydrate()
        setMounted(true)
    }, [])

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">Attiéké Ivoir</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">Accueil</Link>
                    <Link href="/boutique" className="transition-colors hover:text-primary">Boutique</Link>
                    <Link href="/connexion" className="transition-colors hover:text-primary font-semibold text-primary/90">Connexion</Link>
                    <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
                </nav>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex items-center w-1/3 max-w-sm ml-4">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Rechercher..."
                            className="pl-8 bg-muted/50 focus:bg-background"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <User className="h-5 w-5" />
                    </Button>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {mounted && cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <CartSheet />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-background border-b md:hidden p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5 z-40">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Rechercher un produit..."
                            className="pl-8"
                        />
                    </div>
                    <nav className="flex flex-col gap-2">
                        <Link href="/" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                        <Link href="/boutique" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>Boutique</Link>
                        <Link href="/connexion" className="p-2 hover:bg-muted rounded-md text-primary font-medium" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                        <Link href="/contact" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    </nav>
                    <div className="border-t pt-4">
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <User className="h-4 w-4" /> Mon Compte
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}
