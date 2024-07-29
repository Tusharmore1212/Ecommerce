# forms.py
from django import forms

class AdvertisementForm(forms.Form):
    title = forms.CharField(max_length=100, label='Title')
    image = forms.ImageField(label='Image')
    url = forms.URLField(label='URL')
    active = forms.BooleanField(required=False, label='Active', initial=True)
