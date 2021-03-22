from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TodoModel


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ListTodoSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TodoModel
        fields = ('id', 'title', 'checked', 'created_at', 'user')


class DetailTodoSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TodoModel
        fields = '__all__'


class CreateTodoSerializer(ModelSerializer):
    class Meta:
        model = TodoModel
        fields = ('title', 'description', 'checked')


class UpdateTodoSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=30, required=True)
    description = serializers.CharField(max_length=100, required=False, allow_blank=True)
