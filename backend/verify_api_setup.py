import os
import django
from django.conf import settings
from django.urls import resolve, reverse

# Configure Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

def verify_urls():
    print("Verifying URLs...")
    endpoints = [
        ('register', '/api/auth/register/'),
        ('token_obtain_pair', '/api/auth/login/'),
        ('token_refresh', '/api/auth/refresh/'),
        ('me', '/api/auth/me/'),
        ('product-list', '/api/products/'),
        ('category-list', '/api/categories/'),
    ]
    
    for name, path in endpoints:
        try:
            resolved = resolve(path)
            print(f"✅ Resolved {path} -> {resolved.view_name}")
        except Exception as e:
            print(f"❌ Failed to resolve {path}: {e}")

if __name__ == "__main__":
    verify_urls()
