import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative bg-accent/30 overflow-hidden">
            <div className="container relative z-10 py-20 md:py-32 lg:py-40">
                <div className="max-w-2xl space-y-8">
                    <div className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary ring-1 ring-inset ring-secondary/20">
                        🌱 100% Naturel & Local
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-6xl">
                        Le Goût Authentique de la Côte d'Ivoire
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Découvrez nos produits agroalimentaires bio et locaux : Attiéké frais, volailles élevées en plein air et légumes de saison. Livré directement chez vous.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/boutique">
                            <Button size="lg" className="rounded-full px-8 text-base">
                                Commander Maintenant
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/a-propos">
                            <Button variant="outline" size="lg" className="rounded-full px-8 text-base bg-white/50 backdrop-blur-sm">
                                Notre Histoire
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative Gradient Blob */}
            <div className="absolute right-0 top-0 -z-10 h-full w-full opacity-30 sm:w-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-40 blur-3xl filter" />
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-3xl" />
        </section>
    )
}
