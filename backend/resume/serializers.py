from rest_framework import serializers

from . import models
from .models import Profile, Experience, Responsibility, Education, Skill, Certification, Language


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ResponsibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsibility
        fields = ['id', 'text']

class ExperienceSerializer(serializers.ModelSerializer):
    responsibilities = ResponsibilitySerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    certificate_image = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Education
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):
    certificate_image = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Certification
        fields = '__all__'

class ContactSerializer(serializers.Serializer):
    name =  serializers.CharField(max_length=100)
    email =  serializers.EmailField()
    message = serializers.CharField(min_length=10)
    website = serializers.CharField(required=False, allow_blank=True)

    def validate_message(self, value):
        if "http" in value.lower():
            raise serializers.ValidationError("No links allowed in message.")
        return value

    def validate_website(self, data):
        if data.get('website'): # Spam bot filled it
            raise serializers.ValidationError('Spam detected.')
        return data