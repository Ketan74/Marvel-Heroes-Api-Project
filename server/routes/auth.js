const library = require("../library");
const router = require("express").Router();
const jwtGenerator = require("../controllers/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authrization = require("../middleware/authorization");

//Login Route
router.post("/login", async (req, res) => {
    console.log(req.body);
    const { userName, password } = req.body;

    const user = await library.getUser(userName, false);
    if (user) {
        const isValidPassword = await library.comparePass(
            password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                isValidUsername: true,
                message: "*Invalid Password",
            });
        }

        const token = jwtGenerator(userName);
        return res.json({
            token: token,
            name: user.name,
            srNo: user.srNo,
        });
    } else {
        console.log("Invalid Credentials...");
        return res.status(401).json({
            isValidUsername: false,
            message: "*Invalid Username",
        });
    }
});

router.get("/is-verify", authrization, async (req, res) => {
    try {
        const user = await library.getUser(req.user, false);
        return res.json({
            isAuthenticated: true,
            name: user.name,
            srNo: user.srNo,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            isAuthenticated: false,
        });
    }
});

//addNewClass Route
router.post("/register", validInfo, async (req, res) => {
    try {
        const { name, email, userName, password } = req.body;

        let user = await library.getUser(userName, email);

        if (user) {
            return res.status(303).json({
                isUserAdded: false,
                message: "User Already Exist",
            });
        }

        const newUser = await library.addUser(name, email, userName, password);

        if (newUser) {
            return res.status(200).json({
                isUserAdded: true,
                message: "User Added Successfully",
            });
        } else {
            return res.status(303).json({
                isUserAdded: false,
                message: "User Not Added",
            });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .json({ isUserAdded: false, message: "Server Error" });
    }
});

module.exports = router;
