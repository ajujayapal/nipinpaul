from .base import *
from backend.env import env

DEBUG = False

ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', default=[])

CORS_ALLOWED_ORIGINS = [
    'https://nipinpaul.com',
    'https://www.nipinpaul.com',
]