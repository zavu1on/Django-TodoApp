from django.db import models
from django.contrib.auth.models import User
from datetime import date
# Create your models here.


class TodoModel(models.Model):
    title = models.CharField('Заголовок', max_length=30, unique=True)
    description = models.TextField('Описание', max_length=100, blank=True)
    checked = models.BooleanField('Отмечено', default=False)
    user = models.ForeignKey(User, models.CASCADE, 'Пользователь')
    created_at = models.DateField('Дата создания', default=date.today)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Задание'
        verbose_name_plural = 'Задания'
