"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'

import { useAuthStore } from '@/store/auth'
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const login = useAuthStore((state) => state.login)
    const router = useRouter()
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Get form data
        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            // Using email as username for login if backend allows, or we pass username field
            // The backend expects 'username' and 'password'. 
            // If we use email for login, we assume username=email or backend handles email login.
            // Standard simplejwt token obtain pair uses 'username'.
            const response = await api.post('/auth/login/', { username: email, password })
            login(response.data.access, response.data.refresh)

            // Fetch user info
            await useAuthStore.getState().checkAuth()

            router.push('/compte')
        } catch (err: any) {
            console.error(err)
            setError('Email ou mot de passe incorrect.')
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
                            Bon retour !
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Connectez-vous pour accéder à vos commandes
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Adresse Email
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="pl-10"
                                        placeholder="vous@exemple.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Mot de passe
                                    </label>
                                    <Link href="#" className="text-sm font-medium text-primary hover:text-primary/80">
                                        Oublié ?
                                    </Link>
                                </div>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="pl-10 pr-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Connexion en cours...
                                </>
                            ) : (
                                "Se connecter"
                            )}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Ou continuer avec
                                </span>
                            </div>
                        </div>

                        {/* Social Login Placeholder - Optional */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" type="button" disabled>Google</Button>
                            <Button variant="outline" type="button" disabled>Facebook</Button>
                        </div>

                        <p className="text-center text-sm text-gray-600">
                            Pas encore de compte ?{' '}
                            <Link href="/inscription" className="font-medium text-primary hover:text-primary/80 transition-colors">
                                Créer un compte
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
