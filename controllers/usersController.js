const UserModal = require("../modals/UserModal");
const jwt = require('jsonwebtoken');

const JWT_SECRET = "semalmahajan"

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await UserModal.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        if (user.password !== password) {
            return res.status(500).json({
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        console.log(token)

        res.status(200).json({
            user,
            token,
            role: user.role,
            message: "User logged in Successfully"
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

const signUp = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const existingUser = await UserModal.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const newUser = new UserModal({ name, email, password, role });
        await newUser.save();

        res.status(201).json({
            newUser,
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};


module.exports = { login, signUp };
