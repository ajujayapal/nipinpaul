from django.contrib import admin
from .models import Profile, Experience, Responsibility, Education, Skill, Certification, Language


class ResponsibilityInline(admin.TabularInline):
    model = Responsibility
    extra = 1

class ExperienceAdmin(admin.ModelAdmin):
    inlines = [ResponsibilityInline]


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuer', 'year')


admin.site.register(Profile)
admin.site.register(Experience, ExperienceAdmin)
admin.site.register(Education)
admin.site.register(Skill)
admin.site.register(Language)
# admin.site.register(Certification)
