from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Playbook(models.Model):
    agent = models.CharField(max_length=50)
    # possibly need the skill images as well
    map_name = models.CharField(max_length=50)
    playbook_name = models.CharField(max_length=50)
    
    def __str__(self):
        return '[id: {}] {}'.format(self.id, self.playbook_name)
    

class Lineup(models.Model):
    playbook = models.ForeignKey(Playbook, on_delete=models.CASCADE, related_name = 'lineups')
    dest_x = models.FloatField()
    dest_y = models.FloatField()
    source_x = models.FloatField()
    source_y = models.FloatField()
    #stand_img = models.URLField(blank=True, null=True) # image to show where to stand if needed (precise lineups)
    #aim_img = models.URLField(blank=True, null=True) # image where to line up or aim 
    stand_img = CloudinaryField(blank=True, null=True) # image to show where to stand if needed (precise lineups)
    aim_img = CloudinaryField(blank=True, null=True) # image where to line up or aim 
    skill_type = models.IntegerField() # 1-4, using agent to get the skill image
    is_attack_sided = models.BooleanField()
    notes = models.TextField(max_length=500)
    
    def __str__(self):
        return 'Lineup for {} [id: {}]'.format(self.playbook, self.id)
    
class Map(models.Model):
    display_name = models.CharField(max_length=20)
    display_icon = models.URLField(null=True) #ListViewIcon
    minimap = models.URLField(null=True) #DisplayIcon
    
class Agent(models.Model):
    uuid = models.CharField(max_length=100)
    display_name = models.CharField(max_length=20)
    display_icon = models.URLField()
    abilities = models.JSONField()
    
    