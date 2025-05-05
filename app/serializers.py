from rest_framework import serializers
from .models import Usuario, Disciplinar, Reserva_ambiente

class UsuariosSerializer(serializers.Serializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplinar
        fields = '__all__'


class ReservaAmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva_ambiente
        fields = '__all__'