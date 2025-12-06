import { ClockIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { MailIcon } from "lucide-react";


export default function Contact() {
    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
            <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Liên hệ với chúng tôi</h1>
            <p className="text-lg text-center max-w-xl mb-8 text-gray-600">
                Nếu bạn có bất kỳ câu hỏi, góp ý hay cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại dưới đây. Chúng tôi rất mong được nghe từ bạn!
            </p>

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">

                {/* Thông tin liên hệ */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thông tin liên hệ</h2>
                    <p className="flex items-center gap-2 text-gray-700">
                        <MailIcon className="w-5 h-5 text-blue-600" />
                        <strong>Email:</strong> tthau2004@gmail.com
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <PhoneIcon className="w-5 h-5 text-green-600" />
                        <strong>Điện thoại:</strong> <span className="italic">Đang cập nhật</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <MapPinIcon className="w-5 h-5 text-red-500" />
                        <strong>Địa chỉ:</strong> Thành phố Thủ Đức, TP.HCM
                    </p>
                </div>

                {/* Giờ làm việc */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Giờ làm việc</h2>
                    <p className="flex items-center gap-2 text-gray-700">
                        <ClockIcon className="w-5 h-5 text-yellow-500" />
                        Thứ Hai - Thứ Sáu: 8:00 AM - 6:00 PM
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <ClockIcon className="w-5 h-5 text-gray-400" />
                        Thứ Bảy - Chủ Nhật: Đóng cửa
                    </p>
                </div>
            </div>
        </div>
    );
}