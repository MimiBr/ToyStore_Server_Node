const userModel = require("../Models/userModel")


async function login(req, res) {
    const { name, password } = req.body;

    try {
        // מציאת המשתמש לפי שם וסיסמא
        let user = await userModel.findOne({ name: name, password: password });

        if (user) {
            res.status(200).json({ message: "Login successful", user: user });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}



async function addUser(req, res) {
    try {
        let newToy = req.body;
        let toy = await userModel.create(newToy);
        res.status(200).json(toy);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}
module.exports = { login,addUser}





