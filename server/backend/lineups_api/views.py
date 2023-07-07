from django.shortcuts import render
from lineups_api.serializers import PlaybookSerializer, LineupSerializer, MapSerializer
from lineups_api.models import Playbook, Lineup, Map, Agent
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests


# Create your views here.
@api_view(['GET', 'POST'])
def playbook_list(request):
    if request.method == "POST":
        playbook_serializer = PlaybookSerializer(data=request.data)
        if (playbook_serializer.is_valid()):
            playbook_serializer.save()
            return Response(playbook_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(playbook_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    playbooks = Playbook.objects.all()
    serializer = PlaybookSerializer(playbooks, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def playbook_detail(request, pk):
    # playbook = Playbook.objects.prefetch_related('lineups').get(pk=pk)
    playbook = Playbook.objects.get(pk=pk)
    if request.method == "GET":
        playbook = Playbook.objects.get(pk=pk)
        print(playbook.lineups.all())
        serializer = PlaybookSerializer(playbook)
        return Response(serializer.data)
    #request is POST
    print(request.data)
    lineup_serializer = LineupSerializer(data=request.data)
    if (lineup_serializer.is_valid()):
        print('valid')
        lineup_serializer.save(playbook=playbook)
        return Response(lineup_serializer.data, status=status.HTTP_201_CREATED)
    return Response(lineup_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_maps(request):
    if request.method == "GET":
        r = requests.get('https://valorant-api.com/v1/maps/')
        for val_map in r.json()['data']:
            existing_map = Map.objects.filter(display_name=val_map['displayName'])
            if (existing_map.exists()): 
                existing_map.update(display_icon = val_map['listViewIcon'], minimap=val_map['displayIcon'])
            else:
                map_entry = Map(display_name = val_map['displayName'], display_icon = val_map['listViewIcon'], minimap = val_map['displayIcon'])
                map_entry.save()
            
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def fetch_agents(request):
    if request.method == "GET":
        r = requests.get('https://valorant-api.com/v1/agents')
        for val_agent in r.json()['data']:
            if val_agent['isPlayableCharacter'] != True:
                continue
            existing_agent = Agent.objects.filter(display_name=val_agent['displayName'])
            if existing_agent.exists():
                existing_agent.update(display_name=val_agent['displayName'], display_icon=val_agent['displayIcon'], abilities=val_agent['abilities'])
            else:
                val_agent = Agent(display_name=val_agent['displayName'], display_icon=val_agent['displayIcon'], abilities=val_agent['abilities'])
                val_agent.save()
    return Response(status=status.HTTP_200_OK)