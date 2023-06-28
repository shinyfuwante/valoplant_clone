from rest_framework import serializers
from lineups_api.models import Lineup, Playbook

class LineupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineup
        fields = '__all__'

class PlaybookSerializer(serializers.ModelSerializer):
    lineups = LineupSerializer(many=True, required=False)
    class Meta:
        model = Playbook
        fields = ('id', 'playbook_name', 'agent', 'map_name', 'lineups')
        read_only_fields = ('lineups',)
        