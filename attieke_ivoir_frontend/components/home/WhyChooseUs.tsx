import { Leaf, Award, Truck, ShieldCheck } from 'lucide-react'

const features = [
    {
        name: '100% Bio & Naturel',
        description: 'Nos produits sont cultivés sans pesticides chimiques, respectant la terre et votre santé.',
        icon: Leaf,
    },
    {
        name: 'Qualité Supérieure',
        description: 'Sélection rigoureuse des meilleurs produits locaux pour une satisfaction garantie.',
        icon: Award,
    },
    {
        name: 'Livraison Rapide',
        description: 'Livraison en 24h/48h partout à Abidjan et expédition à l\'intérieur du pays.',
        icon: Truck,
    },
    {
        name: 'Paiement Sécurisé',
        description: 'Payez en toute sécurité via Mobile Money (Orange, MTN, Moov) ou à la livraison.',
        icon: ShieldCheck,
    },
]

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Pourquoi Choisir Attiéké Ivoir ?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Nous nous engageons à vous fournir le meilleur de l'agriculture ivoirienne, du champ à votre assiette.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative p-6 bg-accent/20 rounded-2xl transition-all hover:shadow-md hover:-translate-y-1">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white mb-4">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.name}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
