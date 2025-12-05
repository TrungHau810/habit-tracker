import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

// Heroicons
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const [open, setOpen] = useState(false);
    const { user, dispatch } = useContext(UserContext);
    const nav = useNavigate();

    const navItems = [
        { name: "Trang chủ", to: "/" },
        { name: "Giới thiệu", to: "/about" },
        { name: "Tính năng", to: "/features" },
        { name: "Liên hệ", to: "/contact" }
    ];

    return (
        <>
            {/* NAVBAR */}
            <header className="bg-blue-600 text-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                    {/* Logo */}
                    <h1
                        className="text-xl font-bold cursor-pointer"
                        onClick={() => nav("/")}
                    >
                        Habit Tracker
                    </h1>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-6 items-center">

                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.to}
                                className="hover:text-gray-200 transition"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {user ? (
                            <>
                                <span className="mr-2">
                                    Xin chào, {user.full_name}
                                </span>

                                <button
                                    onClick={() => dispatch({ type: "logout" })}
                                    className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition"
                                >
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => nav("/login")}
                                    className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition"
                                >
                                    Đăng nhập
                                </button>

                                <button
                                    onClick={() => nav("/signup")}
                                    className="ml-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Đăng ký
                                </button>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <Bars3Icon className="w-7 h-7" />
                    </button>
                </div>
            </header>

            {/* MOBILE DRAWER */}
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setOpen(false)}></div>
            )}

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-800 shadow-lg z-50 transform transition-transform duration-300 
                ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={() => setOpen(false)}>
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-3">

                    {user && (
                        <p className="font-medium mb-2">
                            Xin chào, {user.full_name}
                        </p>
                    )}

                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => {
                                nav(item.to);
                                setOpen(false);
                            }}
                            className="block w-full text-left px-2 py-2 rounded hover:bg-gray-100"
                        >
                            {item.name}
                        </button>
                    ))}

                    <hr className="my-3" />

                    {user ? (
                        <button
                            onClick={() => {
                                dispatch({ type: "logout" });
                                setOpen(false);
                            }}
                            className="w-full text-left px-2 py-2 text-red-600 rounded hover:bg-red-50"
                        >
                            Đăng xuất
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    nav("/login");
                                    setOpen(false);
                                }}
                                className="block w-full text-left px-2 py-2 rounded hover:bg-gray-100"
                            >
                                Đăng nhập
                            </button>

                            <button
                                onClick={() => {
                                    nav("/signup");
                                    setOpen(false);
                                }}
                                className="block w-full text-left px-2 py-2 rounded hover:bg-gray-100"
                            >
                                Đăng ký
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
}