export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
                &copy; {new Date().getFullYear()} Habit Tracker. All rights reserved.
            </div>
        </footer>
    );
}