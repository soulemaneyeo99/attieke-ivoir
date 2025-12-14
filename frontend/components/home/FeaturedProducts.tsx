"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'

const products = [
    {
        id: 1,
        name: 'Attiéké Agbodjama',
        price: 500,
        unit: 'Boule',
        image: '/images/attieke-agbodjama.png',
        tag: 'Best Seller'
    },
    {
        id: 2,
        name: 'Poulet Fermier',
        price: 3500,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=600&auto=format&fit=crop',
        tag: 'Bio'
    },
    {
        id: 3,
        name: 'Huile Rouge',
        price: 1500,
        unit: 'Litre',
        image: '/images/huile-rouge.png',
        tag: 'Nouveau'
    },
    {
        id: 4,
        name: 'Placali Frais',
        price: 700,
        unit: 'sachet',
        image: '/images/placali-frais.png',
        tag: null
    }
]

export default function FeaturedProducts() {
    const { addItem } = useCartStore()

    return (
        <section className="py-24 bg-accent/30">
            <div className="container">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Nos Produits Vedettes</h2>
                        <p className="mt-2 text-muted-foreground">Une sélection de nos meilleures ventes de la semaine.</p>
                    </div>
                    <Link href="/boutique" className="hidden sm:block">
                        <Button variant="outline">Voir tout</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <Card key={product.id} className="overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-square relative bg-gray-100">
                                {/* Note: Next/Image needs domain config, for now standard img tag for safety or configured next/image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                                />
                                {product.tag && (
                                    <span className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {product.tag}
                                    </span>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground">Par {product.unit}</p>
                                    </div>
                                    <p className="font-bold text-primary">{product.price} FCFA</p>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        addItem(product)
                                        // Optional toast notification here
                                    }}
                                >
                                    Ajouter au Panier
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link href="/boutique">
                        <Button variant="outline" className="w-full">Voir tout le catalogue</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
