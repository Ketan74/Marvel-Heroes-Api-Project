module.exports = (req, res, next) => {
    if (req.path === "/register") {
        const { name, email, userName, password } = req.body;
        if (![name, userName, email, password].every(Boolean)) {
            return res.status(422).json({ message: "Missing Information" });
        } else if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof userName !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(422).json({ message: "Missing Information" });
        }
    }
    next();
};
