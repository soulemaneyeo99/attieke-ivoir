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
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Boutique</h1>
                            <select className="border rounded-md px-3 py-1 text-sm">
                                <option>Trier par : Pertinence</option>
                                <option>Prix croisant</option>
                                <option>Prix décroissant</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allProducts.map((product) => (
                                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square relative bg-gray-100">
                                        <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                                    </div>
                                    <CardContent className="p-4">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</span>
                                        <h3 className="font-bold text-lg mt-1">{product.name}</h3>
                                        <p className="font-bold text-primary mt-2">{product.price} FCFA</p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button className="w-full" size="sm" onClick={() => addItem(product)}>Ajouter</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination Placeholder */}
                        <div className="flex justify-center mt-12">
                            <div className="flex gap-2">
                                <Button variant="outline" disabled>Précédent</Button>
                                <Button variant="default">1</Button>
                                <Button variant="outline">2</Button>
                                <Button variant="outline">3</Button>
                                <Button variant="outline">Suivant</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
