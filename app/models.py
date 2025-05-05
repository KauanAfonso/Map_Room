from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    ni = models.BigIntegerField(unique=True)
    tipo = models.CharField(max_length=1, choices=(("G","Gestor"), ("P", "Professor")))
    data_nascimento = models.DateField()
    data_contratacao = models.DateField()
    telefone = models.CharField(max_length=22)

class Disciplinar(models.Model):
    nome = models.CharField()
    curso = models.CharField()
    descricao = models.TextField()
    professor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, null=True, limit_choices_to={'tipo': 'P'})

    def __str__(self):
        return f'{self.nome} {self.get_tipo_display()}'
    

class Sala(model.Model):
    nome = models.CharField(max_length=100)
    capacidade_alunos = models.IntegerField()

    def __str__(self):
        return self.nome
    

class Reserva_ambiente(models.Model):
    data_inicio = models.DateField()
    data_termino = models.DateField()
    periodo = models.CharField(max_length=1, choices=(("M", "Manhã"), ("T", "Tarde"), ("N", "Noite")))
    sala_reservada = models.ForeignKey(Sala, on_delete=models.CASCADE)
    professor = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'tipo': 'P'})

    def __str__(self):
        return self.sala_reservada