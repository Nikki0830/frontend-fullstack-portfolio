
import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white md:hidden"
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
                    w-64 min-h-screen bg-slate-900 p-5 text-white
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
