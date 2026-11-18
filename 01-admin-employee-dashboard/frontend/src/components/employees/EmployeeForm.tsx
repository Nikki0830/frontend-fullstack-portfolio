
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

type FormData = {
    name: string;
    email: string;
    role: string;
    department: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EmployeeForm = ({
    onClose,
    onSubmit,
    employee,
}: EmployeeFormProps) => {
    const [formData, setFormData] = useState<FormData>({
        name: employee?.name ?? "",
        email: employee?.email ?? "",
        role: employee?.role ?? "",
        department: employee?.department ?? "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Validate all form fields
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        const name = formData.name.trim();
        const email = formData.email.trim();

        if (!name) {
            newErrors.name = "Full name is required";
        } else if (!/^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/.test(name) || name.length < 2 || name.length > 50) {
            newErrors.name = "Enter a valid name (2–50 characters)";
        }

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.role.trim()) {
            newErrors.role = "Job role is required";
        }

        if (!formData.department.trim()) {
            newErrors.department = "Department is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) return;

        onSubmit({
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim(),
            role: formData.role.trim(),
            department: formData.department.trim(),
            ...(employee ? { id: employee.id } : {}),
        });
    };

    const fields = [
        { name: "name", label: "Full Name", placeholder: "Enter full name" },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter email address" },
        { name: "role", label: "Job Role", placeholder: "Enter job role" },
        { name: "department", label: "Department", placeholder: "Enter department" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">

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
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {fields.map((field) => {
                        const fieldName = field.name as keyof FormData;

                        return (
                            <div key={field.name}>
                                <label
                                    htmlFor={field.name}
                                    className="mb-1 block text-sm font-medium text-slate-700"
                                >
                                    {field.label}
                                </label>

                                <input
                                    id={field.name}
                                    type={field.type ?? "text"}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[fieldName]}
                                    onChange={handleChange}
                                    aria-invalid={!!errors[fieldName]}
                                    aria-describedby={
                                        errors[fieldName]
                                            ? `${field.name}-error`
                                            : undefined
                                    }
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 ${errors[fieldName]
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                                        }`}
                                />

                                {errors[fieldName] && (
                                    <p
                                        id={`${field.name}-error`}
                                        className="mt-1 text-xs text-red-600"
                                        role="alert"
                                    >
                                        {errors[fieldName]}
                                    </p>
                                )}
                            </div>
                        );
                    })}

                    {/* Form Actions */}
                    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-600 transition hover:bg-slate-50 sm:w-auto"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-white transition hover:bg-blue-700 sm:w-auto"
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
