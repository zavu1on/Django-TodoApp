from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ListTodoSerializer, DetailTodoSerializer, CreateTodoSerializer, UpdateTodoSerializer
from .models import TodoModel
from .service import get_id_by_token


class ListTodoView(GenericAPIView):
    serializer_class = ListTodoSerializer

    def get(self, request):
        id = get_id_by_token(request)
        todos = TodoModel.objects.filter(user_id=id)
        serializer = ListTodoSerializer(todos, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class DetailTodoView(GenericAPIView):
    def get(self, request, pk):
        try:
            id = get_id_by_token(request)

            todos = TodoModel.objects.get(user_id=id, id=pk)
            serializer = DetailTodoSerializer(todos)
            return Response(serializer.data, status.HTTP_200_OK)
        except:
            return Response({'detail': 'Не найдено'}, status=status.HTTP_404_NOT_FOUND)


class CreateTodoView(GenericAPIView):
    serializer_class = CreateTodoSerializer

    def post(self, request):
        serializer = CreateTodoSerializer(data=request.data)
        id = get_id_by_token(request)

        if serializer.is_valid():
            TodoModel.objects.create(
                **serializer.data,
                user_id=id
            )
            return Response({'detail': f'Заданиее "{serializer.data["title"]}" было успешно создано'}, status.HTTP_201_CREATED)
        return Response({'detail': 'Данные ввода невалидны', **serializer.errors}, status.HTTP_400_BAD_REQUEST)


class DeleteTodoView(GenericAPIView):
    def post(self, request, pk):
        try:
            id = get_id_by_token(request)
            TodoModel.objects.get(user_id=id, id=pk).delete()

            return Response({}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'detail': 'Не найдено'}, status=status.HTTP_404_NOT_FOUND)
        
        
class UpdateCheckedView(GenericAPIView):
    def post(self, request, pk):
        try:
            id = get_id_by_token(request)
            todo = TodoModel.objects.get(user_id=id, id=pk)
            todo.checked = not todo.checked
            todo.save()

            return Response({}, status.HTTP_204_NO_CONTENT)
        except:
            return Response({'detail': 'Не найдено'}, status=status.HTTP_404_NOT_FOUND)


class UpdateTodoView(GenericAPIView):
    def post(self, request, pk):
        user_id = get_id_by_token(request)
        serializer = UpdateTodoSerializer(data=request.data)

        if serializer.is_valid():
            todo = TodoModel.objects.get(id=pk, user_id=user_id)

            todo.title = serializer.data['title']
            todo.description = serializer.data['description']
            todo.save()

            return Response({'detail': f'Заданиее "{serializer.data["title"]}" было успешно обновлено'}, status.HTTP_200_OK)

        return Response({'detail': 'Данные ввода невалидны', **serializer.errors}, status.HTTP_400_BAD_REQUEST)


