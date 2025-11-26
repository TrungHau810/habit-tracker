from datetime import timedelta

from django.http import Http404
from django.shortcuts import render
from django.utils import timezone, timezone, timezone, timezone, timezone
from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from trackerapp import serializers, perms
from trackerapp.models import User, Habit, HabitLog


def index(request):
    return render(request, 'index.html')


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]

    @action(methods=["get"], detail=False, url_path='me', url_name='me', permission_classes=[IsAuthenticated])
    def get_current_user(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class HabitViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView, generics.RetrieveAPIView,
                   generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Habit.objects.all()
    serializer_class = serializers.HabitSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create']:
            self.permission_classes = [IsAuthenticated]
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy', 'list']:
            self.permission_classes = [perms.IsOwnerHabit]
        return super().get_permissions()

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        # Lấy giá trị pk từ url
        obj_id = self.kwargs.get(lookup_url_kwarg)
        try:
            obj = queryset.get(pk=obj_id)
        except Habit.DoesNotExist:
            # Trả về response JSON thay vì default DRF 404
            raise Http404({"error": "Không tìm thấy thói quen giữ chuỗi của bạn trên hệ thống"})

        # Kiểm tra permissions object-level
        self.check_object_permissions(self.request, obj)
        return obj

    @action(methods=["get"], detail=True, url_path='detail', url_name='detail')
    def get_detail_habit(self, request, pk=None):
        habit = self.get_object()
        serializer = self.get_serializer(habit)

        # Get logs of the habit
        all_logs = HabitLog.objects.filter(habit=habit)
        log_serializer = serializers.HabitLogSerializer(all_logs, many=True)

        # Get current streak
        actived_logs = HabitLog.objects.filter(habit=habit, status=True).order_by('-date').values_list('date',
                                                                                                       flat=True)
        # Convert sang date và loại trùng lặp (nếu có nhiều log trong 1 ngày)
        today = timezone.localdate()
        dates = sorted({dt.astimezone(timezone.get_current_timezone()).date() for dt in actived_logs}, reverse=True)

        streak = 0
        expected_date = today

        for d in dates:
            if d == expected_date:
                streak += 1
                expected_date -= timedelta(days=1)
            else:
                break

        detail_data = serializer.data
        detail_data['logs'] = log_serializer.data
        detail_data['streak'] = streak
        return Response(detail_data)

    @action(methods=["get", "post"], detail=True, url_path='logs', url_name='logs')
    def get_logs(self, request, pk=None):
        habit = self.get_object()
        if request.method == "GET":
            logs = HabitLog.objects.filter(habit=habit)
            serializer = serializers.HabitLogSerializer(logs, many=True)
            return Response(serializer.data)

        elif request.method == "POST":
            data = request.data.copy()
            data['habit'] = habit.id
            serializer = serializers.HabitLogSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)


class HabitLogViewSet(viewsets.ViewSet):
    fields = '__all__'
    model = HabitLog
