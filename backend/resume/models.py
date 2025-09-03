# resume/models.py
import os
from django.core.validators import FileExtensionValidator
from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    summary = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_file = models.FileField(
        upload_to='resume/', blank=True, null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])
        ]
    )

    def save(self, *args, **kwargs):
        """Deleting previously existing resume file on new upload
        This is to avoid files accumulating on the server.
        This also covers the scenario where different filetypes could
        be uploaded. Previous file is deleted nonetheless.
        """
        try:
            old_resume = Profile.objects.get(pk=self.pk)
            if old_resume.resume_file:
                if os.path.isfile(old_resume.resume_file.path):
                    os.remove(old_resume.resume_file.path)
        except Profile.DoesNotExist:
            pass # first save. No previous file exists.

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Experience(models.Model):
    job_title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'{self.job_title} - {self.company}'

class Responsibility(models.Model):
    experience = models.ForeignKey(Experience, related_name='responsibilities', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text[:50]

class Education(models.Model):
    institution = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    year = models.CharField(max_length=10)
    certificate_image = models.FileField(upload_to='certificates/', null=True, blank=True)

    def __str__(self):
        return f'{self.degree}'

class Skill(models.Model):

    SKILL_CHOICES = [
        ('uncategorized', '--Uncategorized--'),
        ('professional', 'Professional'),
        ('technical', 'Technical'),
    ]
    name = models.CharField(max_length=100)

    category = models.CharField(max_length=20, choices=SKILL_CHOICES, default='uncategorized')

    def __str__(self):
        return self.name

class Language(models.Model):
    LANGUAGE_PROFICIENCY_CHOICES = [
        ('elementary', 'Elementary'),
        ('limited', 'Limited'),
        ('fluent', 'Fluent'),
    ]

    name = models.CharField(max_length=25)
    proficiency = models.CharField(max_length=20, choices=LANGUAGE_PROFICIENCY_CHOICES, default='elementary')

    def __str__(self):
        return self.name

class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=100, null=True, blank=True)
    year = models.CharField(max_length=10, null=True, blank=True)
    certificate_image  = models.FileField(upload_to='certificates/', null=True, blank=True)

    def __str__(self):
        return f'{self.name} - {self.issuer}'
