from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'

class OrderCreateItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderCreateItemSerializer(many=True, write_only=True)
    
    class Meta:
        model = Order
        fields = [
            'first_name', 'last_name', 'email', 'phone', 
            'commune', 'shipping_address', 'payment_method', 
            'items'
        ]
        
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # Calculate totals
        total_amount = 0
        order_items = []
        
        for item_data in items_data:
            product = Product.objects.get(id=item_data['product_id'])
            price = product.price
            total_amount += price * item_data['quantity']
            order_items.append({
                'product': product,
                'quantity': item_data['quantity'],
                'price': price
            })
            
        # Add delivery fee (hardcoded 1000 for now based on frontend)
        delivery_fee = 1000 
        total_amount += delivery_fee
        
        # Create Order
        user = self.context['request'].user if self.context['request'].user.is_authenticated else None
        
        order = Order.objects.create(
            user=user,
            total_amount=total_amount,
            delivery_fee=delivery_fee,
            **validated_data
        )
        
        # Create Order Items
        for item in order_items:
            OrderItem.objects.create(order=order, **item)
            
        return order
