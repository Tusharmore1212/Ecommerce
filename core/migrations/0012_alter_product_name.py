# Generated by Django 5.0.6 on 2024-07-25 05:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_advertisement'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(max_length=254),
        ),
    ]
