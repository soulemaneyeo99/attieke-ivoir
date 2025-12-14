import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Attiéké Ivoir</h3>
                        <p className="text-sm text-gray-200">
                            Votre partenaire de confiance pour des produits agroalimentaires locaux et bio de qualité supérieure.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Boutique</h4>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li><Link href="/boutique?cat=attieke" className="hover:text-white hover:underline">Attiéké</Link></li>
                            <li><Link href="/boutique?cat=poulet" className="hover:text-white hover:underline">Poulet Bio</Link></li>
                            <li><Link href="/boutique?cat=legumes" className="hover:text-white hover:underline">Légumes</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Aide</h4>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li><Link href="/faq" className="hover:text-white hover:underline">FAQ</Link></li>
                            <li><Link href="/livraison" className="hover:text-white hover:underline">Livraison</Link></li>
                            <li><Link href="/contact" className="hover:text-white hover:underline">Contactez-nous</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider">Suivez-nous</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-secondary transition-colors"><Facebook className="h-6 w-6" /></Link>
                            <Link href="#" className="hover:text-secondary transition-colors"><Instagram className="h-6 w-6" /></Link>
                            <Link href="#" className="hover:text-secondary transition-colors"><Twitter className="h-6 w-6" /></Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-gray-200">
                    © {new Date().getFullYear()} Attiéké Ivoir. Tous droits réservés.
                </div>
            </div>
        </footer>
    )
}
