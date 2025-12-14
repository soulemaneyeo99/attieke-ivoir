import os
import django

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from rest_framework.test import APIClient
from apps.products.models import Product, Category
from apps.orders.models import Order
from django.contrib.auth import get_user_model

def test_create_order():
    print("--- Starting Order Verification ---")
    
    # 1. Setup Data
    print("Creating dummy product...")
    category, _ = Category.objects.get_or_create(name="Tubers", slug="tubers")
    product, _ = Product.objects.get_or_create(
        name="Attieke Premium",
        defaults={
            'slug': 'attieke-premium',
            'description': 'Best attieke',
            'price': 1500.00,
            'stock': 100,
            'category': category
        }
    )
    
    # 2. Prepare Payload
    payload = {
        "first_name": "Test",
        "last_name": "User",
        "phone": "0707070707",
        "email": "test@example.com",
        "commune": "Cocody",
        "shipping_address": "Rue des Jardins",
        "payment_method": "cod",
        "items": [
            {
                "product_id": product.id,
                "quantity": 2
            }
        ]
    }
    
    # 3. Send Request
    print("Sending POST request to /api/orders/...")
    client = APIClient()
    response = client.post('/api/orders/', payload, format='json')
    
    # 4. Verify Response
    if response.status_code == 201:
        print("✅ Success! API returned 201 Created.")
        data = response.json()
        print(f"Order Number: {data.get('order_number')}")
        
        # 5. Verify DB
        order = Order.objects.get(order_number=data['order_number'])
        print(f"✅ Order found in DB: ID {order.id}")
        print(f"Items count: {order.items.count()}")
        print(f"Total Amount: {order.total_amount} (Should be 3000 + 1000 = 4000)")
        
        if order.total_amount == 4000:
             print("✅ Calculation Correct.")
        else:
             print(f"❌ Calculation Error: {order.total_amount}")
             
    else:
        print(f"❌ Failed. Status: {response.status_code}")
        print(response.data)

if __name__ == "__main__":
    try:
        test_create_order()
    except Exception as e:
        print(f"❌ Error: {e}")
