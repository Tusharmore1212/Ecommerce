from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin,Group,Permission,User
from django.db import models
from django.utils import timezone

class Category(models.Model):
    Category_name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
class Advertisement(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='ads/')
    url = models.URLField()
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
class Product(models.Model):
    name = models.CharField(max_length=254)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='static/d',null=True)

class CustomUser(AbstractBaseUser, PermissionsMixin): 
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_user', default="")
    address = models.TextField('address', blank=True)
    phone_number = models.CharField('phone number', max_length=20, blank=True)
    groups = models.ManyToManyField(Group, verbose_name='groups', blank=True, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(Permission, verbose_name='user permissions', blank=True, related_name='custom_user_set')

    USERNAME_FIELD = 'user'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.user.email

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

# models.py

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('canceled', 'Canceled'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.TextField()
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    payment_method = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Order #{self.id} ({self.user.username}) - {self.status}"

    def can_cancel(self):
        return self.status == 'pending'



class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order #{self.order.id}"