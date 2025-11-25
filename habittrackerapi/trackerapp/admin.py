from django.contrib import admin
from django.utils.safestring import mark_safe

from trackerapp.models import User, Habit, HabitLog


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'date_joined']
    search_fields = ['username', 'email']
    ordering = ['id']
    readonly_fields = ['avatar_view']

    def avatar_view(self, obj):
        if obj.avatar:
            return mark_safe(f'<img src="{obj.avatar.url}" width="150" height="150" />')
        return 'No Avatar'

    def save_model(self, request, obj, form, change):
        if 'password' in form.changed_data:
            obj.set_password(form.cleaned_data['password'])
        super().save_model(request, obj, form, change)


class HabitLogInline(admin.TabularInline):
    model = HabitLog
    extra = 0
    readonly_fields = ['photo_view']

    def photo_view(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" width="100" height="100" />')
        return 'No Photo'


class HabitAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'user', 'is_active', 'created_at']
    search_fields = ['title', 'user__username']
    ordering = ['-created_at']
    inlines = [HabitLogInline]


class HabitLogAdmin(admin.ModelAdmin):
    list_display = ['id', 'habit', 'date', 'status']
    search_fields = ['habit__title', 'habit__user__username']
    ordering = ['-date']
    readonly_fields = ['photo_view']

    def photo_view(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" width="150" height="150" />')
        return 'No Photo'


class HabitTrackerAdminSite(admin.AdminSite):
    site_header = 'Habit Tracker Administration'
    site_title = 'Habit Tracker Admin'
    index_title = 'Welcome to Habit Tracker Admin'


admin_site = HabitTrackerAdminSite(name='myadmin')

admin_site.register(User, UserAdmin)
admin_site.register(Habit, HabitAdmin)
admin_site.register(HabitLog, HabitLogAdmin)
