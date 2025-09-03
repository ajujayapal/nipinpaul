# resume/urls.py
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
# router.register('profile', ProfileView)  --> does not work since ProfileView is not a ViewSet
router.register('experience', ExperienceViewSet)
router.register('education', EducationViewSet)
router.register('skills', SkillViewSet)
router.register('languages', LanguageViewSet)
router.register('certifications', CertificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload-profile-image/', UploadProfileImage.as_view()),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('contact/', ContactView.as_view()),
    path('send-resume/', SendResumeView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
