from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Usuario, Disciplinar, Reserva_ambiente, Sala
from .serializers import UsuariosSerializer, DisciplinaSerializer, ReservaAmbienteSerializer,LoginSerializer, SalasSerializer
from .permissions import isGestor, isProfessor, isDonoOuGestor
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404


"""

Gestor_Create_USER: Esses dois metodos são capazes
de fazer um crud de usuarios. Somente gestores tem
a permissão para fazer.

"""
class Gestor_Create_USER(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuariosSerializer
    permission_classes = [isGestor]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data) #obtem o serializer do request
        serializer.is_valid(raise_exception = True) #verifica se o serializer é valido
        self.perform_create(serializer)#salva no banco
        return Response({"Mensagem":"Usuário criado com sucesso !", "usuario":serializer.data}, status=status.HTTP_201_CREATED) #retorna codigo com mensagem 
      
class Gestor_Crud_User(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all() 
    serializer_class = UsuariosSerializer
    permission_classes = [isGestor]
    lookup_field = 'pk' #pegando o id

    def update(self, request, *args, **kwargs):
        #Tenta obter a instancia da request
        try:
            istance = self.get_object()
        except Http404:
                return Response({"Mensagem":"Usuário não encontrado !"}, status=status.HTTP_404_NOT_FOUND) #mensagem de erro caso não encontre
        serializer = self.get_serializer(istance, data=request.data) #da o update para aquela instancia por meio do request enviado
        serializer.is_valid(raise_exception = True) #verifica se o que foi enviado é valido
        self.perform_update(serializer)#salva no banco
        return Response({"Mensagem":"Usuário atualizado com sucesso !", "usuario":serializer.data}, status=status.HTTP_200_OK) #retorna codigo com mensagem 
      
    def destroy(self, request, *args, **kwargs):
        #Tenta obter a instancia da request
        try:
            instance = self.get_object()
        except Http404:
            return Response({"Mensagem":"Usuário não encontrado !"}, status=status.HTTP_404_NOT_FOUND) #mensagem de erro caso não encontre
        self.perform_destroy(instance)#salva no banco que foi destruido
        return Response({"Mensagem":"Usuário deletado com sucesso !"}, status=status.HTTP_204_NO_CONTENT) #retorna codigo com mensagem
    
"""

Gestor_Create_Sala: Esse metodo é capaz de criar salas
onde somente o gestor pode criar e quem tiver logado 
visualizar.

RetriveUpdateDestroySala: Esse metodo é capaz de 
atualizar, obter e exlucir uma sala , somente gestor
tem acesso.

"""

class Gestor_Create_Sala(ListCreateAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalasSerializer
    permission_classes = [isGestor]

    #definindo as permissones se for get qualquer um autenticado se não, somente gestor
    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]
        return [isGestor()]

class RetriveUpdateDestroySala(RetrieveUpdateDestroyAPIView):
    queryset = Sala.objects.all()
    serializer_class = SalasSerializer
    permission_classes = [isGestor]
    Lookup_field = 'pk' #procura pela pk


"""
Gestor_Disciplinas: Esse metodo é capaz de criar disciplinas
onde somente o gestor pode criar e quem tiver logado 
visualizar.

Gestor_Crud_Disciplinas: Esse metodo é capaz de 
atualizar, obter e exlucir uma disciplina , somente gestor
tem acesso.

"""

#CRUD PARA DISCIPLINAS -> GESTOR
class Gestor_Disciplinas(ListCreateAPIView):
    queryset = Disciplinar.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [isGestor]

    def get_permissions(self): #se o metodo for get qualquer um poderá visualizar
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [isGestor()] #somente gestores podem criar 
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        self.perform_create(serializer)
        return Response({"Mensagem":"Disciplina criada com sucesso !", "discplina":serializer.data}, status=status.HTTP_201_CREATED) #mensagem
    
class Gestor_Crud_Disciplinas(RetrieveUpdateDestroyAPIView):
    queryset = Disciplinar.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [isGestor]

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response({"Mensagem":"Disciplina não encontrada!"}, status=status.HTTP_404_NOT_FOUND) #mensagem
        serialiizer = self.get_serializer(instance, data=request.data)
        serialiizer.is_valid(raise_exception = True)
        self.perform_update(serialiizer)
        return Response({"Mensagem":"Disciplina atulizada com sucesso!"}, status=status.HTTP_204_NO_CONTENT) #mensagem
    
    def get(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response({"Mensagem":"Disciplina não encontrada!"}, status=status.HTTP_404_NOT_FOUND) #mensagem
        
        
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response({"Mensagem":"Disciplina não encontrada!"}, status=status.HTTP_404_NOT_FOUND) #mensagem
        self.perform_destroy(instance)#salva no banco
        return Response({"Mensagem":"Disciplina deletada com sucesso!"}, status=status.HTTP_200_OK) #mensagem




"""
Professores_Listar_disciplinas: Esse metodo é capaz retornar
disciplinas do professor autenticado.
"""

#Professor ver suas disciplinas
class Professores_Listar_disciplinas(ListAPIView):

    serializer_class = DisciplinaSerializer
    permission_classes = [isProfessor]

    #definindo o queryset
    def get_queryset(self):
        return Disciplinar.objects.filter(professor=self.request.user) # o queryset é filtrado pelo professor logado
    



"""
ReservaAmbienteProfessorLitsCreate: Esse metodo é capaz de
criar e listar ambientes reservados, somente gestores tem acesso
e se for para GET todos os autenticados tem acesso.

Se o professor que for visualizar, ele irá ver soemente 
as reservas dele no query_param

"""

#Listar e criar reserva de ambiente, somente gestores podem criar.
class ReservaAmbienteProfessorLitsCreate(ListCreateAPIView):
    queryset = Reserva_ambiente.objects.all()
    serializer_class = ReservaAmbienteSerializer
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]
        return [isGestor()]
    
    '''
    define o query set, se tiver o parametro de query, filtrara para o professor escolhido
    '''
    def get_queryset(self):
        queryset = super().get_queryset()
        professor_id = self.request.query_params.get('professor', None)
        if professor_id:
            queryset = queryset.filter(professor_id=professor_id)
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data) #obtem o serializer do request
        serializer.is_valid(raise_exception = True) #verifica se o serializer é valido
        self.perform_create(serializer)#salva no banco
        return Response({"Mensagem":"Ambiente reservado com sucesso !", "ambiente":serializer.data}, status=status.HTTP_201_CREATED) #mensagem


class ReserveAmbienteRetriveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Reserva_ambiente.objects.all()
    serializer_class = ReservaAmbienteSerializer
    permission_classes = [isDonoOuGestor]
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response({"Mensagem":"Ambiente não encontrada!"}, status=status.HTTP_404_NOT_FOUND) #mensagem
        serialiizer = self.get_serializer(instance, data=request.data)
        serialiizer.is_valid(raise_exception = True)
        self.perform_update(serialiizer)
        return Response({"Mensagem":"Ambiente atulizado com sucesso!"}, status=status.HTTP_200_OK) #mensagem
    
    def get(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response({"Mensagem":"Ambiente não encontrado!"}, status=status.HTTP_404_NOT_FOUND) #mensagem
        
        
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Http404:
            return Response({"Mensagem":"Ambiente não encontrado!"}, status=status.HTTP_404_NOT_FOUND) #mensagem
        self.perform_destroy(instance)#salva no banco
        return Response({"Mensagem":"Ambiente deletado com sucesso!"}, status=status.HTTP_200_OK) #mensagem


# Professor 
class ReservaAmbiente_visualizar_professor(ListAPIView):

    serializer_class = ReservaAmbienteSerializer
    permission_classes = [isProfessor]

    def get_queryset(self):
        return Reserva_ambiente.objects.filter(professor=self.request.user)
    

# Login     
class login(TokenObtainPairView):
    serializer_class = LoginSerializer
