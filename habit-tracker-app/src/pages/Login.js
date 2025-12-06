import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/userServices";
import { UserContext } from "../contexts/userContext";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Login() {

    const [, dispatch] = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        const loginPromise = userLogin(username, password);

        toast.promise(loginPromise, {
            loading: "Đang đăng nhập...",
            success: "Đăng nhập thành công!",
            error: "Đăng nhập thất bại!",
        });

        try {
            const dataUser = await loginPromise;

            dispatch({ type: "LOGIN", payload: dataUser });

            Swal.fire({
                icon: "success",
                title: "Thành công!",
                text: "Chào mừng bạn quay trở lại!",
                timer: 1500,
                showConfirmButton: false,
            });

            setTimeout(() => nav("/"), 1500);

        } catch (err) {

            Swal.fire({
                icon: "error",
                title: "Đăng nhập thất bại",
                text: "Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu!",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Habit Tracker - Đăng nhập</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">

                <div className="bg-white shadow-2xl rounded-2xl w-full max-w-sm p-8 relative border border-gray-100 animate-fade-in">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Chào mừng trở lại!
                    </h1>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="font-semibold text-gray-700">Tên đăng nhập</label>
                            <div className="relative mt-1">
                                <i className="fa-regular fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    placeholder="Nhập tên đăng nhập"
                                    className="border pl-10 pr-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-semibold text-gray-700">Mật khẩu</label>
                            <div className="relative mt-1">
                                <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="border pl-10 pr-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-right -mt-2">
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition active:scale-95 shadow-md disabled:opacity-60"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Chưa có tài khoản?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}