"use client"

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { useCartStore } from '@/store/cart'

// Mock Data (simulating API response)
const allProducts = [
    { id: 1, name: 'Attiéké Agbodjama', category: 'Attiéké', price: 500, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=600', unit: 'Boule' },
    { id: 2, name: 'Attiéké Petit Grain', category: 'Attiéké', price: 400, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=600', unit: 'Boule' },
    { id: 3, name: 'Poulet Fermier', category: 'Volailles', price: 3500, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=600', unit: 'kg' },
    { id: 4, name: 'Poulet de Chair', category: 'Volailles', price: 2500, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=600', unit: 'kg' },
    { id: 5, name: 'Huile Rouge', category: 'Épicerie', price: 1500, image: 'https://images.unsplash.com/photo-1620619582536-e04c0ec55959?q=80&w=600', unit: 'Litre' },
    { id: 6, name: 'Piment Frais', category: 'Légumes', price: 200, image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600', unit: 'Tas' },
    { id: 7, name: 'Tomates', category: 'Légumes', price: 600, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600', unit: 'kg' },
    { id: 8, name: 'Lapin Entier', category: 'Volailles', price: 5000, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=600', unit: 'Unité' },
]

export default function ShopPage() {
    const addItem = useCartStore((state) => state.addItem)

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 container">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
                        <div className="flex items-center justify-between md:hidden mb-4">
                            <h2 className="font-bold text-lg">Filtres</h2>
                            <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Filtrer</Button>
                        </div>

                        <div className="hidden md:block space-y-6">
                            <div>
                                <h3 className="font-semibold mb-3">Catégories</h3>
                                <div className="space-y-2">
                                    {['Tout', 'Attiéké', 'Volailles', 'Légumes', 'Épicerie'].map(cat => (
                                        <div key={cat} className="flex items-center">
                                            <input type="checkbox" id={cat} className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                                            <label htmlFor={cat} className="text-sm">{cat}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">Prix</h3>
                                <div className="flex items-center gap-2">
                                    <input type="number" placeholder="Min" className="w-20 border rounded px-2 py-1 text-sm" />
                                    <span>-</span>
                                    <input type="number" placeholder="Max" className="w-20 border rounded px-2 py-1 text-sm" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Catalogue Produits</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground whitespace-nowrap">Trier par :</span>
                                <select className="border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                    <option>Pertinence</option>
                                    <option>Prix croisant</option>
                                    <option>Prix décroissant</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { id: 1, name: 'Attiéké Agbodjama', category: 'Attiéké', price: 500, image: '/images/attieke-fresh.png', unit: 'Boule', tag: 'Top Vente' },
                                { id: 2, name: 'Attiéké Petit Grain', category: 'Attiéké', price: 400, image: '/images/attieke-fresh.png', unit: 'Boule' },
                                { id: 3, name: 'Poulet Fermier', category: 'Volailles', price: 3500, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=600', unit: 'kg', tag: 'Bio' },
                                { id: 5, name: 'Huile Rouge', category: 'Épicerie', price: 1500, image: '/images/huile-rouge.png', unit: 'Litre' },
                                { id: 6, name: 'Piment Frais', category: 'Légumes', price: 200, image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=600', unit: 'Tas' },
                                { id: 7, name: 'Tomates', category: 'Légumes', price: 600, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600', unit: 'kg' },
                                { id: 8, name: 'Lapin Entier', category: 'Volailles', price: 5000, image: '/images/rabbit-raw.png', unit: 'Unité', tag: 'Sur commande' },
                            ].map((product) => (
                                <div key={product.id} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-[4/3] relative bg-gray-50 overflow-hidden">
                                        {/* Image */}
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Tags */}
                                        {product.tag && (
                                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                                {product.tag}
                                            </span>
                                        )}
                                        {/* Quick Add Overlay */}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            {/* Could add a 'Quick View' button here later */}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md mb-2 inline-block">
                                                {product.category}
                                            </span>
                                            <div className="text-right">
                                                <p className="font-extrabold text-lg text-gray-900">{product.price} <span className="text-xs font-normal text-gray-500">FCFA</span></p>
                                                <p className="text-xs text-gray-400">/{product.unit}</p>
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-lg text-gray-900 mb-4 line-clamp-1 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>

                                        <Button
                                            className="w-full rounded-xl font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
                                            onClick={() => addItem(product)}
                                        >
                                            Ajouter au Panier
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Placeholder */}
                        <div className="flex justify-center mt-12">
                            <div className="flex gap-2">
                                <Button variant="outline" disabled className="rounded-l-xl">Précédent</Button>
                                <Button variant="default" className="bg-primary text-white">1</Button>
                                <Button variant="outline">2</Button>
                                <Button variant="outline" className="rounded-r-xl">Suivant</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
