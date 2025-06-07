from rest_framework import serializers
from .models import (
    Profile, Experience, Education, 
    Service, Skill, Project, BlogPostCategory, 
    BlogPost, Tag, ContactMessage, Testimonial, ContactMe
)
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['user']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    technologies = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'





class BlogPostCategorySerializer(serializers.ModelSerializer):
     class Meta:
        model = BlogPostCategory
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = '__all__'
        lookup_field = 'slug'





class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['created_at', 'read']




class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'  # This includes all fields: id, picture, name, description, job
        
        # Only make specific fields read-only if needed
        read_only_fields = ('__all__',)  # Typically only ID is read-only



class ContactMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMe
        fields = '__all__'
        read_only_fields = ['created_at', 'read']


