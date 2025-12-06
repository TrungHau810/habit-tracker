import { Link } from "react-router-dom";

import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-xl font-bold">Habit Tracker</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        Habit Tracker là ứng dụng giúp bạn xây dựng và duy trì những thói quen tốt hàng ngày.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">
                        Theo dõi tiến trình, phân tích thói quen và cải thiện bản thân mỗi ngày cùng chúng tôi!
                    </p>
                </div>

                {/* Cột 2 - Liên kết */}
                <div>
                    <h2 className="text-xl font-bold">Liên kết</h2>

                    <div className="mt-3 space-y-2">
                        <Link className="block hover:underline" to="/">Trang chủ</Link>
                        <Link className="block hover:underline" to="/products">Sản phẩm</Link>
                        <Link className="block hover:underline" to="/about">Giới thiệu</Link>
                        <Link className="block hover:underline" to="/contact">Liên hệ</Link>
                    </div>
                </div>

                {/* Cột 3 - Thông tin liên hệ */}
                <div>
                    <h2 className="text-xl font-bold">Thông tin liên hệ</h2>

                    <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                            <MapPinIcon className="w-5 h-5 mr-2" />
                            <p>Thành phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                        </div>

                        <div className="flex items-center">
                            <EnvelopeIcon className="w-5 h-5 mr-2" />
                            <p>Email: tthau2004@gmail.com</p>
                        </div>

                        <div className="flex items-center">
                            <PhoneIcon className="w-5 h-5 mr-2" />
                            <p>Hotline: <span className="italic">Đang cập nhật</span></p>
                        </div>
                    </div>

                    {/* Icon mạng xã hội */}
                    <div className="flex items-center gap-3 mt-4 text-xl">
                        <a href="#" className="hover:text-gray-200"><FaFacebook /></a>
                        <a href="#" className="hover:text-gray-200"><FaInstagram /></a>
                        <a
                            href="https://github.com/TrungHau810"
                            className="hover:text-gray-200"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <p className="text-center mt-8 text-sm opacity-80">
                © {new Date().getFullYear()} Habit Tracker. All rights reserved.
            </p>
        </footer>
    );
}
