import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Signup() {

    // Avatar mặc định từ backend
    const DEFAULT_AVATAR =
        "https://res.cloudinary.com/tthau2004/image/upload/v1763722568/avatar-trang-4_xjfk1u.jpg";

    const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
    const [avatarFile, setAvatarFile] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file)); // Hiển thị preview
            setAvatarFile(file); // Gửi file khi submit
        }
    };

    const handleSignup = async () => {
        // const formData = new FormData();

        // formData.append("full_name", fullName);
        // formData.append("email", email);
        // formData.append("password", password);

        // // Nếu người dùng CHỌN avatar → gửi lên
        // if (avatarFile) {
        //     formData.append("avatar", avatarFile);
        // }

        // // Nếu KHÔNG chọn → không append avatar → backend dùng avatar mặc định
        // console.log("FormData chuẩn bị gửi:", [...formData.entries()]);
    };

    return (
        <>
            <Helmet>
                <title>Habit Tracker - Đăng ký</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

                <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">

                    <h1 className="text-2xl font-bold text-center mb-4">
                        Đăng ký tài khoản
                    </h1>

                    <div className="flex flex-col space-y-4">

                        <div className="text-center">
                            <img
                                src={avatarPreview}
                                alt="avatar"
                                className="w-24 h-24 rounded-full mx-auto mb-2 object-cover bg-gray-200 border"
                            />

                            <label className="inline-block px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                                Chọn ảnh đại diện
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>

                        <input
                            type="text"
                            placeholder="Tên người dùng"
                            className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Submit */}
                        <button
                            onClick={handleSignup}
                            className="w-full py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
                        >
                            Đăng ký
                        </button>

                        {/* Login redirect */}
                        <p className="text-center text-sm">
                            Đã có tài khoản?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline font-medium">
                                Đăng nhập ngay
                            </Link>
                        </p>

                    </div>

                </div>
            </div>
        </>
    );
}