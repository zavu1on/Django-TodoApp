from django.urls import path
from .views import (
    ListTodoView,
    DetailTodoView,
    CreateTodoView,
    DeleteTodoView,
    UpdateCheckedView,
    UpdateTodoView
)

urlpatterns = [
    path('todos/', ListTodoView.as_view()),
    path('todos/<int:pk>', DetailTodoView.as_view()),
    path('todos/create', CreateTodoView.as_view()),
    path('todos/delete/<int:pk>', DeleteTodoView.as_view()),
    path('todos/updatechecked/<int:pk>', UpdateCheckedView.as_view()),
    path('todos/update/<int:pk>', UpdateTodoView.as_view()),
]
