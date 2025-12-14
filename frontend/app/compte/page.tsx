"use client"

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Package, User as UserIcon, MapPin, LogOut, ChevronRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth'
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('orders')
    const { user, logout, isAuthenticated, checkAuth } = useAuthStore()
    const router = useRouter()
    const [orders, setOrders] = useState<any[]>([])
    const [loadingOrders, setLoadingOrders] = useState(false)

    useEffect(() => {
        // Protect Route
        if (!useAuthStore.getState().isAuthenticated) {
            // Check auth first (in case of refresh)
            checkAuth().then(() => {
                if (!useAuthStore.getState().isAuthenticated) {
                    router.push('/connexion')
                }
            })
        }

        // Fetch Orders
        if (isAuthenticated) {
            setLoadingOrders(true)
            api.get('/orders/')
                .then(res => setOrders(res.data.results || res.data))
                .catch(err => console.error("Failed to fetch orders", err))
                .finally(() => setLoadingOrders(false))
        }
    }, [isAuthenticated, router, checkAuth])

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    if (!user) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>

    return (
        <div className="flex min-h-screen flex-col bg-gray-50/50">
            <Header />
            <main className="flex-1 py-12 container">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar */}
                    <aside className="w-full md:w-72 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl uppercase">
                                    {user.first_name ? user.first_name[0] : user.username[0]}
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900 capitalize">{user.first_name || 'Client'} {user.last_name || ''}</h2>
                                    <p className="text-sm text-gray-500 truncate w-36" title={user.email}>{user.email}</p>
                                </div>
                            </div>
                            <nav className="p-2 space-y-1">
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Package className="h-5 w-5" /> Mes Commandes
                                </button>
                                <button
                                    onClick={() => setActiveTab('info')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'info' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <UserIcon className="h-5 w-5" /> Informations
                                </button>
                                <button
                                    onClick={() => setActiveTab('address')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeTab === 'address' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <MapPin className="h-5 w-5" /> Adresses
                                </button>
                                <div className="pt-2 mt-2 border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="h-5 w-5" /> Déconnexion
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 w-full space-y-6">
                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">Mes Commandes</h1>
                                {loadingOrders ? (
                                    <div className="flex justify-center py-12"><Loader2 className="animate-spin h-6 w-6 text-gray-400" /></div>
                                ) : orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map((order: any) => (
                                            <div key={order.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="font-bold text-gray-900">#{order.order_number}</span>
                                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(order.created_at).toLocaleDateString()} • {order.items ? order.items.length : 0} articles
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                    <span className="font-bold text-primary">{parseInt(order.total_amount).toLocaleString()} FCFA</span>
                                                    <Button variant="outline" size="sm" className="rounded-lg">
                                                        Détails <ChevronRight className="ml-1 h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed">
                                        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900">Aucune commande</h3>
                                        <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
                                        <Link href="/boutique"><Button>Commencer mes achats</Button></Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'info' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">Mes Informations</h1>
                                <Card>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Prénom</label>
                                                <input type="text" defaultValue={user.first_name} className="w-full p-2 border rounded-lg bg-gray-50" disabled />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Nom</label>
                                                <input type="text" defaultValue={user.last_name} className="w-full p-2 border rounded-lg bg-gray-50" disabled />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Email</label>
                                                <input type="email" defaultValue={user.email} className="w-full p-2 border rounded-lg bg-gray-50" disabled />
                                            </div>
                                        </div>
                                        <div className="pt-4 flex justify-end">
                                            <Button variant="outline">Modifier</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'address' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-gray-900">Adresses de livraison</h1>
                                <Card>
                                    <CardContent className="p-6">
                                        <p className="text-gray-500 italic">Fonctionnalité bientôt disponible...</p>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
