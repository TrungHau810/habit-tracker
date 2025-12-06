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

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.avatar:
            data['avatar'] = instance.avatar.url
        return data

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
        user.is_active=True
        user.save()
        return user


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = '__all__'
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context.get('request').user
        validated_data['user'] = user
        habit = Habit.objects.create(**validated_data)
        return habit


class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.photo:
            data['photo'] = instance.photo.url
        return data
