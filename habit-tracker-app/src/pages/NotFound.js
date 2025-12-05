import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>Habit Tracker - Trang không tồn tại</title>
            </Helmet>

            <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
                <div className="bg-white shadow-lg p-8 rounded-2xl max-w-md text-center">

                    {/* Icon */}
                    <FaceFrownIcon className="w-20 h-20 text-blue-600 mx-auto mb-4" />

                    <h1 className="text-6xl font-extrabold text-blue-600 mb-2">
                        404
                    </h1>

                    <h2 className="text-2xl font-semibold mb-2">Trang không tồn tại</h2>

                    <p className="text-gray-600 mb-6">
                        Có vẻ bạn đã truy cập sai đường dẫn.
                        Vui lòng quay về trang chủ để tiếp tục sử dụng ứng dụng.
                    </p>

                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </>
    );
}