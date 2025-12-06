import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../services/userServices";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function Signup() {
    const DEFAULT_AVATAR =
        "https://res.cloudinary.com/tthau2004/image/upload/v1763722568/avatar-trang-4_xjfk1u.jpg";

    const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
    const [avatarFile, setAvatarFile] = useState(null);
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const validateInput = (info) => {
        if (/\s/.test(info.username)) {
            Swal.fire("Lỗi!", "Tên đăng nhập không được chứa khoảng trắng!", "error");
            return false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(info.username)) {
            Swal.fire("Lỗi!", "Tên đăng nhập không được chứa ký tự đặc biệt và tiếng Việt có dấu!", "error");
            return false;
        }
        if (info.password !== info.confirmPassword) {
            Swal.fire("Lỗi!", "Mật khẩu và xác nhận mật khẩu không khớp!", "error");
            return false;
        }
        if (/\s/.test(info.password)) {
            Swal.fire("Lỗi!", "Mật khẩu không được chứa khoảng trắng!", "error");
            return false;
        }
        if (info.password.length < 6) {
            Swal.fire("Lỗi!", "Mật khẩu phải có ít nhất 6 ký tự!", "error");
            return false;
        }
        return true;
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            setAvatarFile(file);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateInput(info)) return;

        setLoading(true);
        try {
            const formData = new FormData();
            if (avatarFile) formData.append("avatar", avatarFile);
            for (let key in info) {
                if (key !== "confirmPassword") {
                    formData.append(key, info[key]);
                }
            }

            await userSignup(formData);

            Swal.fire({
                icon: "success",
                title: "Đăng ký thành công!",
                text: "Bạn sẽ được chuyển đến trang đăng nhập.",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true
            });

            setTimeout(() => nav("/login"), 1500);

        } catch (err) {
            console.error("Signup error:", err);

            // Lấy thông báo lỗi từ backend nếu có
            let msg = "Đăng ký thất bại. Vui lòng thử lại sau.";
            if (err.response?.data?.error) {
                msg = err.response.data.error;
            } else {
                msg = "Nếu sự cố tiếp tục, vui lòng liên hệ qua email: tthau2004@gmail.com để được hỗ trợ.";
            }

            // Thêm hướng dẫn liên hệ email
            

            Swal.fire({
                icon: "error",
                title: "Đăng ký thất bại!",
                text: msg,
                confirmButtonText: "Đồng ý",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Habit Tracker - Đăng ký</title>
            </Helmet>
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-8 relative border border-gray-100 animate-fade-in">
                    <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
                        Tạo tài khoản mới
                    </h1>

                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <img
                                src={avatarPreview}
                                alt="avatar"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                            />
                            <label className="absolute bottom-0 right-0 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-700 transition">
                                <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                                <i className="fa-solid fa-camera text-sm"></i>
                            </label>
                        </div>
                        <p className="text-sm mt-2 text-gray-500">Chọn ảnh đại diện</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full name */}
                        <div className="md:col-span-2 flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Họ tên</label>
                            <input
                                type="text"
                                placeholder="Nhập họ tên"
                                className="border pl-3 py-2 rounded-lg w-full"
                                required
                                value={info.full_name || ""}
                                onChange={(e) => setInfo({ ...info, full_name: e.target.value })}
                            />
                        </div>

                        {/* Email */}
                        <div className="md:col-span-1 flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Nhập email"
                                className="border pl-3 py-2 rounded-lg w-full"
                                required
                                value={info.email || ""}
                                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                            />
                        </div>

                        {/* Username */}
                        <div className="md:col-span-1 flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Tên đăng nhập</label>
                            <input
                                type="text"
                                placeholder="Nhập tên đăng nhập"
                                required
                                className="border pl-3 py-2 rounded-lg w-full"
                                value={info.username || ""}
                                onChange={(e) => setInfo({ ...info, username: e.target.value })}
                            />
                        </div>

                        {/* Password */}
                        <div className="md:col-span-1 flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="border pl-3 py-2 rounded-lg w-full"
                                required
                                value={info.password || ""}
                                onChange={(e) => setInfo({ ...info, password: e.target.value })}
                            />
                        </div>

                        {/* Confirm password */}
                        <div className="md:col-span-1 flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                className="border pl-3 py-2 rounded-lg w-full"
                                required
                                value={info.confirmPassword || ""}
                                onChange={(e) => setInfo({ ...info, confirmPassword: e.target.value })}
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="md:col-span-2 w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}