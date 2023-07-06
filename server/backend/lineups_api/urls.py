from django.urls import path
from lineups_api import views

urlpatterns = [
    path('playbooks/', views.playbook_list),
    path('playbooks/<int:pk>/', views.playbook_detail),
    path('map', views.fetch_maps)
]