import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Award, TrendingUp } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">À Propos d'Attiéké Ivoir</h1>
                <p className="text-xl text-muted-foreground">
                    Votre partenaire de confiance pour des produits alimentaires 100% locaux et naturels
                </p>
            </div>

            {/* Mission */}
            <div className="max-w-5xl mx-auto mb-16">
                <Card>
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
                        <p className="text-lg leading-relaxed mb-4">
                            Chez <span className="font-semibold text-primary">Attiéké Ivoir</span>, nous nous engageons à promouvoir une alimentation saine, locale et durable en Côte d'Ivoire. Notre objectif est de connecter directement les producteurs locaux avec les consommateurs, garantissant ainsi la fraîcheur et la qualité de chaque produit.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Nous croyons fermement au développement de l'agriculture locale et à la valorisation du savoir-faire ivoirien. Chaque achat chez nous soutient les communautés rurales et contribue à une économie plus juste et équitable.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Valeurs */}
            <div className="max-w-5xl mx-auto mb-16">
                <h2 className="text-2xl font-bold text-center mb-8">Nos Valeurs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="text-center">
                        <CardContent className="p-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <Leaf className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">100% Naturel</h3>
                            <p className="text-sm text-muted-foreground">
                                Produits sans pesticides, issus de l'agriculture locale
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="p-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <Award className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Qualité Garantie</h3>
                            <p className="text-sm text-muted-foreground">
                                Contrôle rigoureux à chaque étape de la chaîne
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="p-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Producteurs Locaux</h3>
                            <p className="text-sm text-muted-foreground">
                                Partenariat direct avec les agriculteurs ivoiriens
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardContent className="p-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                <TrendingUp className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Développement Durable</h3>
                            <p className="text-sm text-muted-foreground">
                                Pratiques respectueuses de l'environnement
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Produits */}
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold mb-6">Nos Produits</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">🌾 Farine de Manioc</h3>
                                <p className="text-muted-foreground">Manioc transformé de manière traditionnelle, riche en glucides et sans gluten.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">🥘 Attiéké</h3>
                                <p className="text-muted-foreground">Semoule de manioc fermentée, plat emblématique de la Côte d'Ivoire.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">🍗 Poulet de Chair</h3>
                                <p className="text-muted-foreground">Élevage local, alimentation naturelle, viande tendre et savoureuse.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">🐰 Lapins</h3>
                                <p className="text-muted-foreground">Viande maigre et riche en protéines, élevage familial.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">🐟 Poissons Bio</h3>
                                <p className="text-muted-foreground">Certifiés bio, fraîcheur garantie, pêche responsable.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
