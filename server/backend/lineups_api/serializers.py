from rest_framework import serializers
from lineups_api.models import Lineup, Playbook, Map, Agent

class LineupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineup
        fields = '__all__'

class PlaybookSerializer(serializers.ModelSerializer):
    lineups = LineupSerializer(many=True, required=False)
    agent_image = serializers.SerializerMethodField()
    agent_skills = serializers.SerializerMethodField()
    map_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Playbook
        fields = ('id', 'playbook_name', 'agent', 'map_name', 'lineups', 'agent_image', 'agent_skills', 'map_image')
        read_only_fields = ('lineups',)
    
    def get_agent_image(self, obj):
        agent = Agent.objects.get(display_name=obj.agent)
        return agent.display_icon
    
    def get_agent_skills(self, obj):
        agent = Agent.objects.get(display_name=obj.agent)
        return agent.abilities
    
    def get_map_image(self, obj):
        val_map = Map.objects.get(display_name=obj.map_name)
        return val_map.display_icon
    
    
        

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = '__all__'
        
class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'