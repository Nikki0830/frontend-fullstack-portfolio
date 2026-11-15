import pool from "../config/database.js"



// Temporary employee data
let employees = [
    {
        id: 1,
        name: "Nikita Patel",
        role: "Frontend Developer",
        department: "Engineering",
        email: "nikita@example.com",
    },
    {
        id: 2,
        name: "Rahul Sharma",
        role: "Backend Developer",
        department: "Engineering",
        email: "rahul@example.com",
    },
];

// GET all employees GET
// export const getAllEmployees = (req, res) => {
//     res.status(200).json(employees)
// }

// after db connection
export const getAllEmployees = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM employees ORDER BY id ASC"
        )
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error fetching employee:", error.message)

        res.status(500).json({
            message: "Failed to fetch employees"
        })
    }
}

//Get  employee by ID GET
export const getEmployeeID = (req, res) => {
    const employeeID = Number(req.params.id)

    const employee = employees.find((emp) => emp.id === employeeID)

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        })
    }

    res.status(200).json(employee)
}

//create employee POST
// export const createEmployee = (req, res) => {
//     const { name, role, department, email } = req.body;

//     //validate required fields
//     if (!name || !role, !department, !email) {
//         return res.status(400).json({
//             message: "All fields are required"
//         })
//     }

//     //create new employee
//     const newEmployee = {
//         id: employees.length + 1,
//         name,
//         role,
//         department,
//         email
//     }

//     //Add employee top array
//     employees.push(newEmployee)

//     //send response
//     res.status(201).json({
//         message: "Employee created successfully",
//         employee: newEmployee,
//     })
// }

// CREATE employee
export const createEmployee = async (req, res) => {
    try {
        const { name, role, department, email } = req.body;

        // Validate required fields
        if (!name || !role || !department || !email) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Insert employee into PostgreSQL
        const result = await pool.query(
            `INSERT INTO employees (name, role, department, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [name, role, department, email]
        );

        res.status(201).json({
            message: "Employee created successfully",
            employee: result.rows[0],
        });

    } catch (error) {
        console.error("Error creating employee:", error.message);

        res.status(500).json({
            message: "Failed to create employee",
        });
    }
};


//UPDATE employee PUT/PATCH
// export const updateEmployee = (req, res) => {
//     const employeeID = Number(req.params.id)

//     const employee = employees.find((emp) => emp.id === employeeID)

//     if (!employee) {
//         return res.status(404).json({
//             message: "Employee not found"
//         })
//     }

//     const { name, role, department, email } = req.body;

//     employee.name = name;
//     employee.role = role;
//     employee.department = department;
//     employee.email = email;

//     res.status(200).json({
//         message: "Employee updated successfully",
//         employee
//     })
// }

//After adding db connection

// UPDATE employee
export const updateEmployee = async (req, res) => {
    try {
        const employeeId = Number(req.params.id);

        const { name, role, department, email } = req.body;

        // Validate required fields
        if (!name || !role || !department || !email) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Update employee in PostgreSQL
        const result = await pool.query(
            `UPDATE employees
       SET name = $1,
           role = $2,
           department = $3,
           email = $4
       WHERE id = $5
       RETURNING *`,
            [name, role, department, email, employeeId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee: result.rows[0],
        });

    } catch (error) {
        console.error("Error updating employee:", error.message);

        res.status(500).json({
            message: "Failed to update employee",
        });
    }
};



//DELETE employee DELETE
// export const deleteEmployee = (req, res) => {
//     const employeeID = Number(req.params.id);

//     const employeeIndex = employees.findIndex((emp => emp.id === employeeID));

//     if (employeeIndex === -1) {
//         return res.status(404).json({
//             message: "Employee not found",
//         })
//     }

//     employees.splice(employeeIndex, 1);

//     res.status(200).json({
//         message: "Employee deleted successfully"
//     })
// }


// after db connection

export const deleteEmployee = async (req, res) => {
    try {
        const employeeId = Number(req.params.id);

        const result = await pool.query(
            `DELETE FROM employees
       WHERE id = $1
       RETURNING *`,
            [employeeId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully",
            employee: result.rows[0],
        });

    } catch (error) {
        console.error("Error deleting employee:", error.message);

        res.status(500).json({
            message: "Failed to delete employee",
        });
    }
};


// Keyword	Meaning
// SELECT	Retrieve data
// FROM	Specify the table
// ORDER BY	Sort the results
// ASC	Ascending order
// INSERT INTO	Insert records
// UPDATE	Update records
// DELETE	Delete records