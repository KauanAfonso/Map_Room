from django.contrib import admin
from .models import Usuario, Disciplinar, Reserva_ambiente
from django.contrib.auth.admin import UserAdmin




class UsuarioModelAdmin(UserAdmin):
    # -------------Informações que aparecerá no painel admin
    fieldsets = UserAdmin.fields + (
        (None,{'fields': ('username', 'ni', 'first_name', 'tipo' ),}),
    )
    # -------------Informações que aparecerá na criação do objeto no admin
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None,{'fields': ('username','ni', 'first_name', 'tipo' ),}),
    )


class DisciplinaAdmin(UserAdmin):

    fieldsets = UserAdmin.fields + (
        (None,{'fields': ('nome', 'curso', 'descricao', 'professor'),}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None,{'fields': ('nome', 'curso', 'descricao', 'professor'),}),
    )


class ReservaAmbienteAdmin(UserAdmin):

    fieldsets = UserAdmin.fields + (
        (None,{'fields': ('sala_reservada', 'data_inicio', 'data_termino', 'periodo', 'professor'),}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None,{'fields': ('nome', 'curso', 'descricao', 'professor'),}),
    )


class SalaAdmin(UserAdmin):

    fieldsets = UserAdmin.fields + (
        (None,{'fields': ('nome', 'capacidade_alunos'),}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None,{'fields': ('nome', 'capacidade_alunos'),}),
    )




admin.site.register(Usuario, UsuarioModelAdmin , Disciplinar, DisciplinaAdmin, Reserva_ambiente, ReservaAmbienteAdmin)
