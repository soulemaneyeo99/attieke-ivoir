from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer, OrderCreateSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()] # Allow guest checkout
        return [permissions.IsAuthenticated()]
        
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:
                return Order.objects.all().order_by('-created_at')
            return Order.objects.filter(user=user).order_by('-created_at')
        return Order.objects.none() # Guests can't list orders
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        
        # Return the full order representation
        read_serializer = OrderSerializer(order)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)
