
from django.urls import path
from .views import login , Gestor_Create_USER, Gestor_Create_Sala, RetriveUpdateDestroySala, Gestor_Crud_User, ReservaAmbienteProfessorLitsCreate, ReserveAmbienteRetriveUpdateDestroy, ReservaAmbiente_visualizar_professor, Gestor_Disciplinas,Gestor_Disciplinas,Gestor_Crud_Disciplinas, Professores_Listar_disciplinas

urlpatterns = [
    #login
    path('login/', login.as_view()),
    
    #Usuario
    path('usuario/', Gestor_Create_USER.as_view()),
    path('usuario/<int:pk>', Gestor_Crud_User.as_view()),

    #Reserva
    path('reservas/',ReservaAmbienteProfessorLitsCreate.as_view()),
    path('reservas/<int:pk>', ReserveAmbienteRetriveUpdateDestroy.as_view()),
    path('professor/reservas/', ReservaAmbiente_visualizar_professor.as_view()),

    #Diciplinas
    path('disciplinas/', Gestor_Disciplinas.as_view()),
    path('disciplinas/<int:pk>', Gestor_Crud_Disciplinas.as_view()),
    path('professor/disciplinas/', Professores_Listar_disciplinas.as_view()),

    #Salas
    path('salas/', Gestor_Create_Sala.as_view()),
    path('salas/<int:pk>', RetriveUpdateDestroySala.as_view())
]
