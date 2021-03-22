from rest_framework.authtoken.models import Token


def get_id_by_token(request):
    token = request.headers['Authorization'].split()[1]
    return Token.objects.get(key=token).user_id
