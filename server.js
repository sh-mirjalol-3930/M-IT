const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Login endpoint
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync("users.json"));
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        res.json({ message: "Success", role: user.role });
    } else {
        res.status(401).json({ message: "Login yoki parol xato" });
    }
});

// Admin yangi user qo‘shadi
app.post("/add-user", (req, res) => {
    const newUser = req.body;

    const users = JSON.parse(fs.readFileSync("users.json"));
    users.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    res.json({ message: "Yangi foydalanuvchi qo‘shildi" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
