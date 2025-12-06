
export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-16 px-4 flex flex-col items-center">

            {/* Header */}
            <div className="max-w-3xl text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Giới thiệu về Habit Tracker</h1>
                <p className="text-lg text-gray-600">
                    Habit Tracker là ứng dụng giúp bạn xây dựng và theo dõi thói quen mỗi ngày. Chúng tôi tin rằng những thay đổi nhỏ sẽ dẫn đến kết quả lớn.
                </p>
            </div>

            {/* Features Section */}
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition transform">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Theo dõi thói quen</h2>
                    <p className="text-gray-600">
                        Ghi lại các thói quen hằng ngày và kiểm tra tiến độ của bạn theo thời gian.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition transform">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Nhật ký minh họa</h2>
                    <p className="text-gray-600">
                        Thêm ghi chú và hình ảnh để bạn nhớ rõ quá trình và cải thiện thói quen.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition transform">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Báo cáo tiến độ</h2>
                    <p className="text-gray-600">
                        Xem tiến độ thói quen của bạn qua biểu đồ và thống kê trực quan.
                    </p>
                </div>

            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Bắt đầu hành trình của bạn ngay hôm nay!</h2>
                <p className="text-gray-600 mb-6">
                    Hãy tạo tài khoản và xây dựng thói quen tích cực để thay đổi cuộc sống từng ngày.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                    Tạo tài khoản
                </button>
            </div>

        </div>
    );
}
