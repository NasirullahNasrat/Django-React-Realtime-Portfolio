from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.ProfileViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'testimonials', views.TestimonialView)
router.register(r'blogpostcategory', views.BlogPostCategoryView, basename='blogpostcategory')  # Slug-based
router.register(r'blogposts', views.BlogPostViewSet, basename='blogpost')  # Slug-based
router.register(r'blogposts-by-id', views.BlogPostByIdViewSet, basename='blogpost-by-id')  # ID-based
router.register(r'tags', views.TagViewSet)
router.register(r'contact-messages', views.ContactMessageViewSet)
router.register(r'contactme', views.ContactMeView, basename='contactme')
# Nested routes
profile_router = DefaultRouter()
profile_router.register(r'experiences', views.ExperienceViewSet, basename='profile-experience')
profile_router.register(r'educations', views.EducationViewSet, basename='profile-education')

urlpatterns = [
    path('', include(router.urls)),
    path('profiles/<int:profile_pk>/', include(profile_router.urls)),
    path('latest-projects/', views.LatestProjectsView.as_view(), name='latest-projects'),
    path('featured-blogposts/', views.FeaturedBlogPostsView.as_view(), name='featured-blogposts'),
    
    
]