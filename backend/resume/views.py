import os
from rest_framework import viewsets, status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import Throttled
from .models import *
from .serializers import *
from django.conf import settings
# from sendgrid import SendGridAPIClient
# from sendgrid.helpers.mail import Mail, Attachment, FileName, FileContent, FileType, Disposition
# import boto3
# from botocore.exceptions import ClientError
import resend
import uuid
import base64


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer

class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

class LanguageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

class UploadProfileImage(APIView):
    def post(self, request):
        image = request.FILES.get('image')
        if not image:
            return Response({"error": "No image uploaded"}, status=400)

        filename = 'profile.jpg'
        path = os.path.join(settings.MEDIA_ROOT, 'profile', filename)
        os.makedirs(os.path.dirname(path), exist_ok=True)

        with open(path, 'wb+') as f:
            for chunk in image.chunks():
                f.write(chunk)

        return Response({"message": "Profile image uploaded successfully."})

class ContactView(APIView):

    throttle_scope = 'low_usage'

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        if request.data.get('website'):
            return Response({"error": "Spam Detected"}, status=400)

        if not all([name, email, message]):
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        subject = f'NipinPaul.com - Message from {name}'
        content = f"""
        <strong>Name:</strong> {name}<br>
        <strong>Email:</strong> {email}<br>
        <strong>Message:</strong><p>{message}</p>"""

        resend.api_key = settings.RESEND_API_KEY

        unique_id = str(uuid.uuid4())

        try:

            params: resend.Emails.SendParams = {
                "from": "Nipin Paul <no-reply@nipinpaul.com>",
                "to": ["nipin.paul.1@gmail.com"],
                "subject": subject,
                "html": content,
                "headers": {
                    "X-Entity-Ref-ID": unique_id
                },
            }
            email= resend.Emails.send(params)
            return Response(email, status=status.HTTP_200_OK)



        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SendResumeView(APIView):
    throttle_scope = 'low_usage'

    def post(self, request):

        html_message = """
        <p>Dear Sir/Madam,</p>
        <p>Thank you for your interest in my background and experience. As requested, I've attached my current resume for your review.
        Please feel free to reach out if you have any questions or would like to discuss my qualifications further.</p>
        
        <p>I look forward to hearing from you.</p>
        
        Best regards,<br>
        Nipin Paul<br>
        +91 81291 77568<br>
        nipin.paul.1@gmail.com<br>
        """

        to_email = request.data.get('email')

        if not to_email:
            return JsonResponse({'error': 'Email is required.'}, status=400)

        try:
            # Path to resume file
            profile = Profile.objects.first()
            resume_field_value = profile.resume_file
            resume_path = os.path.join(settings.MEDIA_ROOT, resume_field_value.name)

            # Read and encode the PDF file
            with open(resume_path, 'rb') as f:
                file_data = f.read()
                encoded_file = base64.b64encode(file_data).decode('latin-1')


            attachment: resend.Attachment = {"content": encoded_file, "filename": "Nipin_Paul_Resume.pdf"}

            params: resend.Emails.SendParams = {
                "from": "Nipin Paul <no-reply@nipinpaul.com>",
                "to": [to_email],
                "subject": "Nipin Paul Resume",
                "html": html_message,
                "attachments": [attachment],
            }

            resend.Emails.send(params)

            return JsonResponse({'message': 'Resume sent successfully!'}, status=200)

        except FileNotFoundError:
            return JsonResponse({'error': 'Resume file not found.'}, status=500)

        except Throttled as e:
            return JsonResponse({
                'error': f'Too many requests. Try again in {int(e.wait)} seconds.'
            }, status=429)


        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    # def throttled(self, request, wait):
    #     return Response({'error': 'You have reached the limit for resume requests for the hour. Please try again later.'},
    #                     status=status.HTTP_429_TOO_MANY_REQUESTS)