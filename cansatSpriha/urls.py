from django.contrib import admin
from django.urls import path,include
from spriha.views import home, get_gps_data
urlpatterns = [
    path('admin/', admin.site.urls),
    path("bhuvan/", get_gps_data, name="gps_data"),
    path('',home,name='homePage'),
]



