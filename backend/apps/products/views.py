from rest_framework import viewsets, filters 
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product
from .serializers import (
    CategorySerializer, 
    ProductSerializer, 
    ProductListSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_available=True)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'is_featured']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductSerializer
