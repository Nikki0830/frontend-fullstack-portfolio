
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import StatCard from "../components/dashboard/StatCard";
import EmployeeTable from "../components/employees/EmployeeTable";
// import { updateEmployee } from "../features/employees/employeeSlice";
import { createEmployee } from "../features/employees/employeeThunks";
import type { Employee } from "../features/employees/employeeTypes";
import EmployeeForm from "../components/employees/EmployeeForm";
import { useEffect } from "react";
import { fetchEmployees } from "../features/employees/employeeThunks";
import { updateEmployeeAPI } from "../features/employees/employeeThunks";

const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] =
        useState<Employee | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleAddEmployee = async (
        employee: Omit<Employee, "id">
    ) => {
        try {
            await dispatch(createEmployee(employee)).unwrap();

            setShowForm(false);
            setSelectedEmployee(null);
        } catch (error) {
            console.error("Failed to add employee:", error);
        }
    };

    const handleUpdateEmployee = async (employee: Employee) => {
        try {
            await dispatch(updateEmployeeAPI(employee)).unwrap();

            setShowForm(false);
            setSelectedEmployee(null);
        } catch (error) {
            console.error("Failed to update employee:", error);
        }
    };

    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedEmployee(null);
    };

    const handleFormSubmit = (
        employee: Omit<Employee, "id" | "created_at">
    ) => {
        if (selectedEmployee) {
            handleUpdateEmployee({
                ...employee,
                id: selectedEmployee.id,
            });
        } else {
            handleAddEmployee(employee);
        }
    };

    const employees = useSelector(
        (state: RootState) => state.employees.employees
    );

    const totalEmployees = employees.length;

    const totalDepartments = new Set(
        employees.map((employee) => employee.department)
    ).size;


    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">
                    Dashboard Overview
                </h1>
                <p className="mt-2 text-slate-500">
                    Manage your employees and organization.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                <StatCard
                    title="Total Employees"
                    value={totalEmployees}
                    icon="👥"
                    color="bg-blue-100"
                />

                <StatCard
                    title="Active Employees"
                    value="—"
                    icon="✅"
                    color="bg-green-100"
                />

                <StatCard
                    title="Departments"
                    value={totalDepartments}
                    icon="🏢"
                    color="bg-purple-100"
                />

                <StatCard
                    title="New Employees"
                    value="—"
                    icon="🆕"
                    color="bg-orange-100"
                />
            </div>

            <EmployeeTable
                onAddEmployee={() => {
                    setSelectedEmployee(null);
                    setShowForm(true);
                }}
                onEditEmployee={handleEditEmployee}
            />

            {showForm && (
                <EmployeeForm
                    onClose={handleCloseForm}
                    onSubmit={handleFormSubmit}
                    employee={selectedEmployee}
                />
            )}
        </div>
    );
};

export default Dashboard;
