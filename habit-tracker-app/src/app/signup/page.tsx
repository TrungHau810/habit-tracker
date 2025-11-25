import { EnvelopeIcon, LockClosedIcon, PhotoIcon, UserIcon } from "@heroicons/react/16/solid";


export default function SignupPage() {
    return (
        <>
            <main className="min-h-screen from-blue-50 to-gray-50 flex items-center justify-center px-4 mt-15">
                <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 ">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Đăng ký
                    </h1>

                    <form className="space-y-4">
                        {/* Username */}
                        <div className="relative">
                            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                                Tên đăng nhập
                            </label>
                            <UserIcon className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                id="username"
                                placeholder="yourusername"
                                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <EnvelopeIcon className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                placeholder="youremail@example.com"
                                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                                Mật khẩu
                            </label>
                            <LockClosedIcon className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                placeholder="********"
                                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                                Xác nhận mật khẩu
                            </label>
                            <LockClosedIcon className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="********"
                                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-start space-x-2">
                            <input type="checkbox" id="terms" className="mt-1 h-4 w-4 text-blue-500" required />
                            <label htmlFor="terms" className="text-gray-700 text-sm">
                                Tôi đồng ý với{" "}
                                <a href="#" className="text-blue-500 hover:underline">Điều khoản dịch vụ</a> và{" "}
                                <a href="#" className="text-blue-500 hover:underline">Chính sách bảo mật</a>
                            </label>
                        </div>

                        {/* Avatar upload */}
                        <div className="relative">
                            <label htmlFor="avatar" className="block text-gray-700 font-medium mb-1">
                                Ảnh đại diện
                            </label>
                            <PhotoIcon className="absolute left-3 top-10 h-5 w-5 text-gray-400" />
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Đăng ký
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-4 text-center text-gray-600 text-sm">
                        Đã có tài khoản?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Đăng nhập
                        </a>
                    </p>
                </div>
            </main>
        </>
    );
}