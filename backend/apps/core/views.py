from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
import google.generativeai as genai
import os
from apps.products.models import Product, Category

# Configure Gemini with API key from environment
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class ChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_message = request.data.get('message', '').strip()
        
        if not user_message:
            return Response(
                {'error': 'Message is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not GEMINI_API_KEY:
            return Response(
                {'error': 'Chat service is not configured'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )

        try:
            # Build context from shop data
            categories = Category.objects.all()
            products = Product.objects.filter(is_available=True)[:10]  # Top 10 available products
            
            # Context about the shop
            context = f"""Tu es un assistant virtuel pour Attiéké Ivoir, un site e-commerce ivoirien spécialisé dans la vente de produits agroalimentaires locaux et naturels.

INFORMATIONS ENTREPRISE:
- Nom: Attiéké Ivoir
- Mission: Promouvoir une alimentation saine, locale et durable en Côte d'Ivoire
- Valeurs: 100% Naturel, Qualité Garantie, Producteurs Locaux, Développement Durable

CATÉGORIES DE PRODUITS:
"""
            for cat in categories:
                context += f"- {cat.name}: {cat.description}\n"

            context += "\n\nPRODUITS DISPONIBLES (exemples):\n"
            for prod in products:
                context += f"- {prod.name} ({prod.category.name}): {prod.price} FCFA par {prod.unit}\n"

            context += """

INFORMATIONS DE LIVRAISON:
- Zones: Abidjan (24-48h) et intérieur du pays (3-5 jours)
- Frais: Calculés selon la commune

MODES DE PAIEMENT:
- Paiement à la livraison (Cash)
- Orange Money (à la livraison)
- MTN Money (à la livraison)
- Moov Money (à la livraison)

HORAIRES:
- Lundi-Vendredi: 08:00-18:00
- Samedi: 09:00-15:00
- Dimanche: Fermé

CONTACT:
- Téléphone: +225 01 02 03 04 05
- Email: contact@attiekeivoir.ci
- Lieu: Abidjan, Côte d'Ivoire

Réponds de manière professionnelle, amicale et concise aux questions des clients. Si tu ne sais pas quelque chose, oriente le client vers le service client. Reste toujours dans le contexte d'Attiéké Ivoir.

Question du client: {user_message}

Réponse (en français, maximum 150 mots):"""

            # Call Gemini API (using free tier model)
            model = genai.GenerativeModel('gemini-flash-latest')
            response = model.generate_content(context)
            
            ai_response = response.text.strip()

            return Response({
                'response': ai_response
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {'error': f'Une erreur est survenue: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
