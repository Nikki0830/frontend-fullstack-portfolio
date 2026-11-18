
interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
    return (
        <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5 lg:p-6">

            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">
                    {title}
                </p>

                <span className={`rounded-xl p-3 text-xl transition-transform duration-300 group-hover:scale-110 ${color}`}>
                    {icon}
                </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl">
                {value}
            </h3>

            <p className="mt-2 text-xs text-slate-400">
                Organization overview
            </p>
        </div>
    );
};

export default StatCard;
