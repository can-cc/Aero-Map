
from django.contrib.auth.models import User
from rest_framework import serializers

'''
Use: For User View 
Function: create, update
'''
class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    username = serializers.CharField(max_length=10)
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=15)
    last_name = serializers.CharField(max_length=15)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'date_joined', 'email')

    def create(self, validated_data):
        rawPassword = validated_data['password']
        validated_data['password'] = ""
        user = User.objects.create(**validated_data)
        user.set_password(rawPassword)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.first_name)
        instance.set_password(instance.password)
        instance.save()
        return instance
