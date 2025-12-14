from django.core.management.base import BaseCommand
from apps.products.models import Category, Product

class Command(BaseCommand):
    help = 'Seed database with categories and products as per Cahier des Charges'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # Categories
        categories_data = [
            {
                'name': 'Farine de Manioc',
                'description': 'Farine de manioc naturelle, sans gluten, transformée de manière traditionnelle.',
                'slug': 'farine-manioc'
            },
            {
                'name': 'Attiéké',
                'description': 'Semoule de manioc fermentée, plat emblématique de la Côte d\'Ivoire.',
                'slug': 'attieke'
            },
            {
                'name': 'Volailles',
                'description': 'Poulets de chair élevés localement, alimentation naturelle.',
                'slug': 'volailles'
            },
            {
                'name': 'Lapins',
                'description': 'Viande de lapin maigre et riche en protéines, élevage familial.',
                'slug': 'lapins'
            },
            {
                'name': 'Poissons Bio',
                'description': 'Poissons certifiés bio, fraîcheur garantie, pêche responsable.',
                'slug': 'poissons-bio'
            }
        ]

        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name'], 'description': cat_data['description']}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Catégorie créée: {cat.name}'))
            else:
                self.stdout.write(f'  Catégorie existe déjà: {cat.name}')

        # Products
        products_data = [
            # Farine de Manioc
            {
                'category_slug': 'farine-manioc',
                'name': 'Farine de Manioc Premium',
                'description': 'Farine de manioc extra fine, idéale pour toutes vos préparations culinaires. Sans gluten, riche en glucides.',
                'price': '2500',
                'unit': 'kg',
                'stock': 100,
                'is_featured': True
            },
            {
                'category_slug': 'farine-manioc',
                'name': 'Farine de Manioc Standard (Paquet 5kg)',
                'description': 'Paquet économique de farine de manioc pour les familles et les restaurants.',
                'price': '11000',
                'unit': 'paquet 5kg',
                'stock': 50
            },

            # Attiéké
            {
                'category_slug': 'attieke',
                'name': 'Attiéké Traditionnel',
                'description': 'Attiéké préparé de manière traditionnelle, prêt à consommer. Accompagnement parfait pour poisson et viande.',
                'price': '1500',
                'unit': 'kg',
                'stock': 150,
                'is_featured': True
            },
            {
                'category_slug': 'attieke',
                'name': 'Attiéké Frais du Jour',
                'description': 'Att iéké fraîchement préparé, livré le jour même.',
                'price': '500',
                'unit': '400g',
                'stock': 80
            },

            # Poulet
            {
                'category_slug': 'volailles',
                'name': 'Poulet de Chair Entier',
                'description': 'Poulet de chair élevé localement, alimentation 100% naturelle. Viande tendre et savoureuse.',
                'price': '4500',
                'unit': 'pièce (≈2kg)',
                'stock': 30,
                'is_featured': True
            },
            {
                'category_slug': 'volailles',
                'name': 'Cuisses de Poulet (Lot de 4)',
                'description': 'Cuisses de poulet frais, idéales pour le braisé ou le four.',
                'price': '3000',
                'unit': 'lot',
                'stock': 50
            },

            # Lapins
            {
                'category_slug': 'lapins',
                'name': 'Lapin Entier',
                'description': 'Lapin d\'élevage familial, viande maigre et riche en protéines. Parfait pour les grillades.',
                'price': '6000',
                'unit': 'pièce (≈1.5kg)',
                'stock': 20,
                'is_featured': True
            },
            {
                'category_slug': 'lapins',
                'name': 'Cuisses de Lapin (Paire)',
                'description': 'Paire de cuisses de lapin, préparation rapide.',
                'price': '2500',
                'unit': 'paire',
                'stock': 35
            },

            # Poissons
            {
                'category_slug': 'poissons-bio',
                'name': 'Tilapia Bio Frais',
                'description': 'Tilapia certifié bio, pêché localement. Fraîcheur garantie, livraison sous 24h.',
                'price': '3500',
                'unit': 'kg',
                'stock': 40,
                'is_featured': True
            },
            {
                'category_slug': 'poissons-bio',
                'name': 'Carpe Bio Entière',
                'description': 'Carpe bio, élevage responsable, idéale pour la braise ou la friture.',
                'price': '4000',
                'unit': 'pièce (≈1kg)',
                'stock': 25
            },
        ]

        for prod_data in products_data:
            category = Category.objects.get(slug=prod_data['category_slug'])
            prod, created = Product.objects.get_or_create(
                slug=prod_data['name'].lower().replace(' ', '-').replace('(', '').replace(')', '').replace('é', 'e').replace('è', 'e').replace('ê', 'e'),
                defaults={
                    'category': category,
                    'name': prod_data['name'],
                    'description': prod_data['description'],
                    'price': prod_data['price'],
                    'unit': prod_data['unit'],
                    'stock': prod_data['stock'],
                    'is_featured': prod_data.get('is_featured', False),
                    'is_available': True
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Produit créé: {prod.name}'))
            else:
                self.stdout.write(f'    Produit existe déjà: {prod.name}')

        self.stdout.write(self.style.SUCCESS('\n✅ Seeding terminé avec succès !'))
