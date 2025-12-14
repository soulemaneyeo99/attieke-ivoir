from rest_framework import serializers
from .models import Category, Product, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'image')

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'alt_text')

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'category', 'name', 'slug', 'description', 
            'price', 'unit', 'stock', 'is_available', 
            'is_featured', 'images', 'created_at'
        )

class ProductListSerializer(serializers.ModelSerializer):
    """Lighter serializer for list views"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = (
            'id', 'category_name', 'name', 'slug', 
            'price', 'unit', 'is_available', 'image'
        )

    def get_image(self, obj):
        first_image = obj.images.first()
        if first_image:
            return ProductImageSerializer(first_image).data
        return None
