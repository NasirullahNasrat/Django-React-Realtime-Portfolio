from django.contrib import admin
from .models import (
    Profile, Experience, Education, 
    Service, Skill, Project, 
    BlogPost, Tag, ContactMessage, Testimonial, BlogPostCategory, ContactMe
)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'title', 'email')
    search_fields = ('full_name', 'title', 'email')
    list_filter = ('title',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('job_title', 'company', 'start_date', 'end_date', 'current')
    list_filter = ('current', 'company')
    search_fields = ('job_title', 'company', 'description')
    date_hierarchy = 'start_date'

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'field_of_study', 'start_date', 'end_date')
    search_fields = ('degree', 'institution', 'field_of_study')
    list_filter = ('institution', 'current')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title', 'description')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'order')
    list_filter = ('category',)
    search_fields = ('name',)
    list_editable = ('proficiency', 'order')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_completed', 'featured')
    list_filter = ('featured', 'technologies')
    search_fields = ('title', 'description')
    filter_horizontal = ('technologies',)
    date_hierarchy = 'date_completed'

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'publish_date', 'published')
    list_filter = ('published', 'tags', 'author')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    date_hierarchy = 'publish_date'

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'read')
    list_filter = ('read', 'created_at')
    search_fields = ('name', 'email', 'subject')
    date_hierarchy = 'created_at'
    actions = ['mark_as_read']

    def mark_as_read(self, request, queryset):
        queryset.update(read=True)
    mark_as_read.short_description = "Mark selected messages as read"




@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'job', 'description_short')
    list_filter = ('job',)
    search_fields = ('name', 'job', 'description')
    
    def description_short(self, obj):
        """Shortens the description for the admin list display"""
        return obj.description[:50] + '...' if len(obj.description) > 50 else obj.description
    description_short.short_description = 'Description'

    


admin.site.register(BlogPostCategory)
admin.site.register(ContactMe)

