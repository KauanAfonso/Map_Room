from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

class Usuario(AbstractUser):
    ni = models.BigIntegerField(unique=True, blank=True, null=True)
    tipo = models.CharField(max_length=1, choices=(("G","Gestor"), ("P", "Professor")))
    data_nascimento = models.DateField(blank=True, null=True)
    data_contratacao = models.DateField(blank=True, null=True)
    telefone = models.CharField(max_length=22, blank=True, null=True)

class Disciplinar(models.Model):
    nome = models.CharField(max_length=255)
    curso = models.CharField(max_length=255)
    descricao = models.TextField()
    professor = models.ForeignKey(Usuario, related_name='usuario', on_delete=models.SET_NULL, blank=True, null=True, limit_choices_to={'tipo': 'P'})

    def __str__(self):
        return f'{self.nome}'


class Sala(models.Model):
    nome = models.CharField(max_length=100)
    capacidade_alunos = models.IntegerField()

    def __str__(self):
        return str(self.nome)
    

class Reserva_ambiente(models.Model):
    data = models.DateField()
    periodo = models.CharField(max_length=1, choices=(("M", "Manhã"), ("T", "Tarde"), ("N", "Noite")))
    sala_reservada = models.ForeignKey(Sala, related_name='sala_reservada', on_delete=models.CASCADE)
    professor = models.ForeignKey(Usuario, related_name='professor', on_delete=models.CASCADE, limit_choices_to={'tipo': 'P'})

    def __str__(self):
        return str(self.sala_reservada)
    
#     def clean(self):
 
#    #    Verifica se já existe um conflito de horário para a mesma sala, dia e período
#         conflito = Reserva_ambiente.objects.filter(
#             sala_reservada = self.sala_reservada,
#             data = self.data,
#             periodo = self.periodo
#         ).exclude(pk=self.pk)# Exclui o próprio objeto, se estiver sendo editado

#         if conflito.exists():
#              raise ValidationError({'__all__': ('Essa sala já está reservada nesse dia e nesse mesmo período!')})

        
#     def save(self, *args, **kwargs):
#         self.full_clean()  # Garante que o clean() seja executado antes do save
#         super().save(*args, **kwargs)  # Chama o método save() da classe pai



