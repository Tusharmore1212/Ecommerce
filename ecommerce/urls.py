"""
URL configuration for ecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from core import views

urlpatterns = [
    path('', views.index1,name="index1"),
    path('logout/', views.logout,name="logout"),
    path('generate-report/', views.generate_report, name='generate_report'),
    path('generate_excel/', views.generate_excel, name='generate_excel'),
    path('update_product/<int:product_id>/', views.update_product, name='update_product'),
    path('delete_category/<int:category_id>/', views.delete_category, name='delete_category'),
    path('update_category/<int:pk>/', views.update_category, name='update_category'),
    path('view-all-orders/', views.view_all_orders, name='view_all_orders'),
    path('admin/', admin.site.urls),
    path('change-order-status/<int:order_id>/', views.change_order_status, name='change_order_status'),
    path('view-order/<int:order_id>/', views.view_order_detail, name='view_order_detail'),
    path("reg/",views.reg),
    path('', include("core.allurls")),  
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),    path('add_category/', views.add_category.as_view(), name='add_category'),
    path('product_list/', views.product_list, name='product_list'),
    path('register/', views.reg, name='register'),
    path('login2/', views.user_login, name='login2'),
    path('manage-advertisements/', views.manage_advertisements, name='manage_advertisements'),

    path('analytical-view/', views.analytical_view, name='analytical_view'),
    path('product_detail/<int:product_id>/', views.product_detail, name='product_detail'),
    path('cart/', views.cart, name='cart'),    
    path('show_category/', views.show_category.as_view(), name='show_category'),
    path('add_product/', views.add_product, name='add_product'),
    path('show_products/', views.show_products, name='show_products'),
    path('thank-you/', views.thank_you, name='thank_you'),
    path('my-orders/', views.my_orders, name='my_orders'),
    path('cancel-order/<int:order_id>/', views.cancel_order, name='cancel_order'),
    path('checkout/', views.checkout, name='checkout'),
    path('update_cart/', views.update_cart, name='update_cart'),
    path('products/<int:product_id>/delete/', views.delete_product2, name='delete_product'),
    path('remove_from_cart/<int:item_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('manage-users/', views.manage_users, name='manage_users'),
    path('enable-user/<int:user_id>/', views.enable_user, name='enable_user'),
    path('disable-user/<int:user_id>/', views.disable_user, name='disable_user'),
]
