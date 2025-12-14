"use client"

import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { Trash2, Plus, Minus, ArrowLeft, ArchiveX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

export default function CartPage() {
    const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore()

    // Hydration fix
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 bg-gray-50/50">
                <div className="container">
                    <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

                    {items.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
                                <ArchiveX className="h-10 w-10 text-gray-400" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
                            <p className="text-muted-foreground mb-8">Découvrez nos produits frais et locaux.</p>
                            <Link href="/boutique">
                                <Button size="lg">Commencer vos achats</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                    <div className="p-6 space-y-6">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4 sm:gap-6 py-4 border-b last:border-0 last:pb-0 first:pt-0">
                                                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full bg-gray-200" />
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                                            <p className="text-sm text-gray-500">Prix unitaire: {item.price} FCFA</p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>

                                                    <div className="flex justify-between items-end mt-4">
                                                        <div className="flex items-center border rounded-lg bg-gray-50">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </button>
                                                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                        <div className="text-lg font-bold text-primary">
                                                            {item.price * item.quantity} FCFA
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={clearCart} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                                        Vider le panier
                                    </Button>
                                    <Link href="/boutique">
                                        <Button variant="outline" className="gap-2">
                                            <ArrowLeft className="h-4 w-4" /> Continuer mes achats
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
                                    <h2 className="text-lg font-bold mb-6">Résumé de la commande</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Sous-total</span>
                                            <span>{totalPrice} FCFA</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Livraison</span>
                                            <span className="text-sm italic">Calculé à l'étape suivante</span>
                                        </div>
                                        <div className="border-t pt-4 flex justify-between font-bold text-xl">
                                            <span>Total</span>
                                            <span className="text-primary">{totalPrice} FCFA</span>
                                        </div>
                                    </div>

                                    <Link href="/commande">
                                        <Button size="lg" className="w-full text-lg h-12">
                                            Commander
                                        </Button>
                                    </Link>

                                    <p className="text-xs text-gray-400 text-center mt-4">
                                        Taxes incluses. Livraison calculée lors de la validation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
