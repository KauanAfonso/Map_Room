from rest_framework.permissions import BasePermission
from .models import Usuario


#permissão que verifica se o user é gestor e se esta logado
class isGestor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.tipo == "G" 
       
class isProfessor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.tipo == "P"
    
class isDonoOuGestor(BasePermission):
    #permissao quando consulta um objeto em especifico
    #o parametro obj -> é o que vira da aplicação
    def has_object_permission(self, request, view, obj):
        if request.user.tipo == 'G':
            return True
        return obj.professor == request.user