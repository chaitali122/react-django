from django.urls import include, path
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'battles', views.BattleView)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path('', include(router.urls)),
    path('count/', views.CountView.as_view()),
    path('places/', views.PlacesView.as_view()),
    path('stats/', views.StatsView.as_view()),
    path('search/', views.SearchView.as_view()),
    path('create/', views.CreateView.as_view()),
    path('read/', views.ReadView.as_view()),
    path('update/', views.UpdateView.as_view()),
    path('delete/', views.DeleteView.as_view()),

]