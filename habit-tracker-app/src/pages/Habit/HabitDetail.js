import { useNavigate, useParams } from "react-router-dom";
import { deleteHabit, viewHabitDetails } from "../../services/habitServices";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import {
    ArrowLeftIcon,
    TrashIcon,
    PlusCircleIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    PhotoIcon,
    DocumentTextIcon,
    FireIcon,
} from "@heroicons/react/24/outline";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { formatDate, formatDateTime } from "../../utils/date";

export default function HabitDetail() {
    const { id } = useParams();
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    // Fetch habit detail
    useEffect(() => {
        const fetchHabitDetails = async () => {
            setLoading(true);
            try {
                const data = await viewHabitDetails(id);
                setHabit(data);
            } finally {
                setLoading(false);
            }
        };

        fetchHabitDetails();
    }, [id]);

    // Delete habit
    const handleDeleteHabit = () => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Thói quen sẽ bị xoá vĩnh viễn!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xoá",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#e11d48",
        }).then(async (res) => {
            if (!res.isConfirmed) return;

            const deleting = deleteHabit(id);
            toast.promise(deleting, {
                loading: "Đang xoá thói quen...",
                success: "Đã xoá thói quen!",
                error: "Không thể xoá thói quen!",
            });

            try {
                await deleting;
                nav(-1);
            } catch { }
        });
    };

    if (loading) return <LoadingSpinner content="Đang tải chi tiết thói quen..." />;
    if (!habit) return <p>Không tìm thấy thói quen.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => nav(-1)}
                    className="p-2 bg-white border rounded-full shadow hover:bg-gray-50 transition"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                    Chi tiết thói quen
                </h1>
            </div>

            {/* Habit Card */}
            <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-5 space-y-3">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <CheckCircleIcon className="w-7 h-7 text-blue-600" />
                    {habit.title}
                </h2>

                <p className="text-gray-600 text-lg">{habit.description}</p>
                <p className="text-sm text-gray-500 mb-4">Thời gian tạo: {formatDateTime(habit.created_at)}</p>

                <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600">
                    <p className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                        Bắt đầu: <span className="font-semibold">{formatDate(habit.start_date)}</span>
                    </p>

                    <p className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                        Kết thúc:{" "}
                        <span className="font-semibold">
                            {habit.due_date ? formatDate(habit.due_date) : "Chưa đặt"}
                        </span>
                    </p>
                    {/* Streak */}
                    <div className="mt-2 flex items-center gap-2 text-orange-600 font-semibold text-lg">
                        <FireIcon className="w-6 h-6" />
                        Chuỗi duy trì:
                        <span className="text-gray-800">{habit.streak} ngày</span>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        onClick={handleDeleteHabit}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                    >
                        <TrashIcon className="w-5 h-5 text-white" />
                        Xoá thói quen
                    </button>

                    <button
                        onClick={() =>
                            nav("/dashboard/habit/log/create", { state: { habit } })
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                    >
                        <PlusCircleIcon className="w-5 h-5 text-white" />
                        Thêm nhật ký mới
                    </button>
                </div>
            </div>

            {/* Logs Section */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                    Nhật ký theo ngày
                </h3>

                {habit.logs.length === 0 && (
                    <p className="text-gray-500 italic">Chưa có nhật ký nào.</p>
                )}

                {habit.logs.map((log) => (
                    <div
                        key={log.id}
                        className="bg-white border border-gray-200 shadow-md rounded-xl p-5 space-y-3"
                    >
                        {/* Date */}
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                            {new Date(log.date).toLocaleDateString("vi-VN")}
                        </p>

                        {/* Notes */}
                        <div
                            className="prose max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: log.notes }}
                        />

                        {/* Photo */}
                        {log.photo && (
                            <div className="pt-3">
                                <img
                                    src={log.photo}
                                    alt="Ảnh nhật ký"
                                    className="rounded-lg shadow border max-w-sm"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}