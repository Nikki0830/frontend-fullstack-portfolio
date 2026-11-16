
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

    // Get unique departments
    const departments = [
        "All",
        ...new Set(employees.map((employee) => employee.department)),
    ];

    // Search and department filtering
    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch = `${employee.name} ${employee.email} ${employee.role}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesDepartment =
            selectedDepartment === "All" ||
            employee.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

    // Delete employee
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
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-4 sm:p-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        Recent Employees
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your employee records
                    </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by name, email or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                    />

                    {/* Department Filter */}
                    <select
                        value={selectedDepartment}
                        onChange={(e) =>
                            setSelectedDepartment(e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-auto"
                    >
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>

                    {/* Add Employee */}
                    <button
                        type="button"
                        onClick={onAddEmployee}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0 sm:w-auto"
                    >
                        + Add Employee
                    </button>
                </div>
            </div>

            {/* Employee Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">

                    {/* Table Header */}
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Employee</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-slate-100">

                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    Loading employees...
                                </td>
                            </tr>

                        ) : error ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-red-500">
                                    {error}
                                </td>
                            </tr>

                        ) : filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
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

                                            {/* Edit */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onEditEmployee(employee)
                                                }
                                                className="rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                                            >
                                                Edit
                                            </button>

                                            {/* Delete */}
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
                            ))

                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-12 text-center text-slate-500"
                                >
                                    {searchTerm ||
                                        selectedDepartment !== "All"
                                        ? "No matching employees found."
                                        : "No employees found. Click Add Employee to get started."}
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
