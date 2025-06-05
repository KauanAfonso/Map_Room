from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

'''

Class de usuário:
    Receberá informações no usuário e herda informações para o login

'''
class Usuario(AbstractUser):
    ni = models.BigIntegerField(unique=True, blank=True, null=True)
    tipo = models.CharField(max_length=1, choices=(("G","Gestor"), ("P", "Professor"))) 
    data_nascimento = models.DateField(blank=True, null=True)
    data_contratacao = models.DateField(blank=True, null=True)
    telefone = models.CharField(max_length=22, blank=True, null=True)

'''

Class de disciplinas:
    Receberá informações das disciplinas.

'''
class Disciplinar(models.Model):
    nome = models.CharField(max_length=255)
    curso = models.CharField(max_length=255)
    descricao = models.TextField()
    carga_horaria = models.IntegerField(blank=True, null=True, default=100)
    professor = models.ForeignKey(Usuario, related_name='usuario', on_delete=models.SET_NULL, blank=True, null=True, limit_choices_to={'tipo': 'P'})

    def __str__(self):
        return f'{self.nome}'

'''

Class de Sala:
    Receberá informações da salas da escola.

'''
class Sala(models.Model):
    nome = models.CharField(max_length=100)
    capacidade_alunos = models.IntegerField()

    def __str__(self):
        return str(self.nome)
    
'''

Class de Reserva_ambiente:
    Receberá do ambiente reervado e relaciona com o professor(Usuario).
'''
class Reserva_ambiente(models.Model):
    data = models.DateField()
    periodo = models.CharField(max_length=1, choices=(("M", "Manhã"), ("T", "Tarde"), ("N", "Noite")))
    sala_reservada = models.ForeignKey(Sala, related_name='sala_reservada', on_delete=models.CASCADE)
    professor = models.ForeignKey(Usuario, related_name='professor', on_delete=models.CASCADE, limit_choices_to={'tipo': 'P'})

    def __str__(self):
        return str(self.sala_reservada)
    
