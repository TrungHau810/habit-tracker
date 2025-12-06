import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
    PhotoIcon,
    DocumentTextIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    CalendarDaysIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import { createHabitLog } from "../../services/habitServices";

export default function NewLog() {
    const location = useLocation();
    const nav = useNavigate();

    const habit = location.state?.habit || null;

    const [note, setNote] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!habit) {
            Swal.fire({
                icon: "error",
                title: "Không tìm thấy thói quen!",
                text: "Bạn cần chọn thói quen trước khi tạo nhật ký.",
                confirmButtonText: "Đồng ý",
                confirmButtonColor: "#dc2626",
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((res) => {
                if (res.isConfirmed) nav(-1);
            });
        }
    }, [habit, nav]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!note || note.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Nội dung trống!",
                text: "Vui lòng nhập nội dung nhật ký.",
            });
            return;
        }

        const confirm = await Swal.fire({
            title: "Xác nhận lưu?",
            text: "Bạn chắc chắn muốn lưu nhật ký này?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Lưu",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#2563eb",
        });

        if (!confirm.isConfirmed) return;

        const formData = new FormData();
        formData.append("notes", note);
        if (image) formData.append("photo", image);

        const request = createHabitLog(habit.id, formData);

        toast.promise(request, {
            loading: "Đang lưu nhật ký...",
            success: "Lưu thành công!",
            error: "Không thể lưu nhật ký!",
        });

        try {
            await request;

            Swal.fire({
                icon: "success",
                title: "Đã lưu!",
                text: "Bạn sẽ được chuyển về trang chi tiết.",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
            }).then((res) => {
                if (res.isConfirmed) nav(-1);
            });

        } catch (err) {
            console.error("Log save error: ", err);
            Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: `${err.response?.data?.error || "Không thể lưu nhật ký. Vui lòng thử lại."}`,
            });
        } finally {
            setLoading(false);
        }
    };

    if (!habit) return null;

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
            <button
                onClick={() => nav(-1)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg 
                           bg-gray-100 text-gray-700 hover:bg-gray-200 
                           transition shadow w-fit"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Quay lại
            </button>

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <PencilSquareIcon className="w-8 h-8 text-blue-600" />
                    Tạo nhật ký mới
                </h1>
            </div>

            {/* Habit Info */}
            <div className="bg-blue-50 rounded-xl p-5 shadow flex gap-4 border border-blue-200">
                <DocumentTextIcon className="w-10 h-10 text-blue-600" />

                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-gray-800">{habit.title}</h2>
                    <p className="text-gray-700">{habit.description}</p>

                    <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600">
                        <p className="flex items-center gap-1">
                            <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
                            Bắt đầu: {habit.start_date}
                        </p>
                        <p className="flex items-center gap-1">
                            <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
                            Kết thúc: {habit.due_date || "Chưa đặt"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-8 border border-gray-100">

                {/* Editor */}
                <div>
                    <label className="mb-3 font-semibold text-gray-800 text-lg flex items-center gap-2">
                        <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                        Nội dung nhật ký
                    </label>

                    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                        <CKEditor
                            editor={ClassicEditor}
                            data={note}
                            onChange={(event, editor) => setNote(editor.getData())}
                        />
                    </div>
                </div>

                {/* Upload Image */}
                <div>
                    <label className="mb-3 font-semibold text-gray-800 text-lg flex items-center gap-2">
                        <PhotoIcon className="w-6 h-6 text-blue-600" />
                        Ảnh minh họa (tùy chọn)
                    </label>

                    <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                    >
                        <PhotoIcon className="w-12 h-12 text-gray-500 mb-2" />
                        <p className="text-gray-600">Nhấn để chọn ảnh hoặc kéo thả vào đây</p>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>

                    {preview && (
                        <div className="mt-4">
                            <p className="text-gray-600 mb-2">Ảnh xem trước:</p>
                            <img
                                src={preview}
                                alt="preview"
                                className="w-full max-w-md rounded-lg shadow-lg border"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 active:scale-95 transition flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                    {loading ? "Đang lưu..." : "Lưu nhật ký"}
                </button>
            </div>
        </div>
    );
}