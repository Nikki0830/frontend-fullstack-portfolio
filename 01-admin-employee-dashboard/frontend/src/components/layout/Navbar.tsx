
const Navbar = () => {
    return (
        <header className="flex min-h-[64px] items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-3 pl-16 sm:px-6 sm:py-4 md:pl-6 lg:px-8">

            {/* Page Information */}
            <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-800 sm:text-xl">
                    Dashboard
                </h2>

                <p className="truncate text-[11px] text-slate-500 sm:text-sm">
                    Welcome back! Here's your overview.
                </p>
            </div>

            {/* User Actions */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-4">

                <button
                    type="button"
                    aria-label="Notifications"
                    className="rounded-lg p-2 text-base transition hover:bg-slate-100 sm:text-lg"
                >
                    🔔
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 sm:h-10 sm:w-10 sm:text-sm">
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
