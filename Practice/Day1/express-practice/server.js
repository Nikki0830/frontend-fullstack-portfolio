import express from "express"

//create and express application
const app = express();

//Define the server port
const PORT = 5000;

//create our first route
app.get("/", (req, res) => {
    res.send("Welcome to our employee management system")
})

//start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})