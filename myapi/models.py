from django.db import models

# Create your models here.
class battle(models.Model):
    name = models.CharField(max_length=60)
    year = models.CharField(max_length=60,null=True,blank=True)
    battle_number = models.CharField(max_length=60,null=True,blank=True)
    attacker_king = models.CharField(max_length=60,null=True,blank=True)
    defender_king = models.CharField(max_length=60,null=True,blank=True)
    attacker_1 = models.CharField(max_length=60,null=True,blank=True)
    attacker_2 = models.CharField(max_length=60,null=True,blank=True)
    attacker_3 = models.CharField(max_length=60,null=True,blank=True)
    attacker_4 = models.CharField(max_length=60,null=True,blank=True)
    defender_1 = models.CharField(max_length=60,null=True,blank=True)
    defender_2 = models.CharField(max_length=60,null=True,blank=True)
    defender_3 = models.CharField(max_length=60,null=True,blank=True)
    defender_4 = models.CharField(max_length=60,null=True,blank=True)
    attacker_outcome = models.CharField(max_length=60,null=True,blank=True)
    battle_type = models.CharField(max_length=60,null=True,blank=True)
    major_death = models.CharField(max_length=60,null=True,blank=True)
    major_capture = models.CharField(max_length=60,null=True,blank=True)
    attacker_size = models.IntegerField(max_length=60,null=True,blank=True)
    defender_size = models.IntegerField(max_length=60,null=True,blank=True)
    attacker_commander = models.CharField(max_length=60,null=True,blank=True)
    defender_commander = models.CharField(max_length=60,null=True,blank=True)
    summer = models.CharField(max_length=60,null=True,blank=True)
    location = models.CharField(max_length=60,null=True,blank=True)
    region = models.CharField(max_length=60,blank=True,null=True)
    note = models.CharField(max_length=60,blank=True,null=True)

    def __str__(self):
        return self.name
