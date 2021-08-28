from django.shortcuts import render

# Create your views here.

from .models import battle
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
import urllib

from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os


class CountView(APIView):
     def get(self, request):
        count = battle.objects.count()
        return Response(count)

class PlacesView(APIView):
     def get(self, request):
        # places = battle.objects.values('location')
        arr = []
        places = battle.objects.values_list('location')
        for p in places:
            arr.append(p[0])
        return Response(arr)


class StatsView(APIView):
    def get(self, request):
        most_common_attacker_king = battle.objects.values("attacker_king").annotate(count=Count('attacker_king')).order_by("-count")[0]["attacker_king"]
        most_common_defender_king = battle.objects.values("defender_king").annotate(count=Count('defender_king')).order_by("-count")[0]["defender_king"]
        most_common_region = battle.objects.values("region").annotate(count=Count('region')).order_by("-count")[0]["region"]
        most_common_name = battle.objects.values("name").annotate(count=Count('name')).order_by("-count")[0]["name"]
        win_loss_stats = battle.objects.values("attacker_outcome").annotate(count=Count('attacker_outcome')).order_by("-count")
        win_total = win_loss_stats[0]["count"]
        loss_total = win_loss_stats[1]["count"]
        battletypes = []
        types = battle.objects.values_list('battle_type')
        for t in types:
            battletypes.append(t[0])
        battletypes = list(set(battletypes))
        defender_sizes = battle.objects.order_by('-defender_size').values_list("defender_size")
        arr = []
        for d in defender_sizes:
            if(d[0] != ""):
                arr.append(d[0])
        min_val = min(arr)
        max_val = max(arr)
        avg_val = sum(arr)/len(arr)
        
        final = {
            "most_active": {
                "attacker_king": most_common_attacker_king,
                "defender_king": most_common_defender_king,
                "region": most_common_region,
                "name": most_common_name,
            },
            "attacker_outcome": {
                "win": win_total,
                "loss": loss_total
            },
            "battle_type": battletypes,
            "defender_size": {
                "avg": avg_val,
                "min": min_val,
                "max": max_val
            }
        }

        return Response(final)

class SearchView(APIView):
     def get(self, request):
        # places = battle.objects.values('location')
        query_string = request.GET.urlencode()
        parameters = urllib.parse.unquote(query_string)
        # c1 = battle(defender_size__contains = 10000)
        # c2 = battle(battle_type__contains = "ambush")
        # val = battle.objects.filter(c1 & c2).values_list("attacker_commander")
        print(parameters)

        
        return Response({"search": "Hellooo"})

class CreateView(APIView):
     def post(self, request):
        if request.method == 'POST':
            battle_data = request.data
            post = battle.objects.create(name=battle_data["name"], year=battle_data["year"],battle_number=battle_data["battle_number"], attacker_king=battle_data["attacker_king"], defender_king=battle_data["defender_king"], attacker_1=battle_data["attacker_1"], attacker_2=battle_data["attacker_2"], attacker_3=battle_data["attacker_3"], attacker_4=battle_data["attacker_4"], defender_1=battle_data["defender_1"], defender_2=battle_data["defender_2"], defender_3=battle_data["defender_3"], defender_4=battle_data["defender_4"], attacker_outcome=battle_data["attacker_outcome"], battle_type=battle_data["battle_type"], major_death=battle_data["major_death"], major_capture=battle_data["major_capture"], attacker_size=battle_data["attacker_size"], defender_size=battle_data["defender_size"], attacker_commander=battle_data["attacker_commander"], defender_commander=battle_data["defender_commander"], summer=battle_data["summer"], location=battle_data["location"], region=battle_data["region"],note=battle_data["note"])
            print(battle_data)        
        return Response({"create": "Hellooo"})
        
class LoadDataBaseView(APIView):
     def post(self, request):
        if request.method == 'POST':
            battle_data = request.data
            bulk = []
            for d in battle_data:
                bulk.append(battle(name=d["name"], year=d["year"]))
            post = battle.objects.bulk_create(bulk)
            print(battle_data)
        
        return Response({"create": "Hellooo"})
class ReadView(APIView):
     def get(self, request):
        queryset = battle.objects.all().values()
        return Response(queryset)

class UpdateView(APIView):
     def patch(self, request):
        battle_data = request.data
        queryset = battle.objects.filter(name__contains = battle_data["name"]).update(name=battle_data["name"], year=battle_data["year"], battle_number=battle_data["battle_number"], attacker_king=battle_data["attacker_king"], defender_king=battle_data["defender_king"], attacker_1=battle_data["attacker_1"], attacker_2=battle_data["attacker_2"], attacker_3=battle_data["attacker_3"], attacker_4=battle_data["attacker_4"], defender_1=battle_data["defender_1"], defender_2=battle_data["defender_2"], defender_3=battle_data["defender_3"], defender_4=battle_data["defender_4"], attacker_outcome=battle_data["attacker_outcome"], battle_type=battle_data["battle_type"], major_death=battle_data["major_death"], major_capture=battle_data["major_capture"], attacker_size=battle_data["attacker_size"], defender_size=battle_data["defender_size"], attacker_commander=battle_data["attacker_commander"], defender_commander=battle_data["defender_commander"], summer=battle_data["summer"], location=battle_data["location"], region=battle_data["region"],note=battle_data["note"])
        return Response(queryset)

class DeleteView(APIView):
     def delete(self, request):
        battle_data = request.data
        queryset = battle.objects.filter(name__contains = battle_data["name"]).delete()
        return Response(queryset)

class Assets(View):
    
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()