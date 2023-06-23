from rest_framework import serializers
from lineups_api.models import Lineup, Playbook

class LineupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineup
        fields = '__all__'

class PlaybookSerializer(serializers.ModelSerializer):
    lineups = LineupSerializer(many=True)
    class Meta:
        model = Playbook
        fields = '__all__'
        