from django.urls import path
from lineups_api import views

urlpatterns = [
    path('playbooks/', views.playbook_list),
    path('playbooks/<int:pk>/', views.playbook_detail),
    path('fetch_map_from_val_api', views.fetch_maps),
    path('fetch_agents_from_val_api', views.fetch_agents)
]