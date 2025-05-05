from django.contrib import admin
from .models import Usuario, Disciplinar, Reserva_ambiente
from django.contrib.auth.admin import UserAdmin




class UsuarioModelAdmin(UserAdmin):
    # -------------Informações que aparecerá no painel admin
    # Apenas os campos adicionais personalizados
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('ni', 'tipo')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('ni', 'tipo')}),
    )


class DisciplinaAdmin(admin.ModelAdmin):

    fields = ('nome', 'curso', 'descricao', 'professor')

class ReservaAmbienteAdmin(admin.ModelAdmin):

    fields = ('sala_reservada', 'data_inicio', 'data_termino', 'periodo', 'professor')

class SalaAdmin(admin.ModelAdmin):

    fields = ('nome', 'capacidade_alunos')
    

admin.site.register(Usuario, UsuarioModelAdmin )
admin.site.register(Disciplinar, DisciplinaAdmin)
admin.site.register(Reserva_ambiente, ReservaAmbienteAdmin)
