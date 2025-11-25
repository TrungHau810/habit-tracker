"use client";

import { Bars3BottomLeftIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

export default function Header() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        Habit Tracker
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
                        <Link href="/" className="hover:text-blue-600 transition-colors">
                            Trang chủ
                        </Link>
                        <Link href="/about" className="hover:text-blue-600 transition-colors">
                            Giới thiệu
                        </Link>
                        <Link href="/contact" className="hover:text-blue-600 transition-colors">
                            Liên hệ
                        </Link>
                        <Link href="/login" className="hover:text-blue-600 transition-colors ml-auto">
                            Đăng nhập
                        </Link>
                        <Link href="/signup" className="hover:text-blue-600 transition-colors">
                            Đăng ký
                        </Link>
                    </nav>

                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {open && (
                    <nav className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2 text-gray-700 font-medium">
                        <Link href="/" onClick={() => setOpen(false)} className="block hover:text-blue-600 transition-colors">
                            Trang chủ
                        </Link>
                        <Link href="/about" onClick={() => setOpen(false)} className="block hover:text-blue-600 transition-colors">
                            Giới thiệu
                        </Link>
                        <Link href="/contact" onClick={() => setOpen(false)} className="block hover:text-blue-600 transition-colors">
                            Liên hệ
                        </Link>
                        <Link href="/login" onClick={() => setOpen(false)} className="block hover:text-blue-600 transition-colors">
                            Đăng nhập
                        </Link>
                        <Link href="/signup" onClick={() => setOpen(false)} className="block hover:text-blue-600 transition-colors">
                            Đăng ký
                        </Link>
                    </nav>
                )}
            </header>
        </>
    );
}