from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import (
    Profile, Experience, Education, 
    Service, Skill, Project, BlogPostCategory, 
    BlogPost, Tag, ContactMessage, Testimonial, ContactMe
)
from .serializers import (
    ProfileSerializer, ExperienceSerializer, EducationSerializer,
    ServiceSerializer, SkillSerializer, ProjectSerializer, BlogPostCategorySerializer,
    BlogPostSerializer, TagSerializer, ContactMessageSerializer, TestimonialSerializer, ContactMeSerializer
)
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        profile_id = self.kwargs.get('profile_pk')
        return Experience.objects.filter(profile_id=profile_id)

    def perform_create(self, serializer):
        profile = get_object_or_404(Profile, pk=self.kwargs.get('profile_pk'))
        serializer.save(profile=profile)

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        profile_id = self.kwargs.get('profile_pk')
        return Education.objects.filter(profile_id=profile_id)

    def perform_create(self, serializer):
        profile = get_object_or_404(Profile, pk=self.kwargs.get('profile_pk'))
        serializer.save(profile=profile)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('order')
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        featured = self.request.query_params.get('featured', None)
        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() == 'true')
        return queryset
    


class BlogPostCategoryView(viewsets.ModelViewSet):
    queryset = BlogPostCategory.objects.all()
    serializer_class = BlogPostCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]



class BlogPostViewSet(viewsets.ModelViewSet):
    """
    Handles blog posts with slug-based lookup
    Example: /api/blogposts/my-first-post/
    """
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = BlogPost.objects.all()
        published = self.request.query_params.get('published', None)
        if published is not None:
            queryset = queryset.filter(published=published.lower() == 'true')
        return queryset.order_by('-publish_date')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class BlogPostByIdViewSet(viewsets.ModelViewSet):
    """
    Handles blog posts with ID-based lookup
    Example: /api/blogposts-by-id/1/
    """
    serializer_class = BlogPostSerializer
    lookup_field = 'id'  # Explicitly set to ID
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = BlogPost.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

class LatestProjectsView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Project.objects.filter(featured=True).order_by('-date_completed')[:4]

class FeaturedBlogPostsView(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return BlogPost.objects.filter(published=True).order_by('-publish_date')[:3]







class TestimonialView(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer  # Fixed: Using TestimonialSerializer instead of TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]



    

class ContactMeView(viewsets.ModelViewSet):
    queryset = ContactMe.objects.all()
    serializer_class = ContactMeSerializer
    http_method_names = ['post']  # If you only want to allow POST