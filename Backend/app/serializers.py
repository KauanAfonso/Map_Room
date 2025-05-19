from rest_framework import serializers
from .models import Usuario, Disciplinar, Reserva_ambiente, Sala
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


#view de salas
class SalasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ['id','username', "password", 'email','telefone','tipo','ni','data_nascimento','data_contratacao']

        extra_kwargs = {
            'password': {'write_only': True}  # Evita mostrar a senha nas respostas
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)  # Remove para não aplicar duas vezes

        # Atualiza os demais campos
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Atualiza a senha, se fornecida
        if password:
            instance.set_password(password)  # Aplica hash corretamente

        instance.save()
        return instance


#view de disciplinas
class DisciplinaSerializer(serializers.ModelSerializer):
    professor_name = serializers.CharField(source='professor.username', read_only=True)
    class Meta:
        model = Disciplinar
        fields = ['nome', 'curso' , 'descricao', 'professor' , 'professor_name']

class ReservaAmbienteSerializer(serializers.ModelSerializer):
    professor_name = serializers.CharField(source='professor.username', read_only=True) #pegar um campo espeficifo, para o nome do professor e somente para get

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
            #buscando se já existe uma reserva feita para essa mesma sala, no mesmo dia e no mesmo período.
            conflito = Reserva_ambiente.objects.filter(
                sala_reservada=sala,
                data=data_reserva,
                periodo=periodo
            )
            #verifica se o professor já tem uma outra reserva feita nesse mesmo dia e período,
            conflito2 = Reserva_ambiente.objects.filter(
                data=data_reserva,
                periodo=periodo,
                professor=professor
            )

            # Se for atualização (PUT/PATCH), ignora a própria instância
            if self.instance:
                conflito = conflito.exclude(pk=self.instance.pk)
                conflito2 = conflito2.exclude(pk=self.instance.pk)

            '''
            Se um dos dois conflitos existir retornar erros
            '''
            if conflito.exists():
                raise serializers.ValidationError("Essa sala já está reservada nesse dia e nesse mesmo período!")
            
            if conflito2.exists():
                raise serializers.ValidationError("Esse professor ja agendou uma sala nesse periodo e dia!")
            

        return data

#serializer de login: herda TokenObtainPairSerializer para obeter fresh e o refresh
class LoginSerializer(TokenObtainPairSerializer):

    #pega os campos campos enviados
    username = serializers.CharField()
    password = serializers.CharField(write_only = True) #somente na escrita

    #validando os dados
    def validate(self, attrs):
        data = super().validate(attrs)

        #Obtendo mais dados do user
        data['user'] ={
            'username': self.user.username,
            'email':self.user.email,
            'tipo':self.user.tipo
        }

        return data