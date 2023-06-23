from django.shortcuts import render
from lineups_api.serializers import PlaybookSerializer, LineupSerializer
from lineups_api.models import Playbook, Lineup
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(['GET'])
def playbook_list(request):
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