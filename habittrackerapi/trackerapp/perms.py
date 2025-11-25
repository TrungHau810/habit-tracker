from rest_framework import permissions


class IsOwnerHabit(permissions.IsAuthenticated):
    """
    Kiểm tra người dùng có phải là chủ sở hữu của thói quen hay không.
    """

    def has_object_permission(self, request, view, habit):
        return super().has_permission(request, view) and habit.user == request.user
