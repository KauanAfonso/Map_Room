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

    def update(self, instance, validated_data):
        password = validated_data.get("password", instance.password)
            
        if password:
            instance.set_password(password)  # Aplica o hash

        instance.save()
        return instance


class DisciplinaSerializer(serializers.ModelSerializer):
    professor_name = serializers.CharField(source='professor.username', read_only=True)
    class Meta:
        model = Disciplinar
        fields = ['nome', 'curso' , 'descricao', 'professor' , 'professor_name']


class ReservaAmbienteSerializer(serializers.ModelSerializer):
    # professor_detalhes = UsuariosSerializer(source='professor.email', read_only=True) #pegar todos os dados do professor 
    professor_name = serializers.CharField(source='professor.username', read_only=True) #pegar um campo espeficifo

    class Meta:
        model = Reserva_ambiente
        fields = ['data','professor', 'periodo', 'professor_name', 'sala_reservada']
     

    def validate(self, data):
        # Só realiza a verificação se todos os campos necessários estiverem presentes
        sala = data.get('sala_reservada')
        data_reserva = data.get('data')
        periodo = data.get('periodo')
        professor = data.get('professor')

        if sala and data_reserva and periodo:
            conflito = Reserva_ambiente.objects.filter(
                sala_reservada=sala,
                data=data_reserva,
                periodo=periodo
            )

            conflito2 = Reserva_ambiente.objects.filter(
                data=data_reserva,
                periodo=periodo,
                professor=professor
            )

            # Se for atualização (PUT/PATCH), ignora a própria instância
            if self.instance:
                conflito = conflito.exclude(pk=self.instance.pk)
                conflito2 = conflito2.exclude(pk=self.instance.pk)

            if conflito.exists():
                raise serializers.ValidationError("Essa sala já está reservada nesse dia e nesse mesmo período!")
            
            if conflito2.exists():
                raise serializers.ValidationError("Essa professor ja agendou uma sala nesse periodo e dia!")
            

        return data

class LoginSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only = True)


    def validate(self, attrs):
        data = super().validate(attrs)

        data['user'] ={
            'username': self.user.username,
            'email':self.user.email,
            'tipo':self.user.tipo
        }

        return data