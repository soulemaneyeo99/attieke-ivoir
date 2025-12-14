"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
    {
        category: "Livraison",
        questions: [
            {
                q: "Quelles sont les zones de livraison ?",
                a: "Nous livrons dans toute la ville d'Abidjan et dans plusieurs communes de l'intérieur du pays. Contactez-nous pour vérifier si votre zone est couverte."
            },
            {
                q: "Quels sont les délais de livraison ?",
                a: "Pour Abidjan : 24-48h. Pour l'intérieur : 3-5 jours ouvrables selon la destination."
            },
            {
                q: "Les frais de livraison sont-ils inclus ?",
                a: "Non, les frais de livraison sont calculés selon votre commune. Ils sont affichés avant la validation de votre commande."
            }
        ]
    },
    {
        category: "Paiement",
        questions: [
            {
                q: "Quels modes de paiement acceptez-vous ?",
                a: "Nous acceptons Orange Money, MTN Money, Moov Money, et le paiement à la livraison (cash)."
            },
            {
                q: "Le paiement est-il sécurisé ?",
                a: "Oui, toutes les transactions sont sécurisées. Pour le paiement mobile, vous recevrez un message de confirmation directement de votre opérateur."
            },
            {
                q: "Puis-je payer à la livraison ?",
                a: "Oui, le paiement à la livraison est disponible pour toutes les commandes."
            }
        ]
    },
    {
        category: "Produits & Qualité",
        questions: [
            {
                q: "Vos produits sont-ils bio ?",
                a: "Nos poissons sont certifiés bio. Tous nos produits (manioc, attiéké, volailles, lapins) sont issus de production locale et naturelle, sans pesticides."
            },
            {
                q: "Comment garantissez-vous la fraîcheur ?",
                a: "Nous travaillons directement avec des producteurs locaux et assurons une chaîne de froid complète pour les produits périssables."
            },
            {
                q: "Puis-je commander en gros ?",
                a: "Oui, nous proposons des tarifs dégressifs pour les commandes en gros (restaurants, supermarchés). Contactez-nous pour un devis personnalisé."
            }
        ]
    },
    {
        category: "Commandes",
        questions: [
            {
                q: "Comment passer une commande ?",
                a: "Parcourez notre boutique, ajoutez les produits à votre panier, puis suivez les étapes de paiement. Vous pouvez aussi nous contacter directement par téléphone."
            },
            {
                q: "Puis-je modifier ma commande ?",
                a: "Oui, tant que votre commande n'est pas encore expédiée. Contactez-nous au plus vite pour toute modification."
            },
            {
                q: "Comment suivre ma commande ?",
                a: "Vous recevrez un numéro de suivi par SMS et email. Vous pouvez aussi consulter l'état de votre commande dans votre espace client."
            }
        ]
    }
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b last:border-0">
            <button
                className="w-full py-4 flex items-center justify-between text-left hover:text-primary transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium pr-4">{question}</span>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 text-muted-foreground">
                    {answer}
                </div>
            )}
        </div>
    )
}

export default function FAQPage() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Questions Fréquentes</h1>
                <p className="text-center text-muted-foreground mb-12">
                    Trouvez rapidement des réponses à vos questions sur nos produits, la livraison et le paiement.
                </p>

                <div className="space-y-8">
                    {faqs.map((category, idx) => (
                        <Card key={idx}>
                            <CardHeader>
                                <CardTitle>{category.category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {category.questions.map((item, qIdx) => (
                                    <FAQItem key={qIdx} question={item.q} answer={item.a} />
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
                    <a href="/contact" className="text-primary font-medium hover:underline">
                        Contactez-nous →
                    </a>
                </div>
            </div>
        </div>
    )
}
