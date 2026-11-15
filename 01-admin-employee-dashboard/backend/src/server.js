import express from "express"
import employeeRoutes from "./routes/employeeRoutes.js"
import pool from "./config/database.js"

const app = express()

const PORT = 5000;

//middleware
app.use(express.json())

// /This connects all employee routes to the main server.
app.use("/api/employees", employeeRoutes)

//// Test PostgreSQL connection
// Test PostgreSQL connection
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.status(200).json({
            message: "Database connected successfully!",
            time: result.rows[0].now,
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Database connection failed",
        });
    }
});

//welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Employee management API is running!"
    })
});

//start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})