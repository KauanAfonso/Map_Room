from rest_framework import serializers
from .models import Usuario, Disciplinar, Reserva_ambiente
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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

class LoginSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only = True)

    #quando ele logar, retorne as informações do user
    def validate(self, attrs):
        data = super().validate(attrs)

        data['user'] ={
            'username': self.user.username,
            'email':self.user.email,
            'tipo':self.user.tipo
        }

        return data