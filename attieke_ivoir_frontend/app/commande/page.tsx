"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { useCartStore } from '@/store/cart'
import { ArrowLeft, CheckCircle2, Truck, CreditCard, ShieldCheck } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function CheckoutPage() {
    const router = useRouter()
    const { items, totalPrice, clearCart } = useCartStore()
    const [step, setStep] = useState<'info' | 'payment' | 'success'>('info')
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        commune: 'Cocody',
        notes: ''
    })

    // Prevent hydration mismatch or empty cart access
    if (items.length === 0 && step !== 'success') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
                <Link href="/boutique"><Button>Retourner à la boutique</Button></Link>
            </div>
        )
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStep('payment')
        window.scrollTo(0, 0)
    }

    const handleOrderSubmit = async () => {
        setLoading(true)

        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Success
        clearCart()
        setStep('success')
        setLoading(false)
        window.scrollTo(0, 0)
    }

    if (step === 'success') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md text-center p-6 space-y-6">
                    <div className="mx-auto h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Commande Confirmée !</h1>
                        <p className="text-gray-500 mt-2">Merci pour votre commande. Vous recevrez un appel de confirmation sous peu.</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg text-sm text-left space-y-2">
                        <p><strong>Numéro de commande:</strong> #{Math.floor(Math.random() * 10000)}</p>
                        <p><strong>Montant Total:</strong> {totalPrice + 1000} FCFA</p>
                    </div>
                    <Link href="/" className="block w-full">
                        <Button className="w-full" size="lg">Retour à l'accueil</Button>
                    </Link>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50/30">
            <Header />
            <main className="flex-1 py-12 container">
                {/* Stepper */}
                <div className="max-w-3xl mx-auto mb-12 flex items-center justify-center text-sm">
                    <div className={cn("flex items-center gap-2", step === 'info' ? "text-primary font-bold" : "text-gray-500")}>
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center border-2", step === 'info' || step === 'payment' ? "border-primary bg-primary text-white" : "border-gray-300")}>1</div>
                        Livraison
                    </div>
                    <div className="w-16 h-0.5 bg-gray-200 mx-4" />
                    <div className={cn("flex items-center gap-2", step === 'payment' ? "text-primary font-bold" : "text-gray-500")}>
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center border-2", step === 'payment' ? "border-primary bg-primary text-white" : "border-gray-300")}>2</div>
                        Paiement
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        {step === 'info' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations de Livraison</CardTitle>
                                    <CardDescription>Où devons-nous livrer vos produits ?</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form id="checkout-form" onSubmit={handleInfoSubmit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Prénom</label>
                                                <Input required name="firstName" placeholder="Jean" value={formData.firstName} onChange={handleInputChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Nom</label>
                                                <Input required name="lastName" placeholder="Kouassi" value={formData.lastName} onChange={handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Téléphone (Mobile Money)</label>
                                            <Input required type="tel" name="phone" placeholder="07 XX XX XX XX" value={formData.phone} onChange={handleInputChange} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Commune</label>
                                                <select
                                                    name="commune"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={formData.commune}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="Cocody">Cocody</option>
                                                    <option value="Marcory">Marcory</option>
                                                    <option value="Yopougon">Yopougon</option>
                                                    <option value="Plateau">Plateau</option>
                                                    <option value="Adjame">Adjamé</option>
                                                    <option value="Bingerville">Bingerville</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Quartier / Repère</label>
                                                <Input required name="address" placeholder="Ex: Riviéra 2, près de la pharmacie..." value={formData.address} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-between border-t pt-6">
                                    <Link href="/panier">
                                        <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Retour au panier</Button>
                                    </Link>
                                    <Button type="submit" form="checkout-form">Continuer vers le Paiement</Button>
                                </CardFooter>
                            </Card>
                        )}

                        {step === 'payment' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Paiement Sécurisé</CardTitle>
                                    <CardDescription>Choisissez votre mode de paiement.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex items-start gap-4 cursor-pointer relative">
                                        <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary mt-1" />
                                        <div>
                                            <h3 className="font-bold flex items-center gap-2">Paiement à la livraison <Truck className="h-4 w-4" /></h3>
                                            <p className="text-sm text-gray-600 mt-1">Payez en espèces ou mobile money une fois votre commande reçue.</p>
                                        </div>
                                        <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">Recommandé</span>
                                    </div>

                                    <div className="p-4 border rounded-xl flex items-start gap-4 cursor-pointer opacity-50">
                                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-1" />
                                        <div>
                                            <h3 className="font-bold flex items-center gap-2">Paiement Direct (Mobile Money) <CreditCard className="h-4 w-4" /></h3>
                                            <p className="text-sm text-gray-600 mt-1">Bientôt disponible.</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-3 text-sm text-gray-700">
                                        <ShieldCheck className="h-5 w-5 text-green-600" />
                                        Vos informations sont sécurisées et cryptées.
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between border-t pt-6">
                                    <Button variant="ghost" onClick={() => setStep('info')}><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Button>
                                    <Button size="lg" onClick={handleOrderSubmit} disabled={loading}>
                                        {loading ? 'Traitement...' : 'Confirmer la Commande'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 bg-gray-50 border-none shadow-inner">
                            <CardHeader>
                                <CardTitle className="text-lg">Récapitulatif</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span className="font-medium">{item.price * item.quantity} FCFA</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-4 space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Sous-total</span>
                                        <span>{totalPrice} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Livraison ({formData.commune})</span>
                                        <span>1000 FCFA</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl text-primary">
                                    <span>Total à payer</span>
                                    <span>{totalPrice + 1000} FCFA</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
