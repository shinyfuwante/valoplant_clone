from rest_framework import serializers
from lineups_api.models import Lineup, Playbook, Map, Agent
from cloudinary import CloudinaryImage

class LineupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineup
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        if 'stand_img' in data:
            # Extract the Cloudinary public ID from the relative URL
            public_id = data['stand_img'].split('/')[-1].split('.')[0]

            # Construct the full Cloudinary URL using the public ID and Cloudinary settings
            image_url = CloudinaryImage(public_id).build_url(secure=True)
            data['stand_img'] = image_url
        
        if 'aim_img' in data:
            # Extract the Cloudinary public ID from the relative URL
            public_id = data['aim_img'].split('/')[-1].split('.')[0]

            # Construct the full Cloudinary URL using the public ID and Cloudinary settings
            image_url = CloudinaryImage(public_id).build_url(secure=True)
            data['aim_img'] = image_url

        return data

class PlaybookSerializer(serializers.ModelSerializer):
    lineups = LineupSerializer(many=True, required=False)
    agent_image = serializers.SerializerMethodField()
    agent_skills = serializers.SerializerMethodField()
    map_image = serializers.SerializerMethodField()
    minimap = serializers.SerializerMethodField()
    
    class Meta:
        model = Playbook
        fields = ('id', 'playbook_name', 'agent', 'map_name', 'lineups', 'agent_image', 'agent_skills', 'map_image', 'minimap')
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
    
    def get_minimap(self, obj):
        val_map = Map.objects.get(display_name=obj.map_name)
        return val_map.minimap
    
    
        

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = '__all__'
        
class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'