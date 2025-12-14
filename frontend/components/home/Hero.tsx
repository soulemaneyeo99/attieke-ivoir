import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="relative bg-[#F9FAFB] overflow-hidden pt-10 pb-20 lg:pb-32 lg:pt-20">
            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="max-w-2xl space-y-8 text-center lg:text-left">
                        {/* Badge removed as requested */}

                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
                            Le Goût Authentique de la <span className="text-primary">Côte d'Ivoire</span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Découvrez l'excellence de nos produits agroalimentaires. Attiéké frais, huiles naturelles et saveurs du terroir, livrés directement chez vous.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/boutique">
                                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                                    Commander Maintenant
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/a-propos">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium border-2 hover:bg-gray-50">
                                    Notre Histoire
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-secondary" />
                                <span>Paiement à la livraison</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span>Produits Frais</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual/Image Section */}
                    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                        <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                            <img
                                src="/images/hero.png"
                                alt="Plat Attiéké Royal"
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Decorative elements behind */}
                        <div className="absolute -z-10 top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-100/50 to-green-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    )
}

