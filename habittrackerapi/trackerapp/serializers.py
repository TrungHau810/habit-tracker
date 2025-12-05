from rest_framework import serializers

from trackerapp.models import User, Habit, HabitLog


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['groups', 'user_permissions']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'validators': []},  # Disable unique validator for username
            'email': {'validators': []},  # Disable unique validator for email
        }

    def create(self, validated_data):
        username = validated_data.get('username', '')
        if not username:
            raise serializers.ValidationError({"error": "Username không được để trống"})
        if not username[0].isalpha():
            raise serializers.ValidationError({"error": "Username phải bắt đầu bằng chữ cái"})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"error": "Username đã tồn tại"})
        if User.objects.filter(email=validated_data.get('email', '')).exists():
            raise serializers.ValidationError({"error": "Email đã tồn tại"})

        password = validated_data.pop('password', None)
        if not password:
            raise serializers.ValidationError({"error": "Password không được để trống"})

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        habit = Habit.objects.create(user=user, **validated_data)
        return habit


class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = '__all__'
