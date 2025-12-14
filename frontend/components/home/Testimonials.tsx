import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
    {
        id: 1,
        name: 'Awa Koné',
        role: 'Cliente Fidèle',
        content: "L'attiéké est toujours frais et d'une qualité incroyable. La livraison à Cocody est super rapide. Je recommande vivement !",
        rating: 5,
    },
    {
        id: 2,
        name: 'Michel Kouassi',
        role: 'Restaurateur',
        content: "Je commande mes poulets bio ici pour mon maquis. La viande est tendre et mes clients adorent. Service professionnel.",
        rating: 5,
    },
    {
        id: 3,
        name: 'Sarah Touré',
        role: 'Mère de famille',
        content: "Enfin des produits vraiment bio accessibles. Mes enfants adorent les fruits et légumes. Merci Sidifarm (Attiéké Ivoir) !",
        rating: 4,
    },
]

export default function Testimonials() {
    return (
        <section className="py-24 bg-white">
            <div className="container">
                <h2 className="text-3xl font-bold tracking-tight text-center text-primary sm:text-4xl mb-16">
                    Ce que disent nos clients
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="bg-accent/10 border-none">
                            <CardContent className="pt-6">
                                <div className="flex gap-1 mb-4 text-secondary">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>
                                <blockquote className="text-lg text-gray-700 italic border-l-4 border-primary pl-4 mb-6">
                                    "{testimonial.content}"
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
