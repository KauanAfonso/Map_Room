from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Usuario, Disciplinar, Reserva_ambiente
from .serializers import UsuariosSerializer, DisciplinaSerializer, ReservaAmbienteSerializer,LoginSerializer
from .permissions import isGestor, isProfessor, isDonoOuGestor
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView




#CRUD PARA O USUARIO -> GESTOR
class Gestor_Create_USER(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuariosSerializer
    permission_classes = [isGestor]

class Gestor_Crud_User(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuariosSerializer
    permission_classes = [isGestor]
    lookup_field = 'pk' #pegando o id


#CRUD PARA DISCIPLINAS -> GESTOR
class Gestor_Disciplinas(ListCreateAPIView):
    queryset = Disciplinar.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [isGestor]

    def get_permissions(self): #se o metodo for get qualquer um poderá visualizar
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [isGestor()] #somente gestores podem criar 

class Gestor_Crud_Disciplinas(RetrieveUpdateDestroyAPIView):
    queryset = Disciplinar.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [isGestor]


#Professor ver suas disciplinas
class Professores_Listar_disciplinas(ListAPIView):

    serializer_class = DisciplinaSerializer
    permission_classes = [isProfessor]

    def get_queryset(self):
        return Disciplinar.objects.filter(professor=self.request.user) # o queryset é filtrado pelo professor logado
    

#Listar e criar reserva de ambiente, somente gestores podem criar.
class ReservaAmbienteProfessorLitsCreate(ListCreateAPIView):
    queryset = Reserva_ambiente.objects.all()
    serializer_class = ReservaAmbienteSerializer
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]
        return [isGestor]
    
    '''
    
    define o query set, se tiver o parametro de query, filtrara para o professor escolhido
    
    '''
    def get_queryset(self):
        queryset = super().get_queryset(self)
        profesor_id = self.request.query_params.get('professor', None)
        if profesor_id:
            queryset = queryset.filter(profesor_id=profesor_id)
        return queryset
            

class ReserveAmbienteRetriveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Reserva_ambiente.objects.all()
    serializer_class = ReservaAmbienteSerializer
    permission_classes = [isDonoOuGestor]
    lookup_field = 'pk'


# Professor 
class ReservaAmbiente_visualizar_professor(ListAPIView):

    serializer_class = ReservaAmbienteSerializer
    permission_classes = isProfessor

    def get_queryset(self):
        return Reserva_ambiente.objects.filter(professor=self.request.user)


class login(TokenObtainPairView):
    serializer_class = LoginSerializer
