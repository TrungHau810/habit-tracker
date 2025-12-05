import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { userLogin } from "../services/userServices";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const userData = await userLogin(username, password);
            setSuccess("Đăng nhập thành công!");
            setError(null);
        } catch (err) {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
            setSuccess(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Habit Tracker - Đăng nhập</title>
                <meta name="description" content="Đăng nhập vào tài khoản Habit Tracker của bạn để theo dõi và cải thiện thói quen hàng ngày." />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

                <div className="bg-white shadow-lg rounded-2xl w-full max-w-sm p-6">

                    <h1 className="text-2xl font-bold text-center mb-4">
                        Đăng nhập
                    </h1>

                    {/* Error message */}
                    {error && (
                        <p className="text-red-600 text-center text-sm mb-2">
                            {error}
                        </p>
                    )}

                    {/* Success message */}
                    {success && (
                        <p className="text-blue-600 text-center text-sm mb-2">
                            {success}
                        </p>
                    )}

                    <div className="flex flex-col space-y-3">

                        <input
                            type="email"
                            placeholder="Email"
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Link
                            to="/forgot-password"
                            className="text-sm text-right text-blue-600 hover:underline"
                        >
                            Quên mật khẩu?
                        </Link>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>

                        <p className="text-center text-sm mt-2">
                            Chưa có tài khoản?{" "}
                            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}