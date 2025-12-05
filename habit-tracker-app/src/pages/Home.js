import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// HEROICON IMPORT
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Habit Tracker - Trang chủ</title>
            </Helmet>

            <div className="bg-gray-100 min-h-screen pt-20">

                {/* HERO */}
                <div className="max-w-3xl mx-auto text-center mb-20 px-4">
                    <h1 className="text-4xl font-bold mb-4">
                        Chào mừng đến với Habit Tracker
                    </h1>

                    <p className="text-lg text-gray-600 mb-8">
                        Xây dựng thói quen tốt mỗi ngày. Theo dõi – phân tích – cải thiện bản thân.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            to="/signup"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                        >
                            Bắt đầu ngay
                        </Link>

                        <Link
                            to="/login"
                            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                </div>

                {/* FEATURES */}
                <div className="max-w-6xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<CheckCircleIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />}
                        title="Theo dõi thói quen"
                        desc="Ghi lại các thói quen mỗi ngày, giúp bạn duy trì sự ổn định."
                    />

                    <FeatureCard
                        icon={<ChartBarIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />}
                        title="Thống kê chi tiết"
                        desc="Biểu đồ và số liệu giúp bạn hiểu rõ tiến trình của mình."
                    />

                    <FeatureCard
                        icon={<SparklesIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />}
                        title="Phát triển bản thân"
                        desc="Thay đổi cuộc sống từng bước, bắt đầu từ thói quen nhỏ."
                    />
                </div>
            </div>
        </>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow text-center">
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600 mt-1">{desc}</p>
        </div>
    );
}