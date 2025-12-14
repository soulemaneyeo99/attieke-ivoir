from django.db import models
from django.conf import settings
from apps.products.models import Product

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('confirmed', 'Confirmée'),
        ('shipped', 'Expédiée'),
        ('delivered', 'Livrée'),
        ('cancelled', 'Annulée'),
    )
    
    PAYMENT_STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('paid', 'Payé'),
        ('failed', 'Échoué'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    order_number = models.CharField(max_length=20, unique=True, editable=False)
    
    # Contract Information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20)
    
    # Delivery Information
    commune = models.CharField(max_length=100)
    shipping_address = models.TextField()
    
    # Financials
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=1000)
    
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    payment_method = models.CharField(max_length=50, default='cod') # cod = Cash on Delivery
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS_CHOICES, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Order #{self.order_number} - {self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            import uuid
            self.order_number = str(uuid.uuid4()).split('-')[0].upper()
        super().save(*args, **kwargs)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2) # Snapshot of price at purchase
    
    def __str__(self):
        product_name = self.product.name if self.product else 'Deleted Product'
        return f"{self.quantity} x {product_name} (Order #{self.order.order_number})"
