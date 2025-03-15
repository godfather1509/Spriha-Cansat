from django.shortcuts import render
# Create your views here.
from django.http import JsonResponse
import requests
def home(request):

    return render(request,'index.html')

def get_gps_data(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')

    if not lat or not lon:
        return JsonResponse({'error': 'Latitude and Longitude are required'}, status=400)

    # OpenStreetMap (Tile Server from OpenStreetMap)
    osm_url = f"https://static-maps.yandex.ru/1.x/?ll={lon},{lat}&z=15&l=sat&size=650,450"

    return JsonResponse({'map_url': osm_url})