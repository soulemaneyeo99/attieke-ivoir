"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')
        // Simulation d'envoi
        setTimeout(() => setStatus('success'), 1500)
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <h1 className="text-3xl font-bold text-center mb-8">Contactez-nous</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Informations de contact */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nos Coordonnées</CardTitle>
                            <CardDescription>Nous sommes à votre écoute pour toute question.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <span>+225 01 02 03 04 05</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>contact@attiekeivoir.ci</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>Abidjan, Côte d'Ivoire</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Horaires d'ouverture</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span>Lundi - Vendredi</span>
                                <span className="font-medium">08:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Samedi</span>
                                <span className="font-medium">09:00 - 15:00</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Dimanche</span>
                                <span>Fermé</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Formulaire */}
                <Card>
                    <CardHeader>
                        <CardTitle>Envoyez un message</CardTitle>
                        <CardDescription>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status === 'success' ? (
                            <div className="text-center py-8 text-green-600">
                                <p className="text-lg font-medium">Message envoyé avec succès !</p>
                                <p>Nous vous répondrons dans les plus brefs délais.</p>
                                <Button variant="outline" className="mt-4" onClick={() => setStatus('idle')}>Envoyer un autre message</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="nom" className="text-sm font-medium">Nom</label>
                                        <Input id="nom" placeholder="Votre nom" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="prenom" className="text-sm font-medium">Prénom</label>
                                        <Input id="prenom" placeholder="Votre prénom" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="votre@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <Textarea id="message" placeholder="Comment pouvons-nous vous aider ?" className="min-h-[120px]" required />
                                </div>
                                <Button type="submit" className="w-full" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
