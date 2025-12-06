import { Link } from "react-router-dom";

export default function ForgotPassword() {
    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">

            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 text-center border border-gray-100 animate-fade-in">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Quên mật khẩu</h1>
                <p className="text-gray-600 mb-6">
                    Tính năng quên mật khẩu hiện đang được phát triển.
                    Nếu bạn cần đặt lại mật khẩu ngay, vui lòng liên hệ với chúng tôi qua email:
                </p>

                <p className="text-blue-600 font-medium mb-6">tthau2004@gmail.com</p>

                <p className="text-gray-500 mb-6">
                    Chúng tôi sẽ hỗ trợ bạn khôi phục mật khẩu sớm nhất có thể.
                </p>

                <Link
                    to="/login"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    Quay về trang đăng nhập
                </Link>
            </div>
        </div>
    );
}
