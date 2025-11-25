import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập - Habit Tracker",
    description: "Đăng nhập vào tài khoản Habit Tracker của bạn để theo dõi và phát triển thói quen tốt mỗi ngày.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}