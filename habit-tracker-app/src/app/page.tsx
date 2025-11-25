import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <section className="bg-blue-600 text-white min-h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Chào mừng đến với Habit Tracker
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Theo dõi và phát triển thói quen tốt mỗi ngày với ứng dụng của chúng tôi.
          </p>
          <Link
            href="/about"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Tìm hiểu thêm
          </Link>
        </section>
      </main>
    </>
  );
}