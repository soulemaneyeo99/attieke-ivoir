"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from 'lucide-react'

import { useAuthStore } from '@/store/auth'
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const login = useAuthStore((state) => state.login)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get('email') as string
        const firstName = formData.get('firstName') as string
        const lastName = formData.get('lastName') as string
        const password = formData.get('password') as string
        // Phone is ignored for now as User model doesn't support it

        try {
            // Register
            // We use email as username
            await api.post('/auth/register/', {
                username: email,
                email,
                password,
                first_name: firstName,
                last_name: lastName
            })

            // Auto Login
            const response = await api.post('/auth/login/', { username: email, password })
            login(response.data.access, response.data.refresh)
            await useAuthStore.getState().checkAuth()

            router.push('/compte')
        } catch (error) {
            console.error(error)
            alert("Erreur lors de l'inscription. L'email existe peut-être déjà.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Header />
            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Créer un compte
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Rejoignez Attiéké Ivoir pour commander plus rapidement
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input id="firstName" name="firstName" required className="pl-10" placeholder="Jean" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <div className="mt-1 relative">
                                        <Input id="lastName" name="lastName" required className="pl-3" placeholder="Kouassi" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input id="phone" name="phone" type="tel" required className="pl-10" placeholder="07 00 00 00 00" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input id="email" name="email" type="email" required className="pl-10" placeholder="vous@exemple.com" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="pl-10 pr-10"
                                        placeholder="Minimum 8 caractères"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "S'inscrire"}
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            Déjà inscris ?{' '}
                            <Link href="/connexion" className="font-medium text-primary hover:text-primary/80 transition-colors">
                                Se connecter
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
