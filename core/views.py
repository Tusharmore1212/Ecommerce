from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from core import models
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate,logout as auth_logout
from django.contrib import messages
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.db import transaction
import pandas as pd
from django.http import HttpResponse
from django.utils.dateparse import parse_date
from datetime import timedelta
from .models import Order
from django.shortcuts import render
from django.utils.dateparse import parse_date
from .models import Order
from django.shortcuts import render
from django.db.models import Count, Sum
from .models import Order, Product, Category
import matplotlib.pyplot as plt
from io import BytesIO
import base64

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Advertisement
from .form import AdvertisementForm

def home(request):
    notebook_category_id = 1
    pen_category_id = 2

    notebook_products = models.Product.objects.filter(category_id=notebook_category_id)[:4]
    pen_products = models.Product.objects.filter(category_id=pen_category_id)[:4]
    return render(request, 'index.html', {'products': notebook_products, 'pro': pen_products})

@login_required
def product_list(request):
    category_id = request.GET.get('category')
    products = models.Product.objects.all()

    if category_id:
        products = products.filter(category_id=category_id)

    categories = models.Category.objects.all()
    return render(request, 'find_product.html', {'products': products, 'categories': categories})

def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            request.session['user_id'] = user.id
            messages.success(request, 'Logged in successfully.')
            if user.is_staff or user.is_superuser:
                return redirect('/admin-dashboard/')
            else:
                return redirect('/product_list/')
        else:
            messages.error(request, 'Invalid email or password.')

    return render(request, 'login.html')


def reg(request):
    if request.method == 'POST':
        firstname = request.POST.get('first_name')
        lastname = request.POST.get('last_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone_number')
        address = request.POST.get('address')
        password = request.POST.get('password')
        password_confirmation = request.POST.get('password_confirmation')

        if password != password_confirmation:
            messages.error(request, 'Passwords do not match')
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists')
            return redirect('register')

        user = User.objects.create_user(username=email, email=email, password=password)
        user.first_name = firstname
        user.last_name = lastname
        user.save()

        custom_user = models.CustomUser(user=user, phone_number=phone, address=address)
        custom_user.save()

        messages.success(request, 'Account created successfully. Please log in.')
        return redirect('login2')

    return render(request, 'registration.html')

def admin_dashboard(request):
    recent_orders = models.Order.objects.order_by('-created_at')[:5]

    return render(request, 'admin_dashboard.html', {
        'recent_orders': recent_orders,
    })

class add_category(View):
    def get(self, request):
        return render(request, 'add_category.html')

    def post(self, request):
        name = request.POST['name']
        desc = request.POST['description']
        models.Category.objects.create(Category_name=name, description=desc)
        return render(request, 'add_book_msg.html')

class show_category(View):
    def get(self, request):
        categories = models.Category.objects.all()
        return render(request, 'show_categories.html', {'categories': categories})

def add_product(request):
    if request.method == 'POST':
        name = request.POST['name']
        category_id = request.POST['category']
        price = request.POST['price']
        stock = request.POST['stock']
        description = request.POST['description']
        image = request.FILES.get('image')

        category = models.Category.objects.get(id=category_id)

        product = models.Product(
            name=name,
            category=category,
            price=price,
            stock=stock,
            description=description,
            image=image
        )
        product.save()
        return redirect('admin_dashboard')

    categories = models.Category.objects.all()
    return render(request, 'add_product.html', {'categories': categories})

def show_products(request):
    products = models.Product.objects.all()
    return render(request, 'show_product.html', {'products': products})

@login_required(login_url='login2')
def product_detail(request, product_id):
    product = get_object_or_404(models.Product, id=product_id)

    if request.method == 'POST':
        try:
            quantity = int(request.POST['quantity'])
            if quantity <= 0:
                raise ValueError("Quantity must be greater than zero.")
        except (KeyError, ValueError):
            messages.error(request, 'Invalid quantity. Please enter a valid number.')
            return redirect('product_detail', product_id=product_id)

        if quantity > product.stock:
            messages.error(request, f"Sorry, only {product.stock} units available.")
            return redirect('product_detail', product_id=product_id)

        cart_item, created = models.CartItem.objects.get_or_create(user=request.user, product=product)
        cart_item.quantity = quantity
        cart_item.save()

        messages.success(request, 'Product added to cart successfully.')
        return redirect('cart')  

    return render(request, 'product_detail.html', {'product': product})


@login_required(login_url='login2')
def cart(request):
    cart_items = models.CartItem.objects.filter(user=request.user)
    total_price = 0

    for item in cart_items:
        item.total = item.product.price * item.quantity
        total_price += item.total

    return render(request, 'add_to_cart.html', {'cart_items': cart_items, 'total_price': total_price})


@login_required(login_url='login2')
@login_required(login_url='login2')
def logout(request):
    cart_items = models.CartItem.objects.filter(user=request.user)
    cart_items.delete()
    if 'cart_items' in request.session:
        del request.session['cart_items']
    auth_logout(request)
    messages.success(request, 'Logged out successfully.')
    return redirect('login2')

def remove_from_cart(request, item_id):
    cart_item = get_object_or_404(models.CartItem, id=item_id)
    cart_item.delete()  
    return redirect('cart')

@login_required(login_url='login2')
def checkout(request):
    cart_items = models.CartItem.objects.filter(user=request.user)
    total_price = sum(item.product.price * item.quantity for item in cart_items)
    print("working1")
    for item in cart_items:
        item.total = item.product.price * item.quantity
    print("working2")
    try:
        customer = models.CustomUser.objects.get(user=request.user)
        print("working3")
    except models.CustomUser.DoesNotExist:
        customer = None

    if request.method == 'POST':
        address = request.POST.get('address')
        phone_number = request.POST.get('phone_number')
        email = request.POST.get('email')
        payment_method = request.POST.get('payment_method')
        print("working4")
        with transaction.atomic():
            order = models.Order.objects.create(
                user=request.user,
                total_price=total_price,
                address=address,
                phone_number=phone_number,
                email=email,
                payment_method=payment_method
            )

            for item in cart_items:
                product = item.product
                product.stock -= item.quantity
                product.save()

                models.OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item.quantity
                )

            cart_items.delete()

            messages.success(request, 'Checkout successful. Your order has been placed!')
            return redirect('thank_you')
    print("working5")
    return render(request, 'checkout.html', {
        'cart_items': cart_items,
        'total_price': total_price,
        'customer': customer
         
    }
    )

def generate_chart_image(chart_func, *args, **kwargs):
    fig, ax = plt.subplots()
    chart_func(ax, *args, **kwargs)
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return image_base64

def category_chart(ax):
    category_data = Category.objects.annotate(num_products=Count('product'))
    category_names = list(category_data.values_list('Category_name', flat=True))
    category_counts = list(category_data.values_list('num_products', flat=True))
    
    ax.bar(category_names, category_counts, color='skyblue')
    ax.set_xlabel('Category')
    ax.set_ylabel('Number of Products')
    ax.set_title('Category Distribution')


def sales_pie_chart(ax):
    sales_per_category = Product.objects.values('category__Category_name').annotate(total_sales=Sum('price')).order_by('-total_sales')
    
    sales_category_names = list(sales_per_category.values_list('category__Category_name', flat=True))
    sales_totals = list(sales_per_category.values_list('total_sales', flat=True))

    ax.pie(sales_totals, labels=sales_category_names, autopct='%1.1f%%', colors=plt.get_cmap('tab10').colors)
    ax.set_title('Total Sales per Category')


def monthly_sales_chart(ax):
    monthly_sales = Order.objects.extra({'month': "strftime('%%Y-%%m', created_at)"}).values('month').annotate(total=Sum('total_price')).order_by('month')
    
    months = list(monthly_sales.values_list('month', flat=True))
    monthly_totals = list(monthly_sales.values_list('total', flat=True))
    
    ax.bar(months, monthly_totals, color='salmon')
    ax.set_xlabel('Month')
    ax.set_ylabel('Total Sales')
    ax.set_title('Monthly Sales')


def analytical_view(request):
    category_chart_image = generate_chart_image(category_chart)
    sales_pie_chart_image = generate_chart_image(sales_pie_chart)
    monthly_sales_chart_image = generate_chart_image(monthly_sales_chart)

    category_data = Product.objects.values('category__Category_name').annotate(num_products=Count('id'))
    category_names = [item['category__Category_name'] for item in category_data]
    category_counts = [item['num_products'] for item in category_data]

    context = {
        'category_chart_image': category_chart_image,
        'sales_pie_chart_image': sales_pie_chart_image,
        'monthly_sales_chart_image': monthly_sales_chart_image,
        'category_names': category_names,  
        'category_counts': category_counts, 
    }

    return render(request, 'analytical_view.html', context)



def view_all_orders(request):
    orders = models.Order.objects.all()[::-1]
    return render(request, 'view_all_orders.html', {'orders': orders})

def thank_you(request):
    return render(request, 'thank_you.html')

def view_order_detail(request, order_id):
    order = get_object_or_404(models.Order, id=order_id)
    order_items = order.orderitem_set.all()

    print(f"Order ID: {order.id}")
    print(f"Order Items Count: {order_items.count()}")

    order_item_details = [
        {
            'item': item,
            'total_price': item.quantity * item.product.price
        }
        for item in order_items
    ]
    
    for detail in order_item_details:
        print(f"Product: {detail['item'].product.name}, Total Price: {detail['total_price']}")

    total_price = sum(detail['total_price'] for detail in order_item_details)
    
    return render(request, 'view_order_detail.html', {
        'order': order,
        'order_item_details': order_item_details,
        'total_price': total_price
    })
def change_order_status(request, order_id):
    order = get_object_or_404(models.Order, id=order_id)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        order.status = new_status
        order.save()
        messages.success(request, f'Order #{order.id} status updated to {new_status}.')
        return redirect('view_all_orders')
    return redirect('view_all_orders') 

def update_cart(request):
    if request.method == 'POST':
        item_id = request.POST.get('item_id')
        quantity = int(request.POST.get('quantity', 1))  

        cart_item = models.CartItem.objects.get(id=item_id)
        cart_item.quantity = quantity
        cart_item.save()

        return redirect('cart') 

    return redirect('cart') 


@login_required
def manage_advertisements(request):
    if request.method == 'POST':
        form = AdvertisementForm(request.POST, request.FILES)
        if form.is_valid():
            Advertisement.objects.create(
                title=form.cleaned_data['title'],
                image=form.cleaned_data['image'],
                url=form.cleaned_data['url'],
                active=form.cleaned_data['active']
            )
            return redirect('manage_advertisements')
    else:
        form = AdvertisementForm()
    advertisements = Advertisement.objects.all()
    return render(request, 'manage_advertisements.html', {'form': form, 'advertisements': advertisements})
def my_orders(request):
    orders = models.Order.objects.filter(user=request.user)[::-1]
    return render(request, 'my_orders.html', {'orders': orders})

def delete_product2(request, product_id):
    product = get_object_or_404(models.Product, id=product_id)
    if request.method == 'POST':
        product.delete()
        return redirect('product_list')  
    return render(request, 'product_delete_confirm.html', {'product': product})

def index1(request):
    products = models.Product.objects.filter(category_id=3)[:2]
    context = {
        'products': products,
    }
    return render(request, 'index1.html',context )

def cancel_order(request, order_id):
    order = get_object_or_404(models.Order, id=order_id)
    
    if request.method == 'POST' and order.can_cancel():
        order.status = 'canceled'
        order.save()
        messages.success(request, 'Order canceled successfully.')
    else:
        messages.error(request, 'Unable to cancel order.')

    return redirect('my_orders')

def manage_users(request):
    users = User.objects.all()
    return render(request, 'manage_users.html', {'users': users})

def enable_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    user.is_active = True
    user.save()
    messages.success(request, f"User {user.username} has been enabled.")
    return redirect('manage_users')


def disable_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    user.is_active = False
    user.save()
    messages.success(request, f"User {user.username} has been disabled.")
    return redirect('manage_users')



def generate_report(request):
    orders = []
    if request.method == 'POST':
        start_date_str = request.POST.get('start_date')
        end_date_str = request.POST.get('end_date')
        if start_date_str and end_date_str:
            start_date = parse_date(start_date_str)
            end_date = parse_date(end_date_str)
            if start_date and end_date:
                orders = Order.objects.filter(
                    created_at__range=[start_date, end_date]
                )
    
    return render(request, 'report.html', {'orders': orders})


def generate_excel(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    if start_date and end_date:
        start_date = parse_date(start_date)
        end_date = parse_date(end_date)
        end_date = end_date + timedelta(days=1) 

        orders = Order.objects.filter(
            created_at__range=[start_date, end_date]
        )

        data = []
        for order in orders:
            created_at = order.created_at.astimezone(None) if order.created_at else None
            data.append([
                order.id,
                order.user.custom_user.user,
                order.address,
                order.phone_number,
                order.total_price,
                created_at.date() if created_at else None,  
                order.status
            ])

        df = pd.DataFrame(data, columns=['Order ID', 'Customer Name', 'Customer Address', 'Customer Phone', 'Total Price', 'Date', 'Status'])

        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="order_report.xlsx"'

        with pd.ExcelWriter(response, engine='openpyxl') as writer:
            df.to_excel(writer, index=False)

        return response
    return HttpResponse("No data to generate")
def update_product(request, product_id):
    product = get_object_or_404(models.Product, id=product_id)
    categories = models.Category.objects.all()

    if request.method == 'POST':
        name = request.POST['name']
        category_id = request.POST['category']
        price = request.POST['price']
        stock = request.POST['stock']
        description = request.POST['description']
        image = request.FILES.get('image')

        product.name = name
        product.category = models.Category.objects.get(id=category_id)
        product.price = price
        product.stock = stock
        product.description = description
        if image:
            product.image = image
        product.save()
        return redirect('show_products') 

    return render(request, 'update_product.html', {'product': product, 'categories': categories})
def update_category(request, pk):
    category = get_object_or_404(models.Category, pk=pk)

    if request.method == 'POST':
        category.Category_name = request.POST.get('name')
        category.description = request.POST.get('description')
        category.save()
        return redirect('show_category')  

    return render(request, 'update_category.html', {'category': category})

def delete_category(request, category_id):
    if request.method == 'POST':
        category = get_object_or_404(models.Category, id=category_id)
        category.delete()
        return redirect('show_category')  
    else:
        return redirect('show_category')   
    
    