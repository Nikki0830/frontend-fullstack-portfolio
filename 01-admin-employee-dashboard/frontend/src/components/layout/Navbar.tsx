
const Navbar = () => {
    return (
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">

            {/* Page Information */}
            <div className="min-w-0">
                <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
                    Dashboard
                </h2>

                <p className="truncate text-xs text-slate-500 sm:text-sm">
                    Welcome back! Here's your overview.
                </p>
            </div>

            {/* User Actions */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">

                {/* Notification */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="rounded-lg p-2 text-lg hover:bg-slate-100"
                >
                    🔔
                </button>

                {/* Profile */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 sm:h-10 sm:w-10">
                        NP
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800">
                            Nikita Patel
                        </p>

                        <p className="text-xs text-slate-500">
                            Admin
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
