from django.contrib import admin
from .models import Usuario, Disciplinar, Reserva_ambiente, Sala
from django.contrib.auth.admin import UserAdmin




class UsuarioModelAdmin(UserAdmin):

    # Compos que aparecerá do usuario no admin
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('ni', 'tipo')}),
    )


    #informações que aparecerá no meu criar user pelo admin
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('ni', 'tipo')}),
    )
  

admin.site.register(Usuario, UsuarioModelAdmin )
admin.site.register(Disciplinar)
admin.site.register(Reserva_ambiente)
admin.site.register(Sala)