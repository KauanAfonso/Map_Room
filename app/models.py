from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    ni = models.BigIntegerField(unique=True)
    funcionario = models.CharField(max_length=1, choices=(("G","Gestor"), ("P", "Professor")))
    nome = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    data_nascimento = models.DateField()
    data_contratacao = models.DateField()

class Disciplinar(models.Model):
    nome = models.CharField()
    curso = models.CharField()
    descricao = models.TextField()
    
    professor = models.ForeignKey(Usuario, on_delete=models.CASCADE)

class Reserva_ambiente(models.Model):
    data_inicio = models.DateField()
    data_termino = models.DateField()
    periodo = models.CharField(max_length=1, choices=(("M", "Manhã"), ("T", "Tarde"), ("N", "Noite")))
    sala_reservada = models.CharField(max_length=255)
