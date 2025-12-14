"use client"

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react'
import { useCartStore } from '@/store/cart'

// Mock Data
const product = {
    id: 1,
    name: 'Attiéké Agbodjama Premium',
    description: 'Notre Attiéké Agbodjama est fait à partir de manioc soigneusement sélectionné en Côte d\'Ivoire. Il se distingue par ses gros grains et sa texture légère. Idéal pour accompagner vos grillades de poisson ou de poulet. 100% Naturel, sans conservateurs.',
    price: 500,
    unit: 'Boule',
    rating: 4.8,
    reviews: 124,
    stock: 50,
    images: [
        'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800',
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800',
    ]
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    const addItem = useCartStore((state) => state.addItem)
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12 container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
                            <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary">
                                    <img src={img} alt="" className="object-cover w-full h-full" />
                                </div>
                            ))}
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary flex items-center justify-center text-gray-400">
                                +2
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center text-secondary">
                                    <Star className="h-5 w-5 fill-current" />
                                    <span className="font-bold ml-1">{product.rating}</span>
                                </div>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-500">{product.reviews} avis</span>
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">En Stock</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-primary">{product.price} FCFA</span>
                            <span className="text-lg text-gray-500">/ {product.unit}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description}
                        </p>

                        <div className="pt-6 border-t border-gray-200 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-lg">
                                    <button className="px-4 py-2 hover:bg-gray-100 text-lg">-</button>
                                    <span className="px-4 py-2 font-bold w-12 text-center">1</span>
                                    <button className="px-4 py-2 hover:bg-gray-100 text-lg">+</button>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {product.stock} pièces disponibles
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button size="lg" className="flex-1 text-lg h-14" onClick={() => addItem(product)}>
                                    <ShoppingCart className="mr-2 h-5 w-5" /> Ajouter au Panier
                                </Button>
                                <Button variant="outline" size="icon" className="h-14 w-14">
                                    <Heart className="h-6 w-6" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-14 w-14">
                                    <Share2 className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        <div className="pt-8 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">🌱</div>
                                <div>
                                    <div className="font-bold">100% Bio</div>
                                    <div className="text-xs text-gray-500">Certifié local</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">🚚</div>
                                <div>
                                    <div className="font-bold">Livraison Rapide</div>
                                    <div className="text-xs text-gray-500">Abidjan & Intérieur</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
