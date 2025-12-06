import { useContext, useEffect, useState } from "react";
import { getUserHabits } from "../../services/habitServices";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

// Icons
import {
    PlusIcon,
    InboxIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowRightIcon,
    FireIcon
} from "@heroicons/react/24/outline";
import { formatDate, formatDateTime } from "../../utils/date";

export default function Dashboard() {
    const [user] = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        getUserHabits()
            .then(data => setHabits(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const calculateProgress = (start, end) => {
        const s = new Date(start);
        const e = new Date(end);
        const now = new Date();

        if (now <= s) return 0;
        if (now >= e) return 100;

        const total = e - s;
        const elapsed = now - s;

        return Math.floor((elapsed / total) * 100);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Bạn chưa đăng nhập</h2>
                <p className="text-gray-500 mt-1">Vui lòng đăng nhập để xem Dashboard.</p>

                <button
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
                    onClick={() => nav("/login")}
                >
                    <ArrowRightIcon className="w-5 h-5" />
                    Đăng nhập
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển</h1>
                    <p className="text-gray-500 mt-1">
                        Xin chào, <span className="font-medium">{user.full_name}</span>
                    </p>
                    <p className="text-gray-400 italic mt-2"><FireIcon className="w-5 h-5 inline-block ml-1 text-red-600" />"Thói quen nhỏ hôm nay, thành công lớn ngày mai."</p>
                </div>

                <button
                    className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
                    onClick={() => nav("/dashboard/habit/create")}
                >
                    <PlusIcon className="w-5 h-5" />
                    Tạo thói quen
                </button>
            </div>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white p-5 rounded-xl shadow animate-pulse space-y-4">
                            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-full"></div>
                            <div className="h-8 bg-gray-300 rounded w-full"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && habits.length === 0 && (
                <div className="text-center mt-20 flex flex-col items-center">
                    <InboxIcon className="w-16 h-16 text-gray-400 mb-4" />

                    <h3 className="text-xl font-semibold text-gray-700">Chưa có thói quen nào</h3>
                    <p className="text-gray-500 mt-1">
                        Bắt đầu bằng việc tạo thói quen đầu tiên!
                    </p>

                    <button
                        className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2"
                        onClick={() => nav("/dashboard/create")}
                    >
                        <PlusIcon className="w-5 h-5" />
                        Tạo mới
                    </button>
                </div>
            )}

            {/* Habit List */}
            {!loading && habits.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {habits.map(habit => {
                        const progress = calculateProgress(habit.start_date, habit.due_date);

                        return (
                            <div
                                key={habit.id}
                                className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-semibold text-gray-800">{habit.title}</h2>

                                    {habit.is_active ? (
                                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700 flex items-center gap-1">
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Đang theo dõi
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-red-100 text-red-700 flex items-center gap-1">
                                            <XCircleIcon className="w-4 h-4" />
                                            Tạm ngưng
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-600 mt-2 mb-4">{habit.description}</p>
                                <p className="text-sm text-gray-500 mb-4">Thời gian tạo: {formatDateTime(habit.created_at)}</p>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full transition-all duration-500 
                                                ${progress < 50 ? "bg-red-400" : progress < 80 ? "bg-yellow-400" : "bg-green-500"}`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">Tiến độ: {progress}%</p>
                                </div>

                                {/* Dates */}
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p><strong>Bắt đầu:</strong> {formatDate(habit.start_date)}</p>
                                    <p><strong>Đến hạn:</strong> {formatDate(habit.due_date)}</p>
                                </div>

                                <button
                                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg 
                                    hover:bg-blue-700 transition shadow flex items-center justify-center gap-2"
                                    onClick={() => nav(`/dashboard/habit/${habit.id}`)}
                                >
                                    Xem chi tiết
                                    <ArrowRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}