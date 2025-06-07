from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Profile(models.Model):
    """
    Model for ABOUT section
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    short_bio = models.TextField(blank=True)
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    experience = models.CharField(max_length=20, blank=True)
    complete_projects = models.CharField(max_length=20, blank=True)
    client_satisfaction = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    website = models.URLField(blank=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    
    def __str__(self):
        return f"{self.full_name}'s Profile"

class Experience(models.Model):
    """
    Model for RESUME section - Work Experience
    """
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experiences')
    job_title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current = models.BooleanField(default=False)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.job_title} at {self.company}"

class Education(models.Model):
    """
    Model for RESUME section - Education
    """
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='educations')
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.degree} from {self.institution}"

class Service(models.Model):
    """
    Model for SERVICES section
    """
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Font Awesome icon class or similar")
    
    def __str__(self):
        return self.title

class Skill(models.Model):
    """
    Model for SKILLS section
    """
    SKILL_CATEGORIES = [
        ('LANG', 'Programming Languages'),
        ('FRAME', 'Frameworks & Libraries'),
        ('TOOL', 'Tools & Platforms'),
        ('DESIGN', 'Design'),
        ('OTHER', 'Other'),
    ]
    
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=10, choices=SKILL_CATEGORIES)
    proficiency = models.PositiveIntegerField(default=50, help_text="Percentage value 0-100")
    order = models.PositiveIntegerField(default=0)
    img = models.ImageField(upload_to='images/', blank=True)

    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']

class Project(models.Model):
    """
    Model for PROJECTS section
    """
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='project_images/')
    technologies = models.ManyToManyField(Skill)
    project_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    date_completed = models.DateField(null=True, blank=True)
    featured = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    


class BlogPostCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"
    
    def __str__(self):
        return self.name

class BlogPost(models.Model):
    """
    Model for BLOG section
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    category = models.ForeignKey(
        BlogPostCategory, 
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='blogs'
    )
    excerpt = models.TextField(max_length=300)
    featured_image = models.ImageField(upload_to='blog_images/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    publish_date = models.DateTimeField(default=timezone.now)
    tags = models.ManyToManyField('Tag', blank=True)
    
    def __str__(self):
        return self.title

class Tag(models.Model):
    """
    Tags for blog posts
    """
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    """
    Model for CONTACT section submissions
    """
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
    


class Testimonial(models.Model):
    picture = models.ImageField(upload_to='images/', blank=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    job = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    


    

class ContactMe(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    message = models.TextField(max_length=200)

    def __str__(self):
        return self.name