
import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-3 top-3 z-[60] flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-xl text-white shadow-lg transition hover:bg-slate-700 md:hidden"
                aria-label="Toggle navigation menu"
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-40
                    w-64 min-h-screen bg-slate-900 p-5 pt-16 text-white md:pt-5
                    transform transition-transform duration-300
                    md:static md:translate-x-0 md:shrink-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <h1 className="mb-10 text-2xl font-bold">
                    EmployeeHub
                </h1>

                <nav className="space-y-3">
                    <a
                        href="#dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg bg-blue-600 p-3"
                    >
                        Dashboard
                    </a>

                    <a
                        href="#employees"
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg p-3 hover:bg-slate-800"
                    >
                        Employees
                    </a>

                    <a
                        href="#departments"
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg p-3 hover:bg-slate-800"
                    >
                        Departments
                    </a>

                    <a
                        href="#settings"
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg p-3 hover:bg-slate-800"
                    >
                        Settings
                    </a>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
