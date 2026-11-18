
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { deleteEmployeeAPI } from "../../features/employees/employeeThunks";
import type { Employee } from "../../features/employees/employeeTypes";

interface EmployeeTableProps {
    onAddEmployee: () => void;
    onEditEmployee: (employee: Employee) => void;
}

const EmployeeTable = ({
    onAddEmployee,
    onEditEmployee,
}: EmployeeTableProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");

    const employees = useSelector(
        (state: RootState) => state.employees.employees
    );

    const loading = useSelector(
        (state: RootState) => state.employees.loading
    );

    const error = useSelector(
        (state: RootState) => state.employees.error
    );

    const departments = [
        "All",
        ...new Set(employees.map((employee) => employee.department)),
    ];

    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch = `${employee.name} ${employee.email} ${employee.role}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesDepartment =
            selectedDepartment === "All" ||
            employee.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

    const handleDelete = (id: number) => {
        if (
            window.confirm(
                "Are you sure you want to delete this employee?"
            )
        ) {
            dispatch(deleteEmployeeAPI(id));
        }
    };

    return (
        <div className="mt-6 sm:mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        Recent Employees
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your employee records
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:flex lg:items-center">
                    <input
                        type="text"
                        placeholder="Search by name, email or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-64"
                    />

                    <select
                        value={selectedDepartment}
                        onChange={(e) =>
                            setSelectedDepartment(e.target.value)
                        }
                        className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={onAddEmployee}
                        className="w-full whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] sm:col-span-2 lg:col-span-1 lg:w-auto"
                    >
                        + Add Employee
                    </button>
                </div>
            </div>

            {/* Loading, Error and Empty States */}
            {loading ? (
                <div className="px-4 py-12 text-center text-slate-500">
                    Loading employees...
                </div>
            ) : error ? (
                <div className="px-4 py-12 text-center text-red-500">
                    {error}
                </div>
            ) : filteredEmployees.length === 0 ? (
                <div className="px-4 py-12 text-center text-slate-500">
                    {searchTerm || selectedDepartment !== "All"
                        ? "No matching employees found."
                        : "No employees found. Click Add Employee to get started."}
                </div>
            ) : (
                <>
                    {/* Mobile Employee Cards */}
                    <div className="space-y-3 p-4 md:hidden">
                        {filteredEmployees.map((employee) => (
                            <div
                                key={employee.id}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/40"
                            >
                                <div className="flex min-w-0 items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h3 className="break-words font-semibold text-slate-800">
                                            {employee.name}
                                        </h3>
                                        <p className="mt-1 break-all text-xs text-slate-500">
                                            {employee.email}
                                        </p>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                        {employee.department}
                                    </span>
                                </div>

                                <div className="mt-3 border-t border-slate-200 pt-3">
                                    <p className="text-sm text-slate-600">
                                        <span className="font-medium text-slate-700">
                                            Role:
                                        </span>{" "}
                                        {employee.role}
                                    </p>
                                </div>

                                <div className="mt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onEditEmployee(employee)
                                        }
                                        className="flex-1 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(employee.id)
                                        }
                                        className="flex-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Employee Table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full min-w-[650px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredEmployees.map((employee) => (
                                    <tr
                                        key={employee.id}
                                        className="transition-colors duration-200 hover:bg-blue-50/50"
                                    >
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-800">
                                                {employee.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {employee.email}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 text-slate-600">
                                            {employee.role}
                                        </td>

                                        <td className="px-6 py-4 text-slate-600">
                                            {employee.department}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onEditEmployee(employee)
                                                    }
                                                    className="rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(employee.id)
                                                    }
                                                    className="rounded-md px-2 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default EmployeeTable;
