import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    CalendarDaysIcon,
    DocumentTextIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { createNewHabit } from "../../services/habitServices";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { formatDate } from "../../utils/date";

export default function NewHabit() {

    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        start_date: "",
        due_date: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const promise = createNewHabit(form);

        toast.promise(promise, {
            loading: "Đang tạo thói quen...",
            success: "Tạo thói quen thành công!",
            error: "Không thể tạo thói quen!",
        });

        try {
            await promise;

            Swal.fire({
                icon: "success",
                title: "Hoàn tất!",
                text: "Thói quen mới đã được tạo.",
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => nav("/dashboard"), 1500);

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: "Không thể tạo thói quen. Vui lòng thử lại.",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

            {/* Header */}
            <div className="w-full max-w-3xl flex items-center mb-6 gap-3">
                <button
                    onClick={() => nav(-1)}
                    className="p-2 bg-white shadow rounded-full border hover:bg-gray-50 transition"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                </button>

                <h1 className="text-3xl font-bold text-gray-900">
                    Tạo Thói Quen Mới
                </h1>
            </div>

            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-lg p-8 space-y-8"
            >

                {/* Title */}
                <div>
                    <label className="text-gray-800 font-semibold flex items-center gap-2 mb-2 text-lg">
                        <PencilSquareIcon className="w-6 h-6 text-blue-600" />
                        Tên thói quen
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Ví dụ: Dậy lúc 5 giờ, đọc sách 30 phút..."
                        className="w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="text-gray-800 font-semibold flex items-center gap-2 mb-2 text-lg">
                        <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                        Mô tả
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Giải thích chi tiết về thói quen, mục tiêu, lợi ích..."
                        className="w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-50 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Start date */}
                    <div>
                        <label className="text-gray-800 font-semibold flex items-center gap-2 mb-2 text-lg">
                            <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
                            Ngày bắt đầu
                        </label>

                        <input
                            type="date"
                            name="start_date"
                            value={formatDate(form.start_date)}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* Due date */}
                    <div>
                        <label className="text-gray-800 font-semibold flex items-center gap-2 mb-2 text-lg">
                            <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
                            Ngày kết thúc
                        </label>

                        <input
                            type="date"
                            name="due_date"
                            value={formatDate(form.due_date)}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-blue-700 active:scale-95 transition flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                    {loading ? "Đang tạo..." : "Tạo thói quen"}
                </button>
            </form>
        </div>
    );
}