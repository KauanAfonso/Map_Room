from rest_framework import serializers
from .models import Usuario, Disciplinar, Reserva_ambiente, Sala
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class SalasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','username', 'email','telefone','tipo','ni','data_nascimento','data_contratacao']
        # extra_kwargs = {
        #     'id': {'read_only': True}
        # }


class DisciplinaSerializer(serializers.ModelSerializer):
    professor = serializers.StringRelatedField()
    class Meta:
        model = Disciplinar
        fields = '__all__'


class ReservaAmbienteSerializer(serializers.ModelSerializer):
    professor = UsuariosSerializer(read_only=True) # Expande o campo 'professor' com os dados do usuário relacionad
    class Meta:
        model = Reserva_ambiente
        fields = '__all__'
     

    def validate(self, data):
        # Só realiza a verificação se todos os campos necessários estiverem presentes
        sala = data.get('sala_reservada')
        data_reserva = data.get('data')
        periodo = data.get('periodo')

        if sala and data_reserva and periodo:
            conflito = Reserva_ambiente.objects.filter(
                sala_reservada=sala,
                data=data_reserva,
                periodo=periodo
            )

            # Se for atualização (PUT/PATCH), ignora a própria instância
            if self.instance:
                conflito = conflito.exclude(pk=self.instance.pk)

            if conflito.exists():
                raise serializers.ValidationError("Essa sala já está reservada nesse dia e nesse mesmo período!")

        return data

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