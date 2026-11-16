
import { useState } from "react";
import type { Employee } from "../../features/employees/employeeTypes";

interface EmployeeFormProps {
    onClose: () => void;
    onSubmit: (employee: {
        id?: number;
        name: string;
        email: string;
        role: string;
        department: string;
    }) => void;
    employee?: Employee | null;
}

const EmployeeForm = ({
    onClose,
    onSubmit,
    employee,
}: EmployeeFormProps) => {
    const [formData, setFormData] = useState({
        name: employee?.name ?? "",
        email: employee?.email ?? "",
        role: employee?.role ?? "",
        department: employee?.department ?? "",
    });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        onSubmit({
            ...formData,
            ...(employee ? { id: employee.id } : {}),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">

            {/* Modal */}
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-4 shadow-xl sm:p-6">

                {/* Modal Header */}
                <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
                    <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                        {employee ? "Edit Employee" : "Add New Employee"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="shrink-0 text-2xl text-slate-500 hover:text-slate-800"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { name: "name", label: "Full Name" },
                        { name: "email", label: "Email Address", type: "email" },
                        { name: "role", label: "Job Role" },
                        { name: "department", label: "Department" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                {field.label}
                            </label>

                            <input
                                type={field.type ?? "text"}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    ))}

                    {/* Form Actions */}
                    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-600 hover:bg-slate-50 sm:w-auto"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700 sm:w-auto"
                        >
                            {employee ? "Save Changes" : "Add Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
