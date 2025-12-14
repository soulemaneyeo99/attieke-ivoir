"use client"

import { useCartStore } from "@/store/cart"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import Link from 'next/link'
import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function CartSheet() {
    const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

    if (items.length === 0) {
        return (
            <div className="flex flex-col h-full items-center justify-center space-y-4">
                <SheetHeader>
                    <SheetTitle>Votre Panier</SheetTitle>
                </SheetHeader>
                <p className="text-muted-foreground">Votre panier est vide.</p>
                <SheetClose asChild>
                    <Button variant="outline">Continuer vos achats</Button>
                </SheetClose>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <SheetHeader>
                <SheetTitle>Votre Panier ({items.length})</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                        <div className="h-20 w-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full bg-gray-200" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">{item.price} FCFA / {item.unit}</p>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center border rounded-md">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100"><Minus className="h-3 w-3" /></button>
                                    <span className="px-2 text-sm font-bold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100"><Plus className="h-3 w-3" /></button>
                                </div>
                                <span className="font-bold text-primary">{item.price * item.quantity} FCFA</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{totalPrice} FCFA</span>
                </div>

                <Link href="/commande" className="w-full">
                    <SheetClose asChild>
                        <Button className="w-full" size="lg">Commander</Button>
                    </SheetClose>
                </Link>
                <Link href="/panier" className="w-full">
                    <SheetClose asChild>
                        <Button variant="outline" className="w-full">Voir le panier</Button>
                    </SheetClose>
                </Link>
            </div>
        </div>
    )
}
