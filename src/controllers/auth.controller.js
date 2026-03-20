export function register(req, res) {
    res.send('Register Controller')
}

export function login(req, res) {
    res.json({
        msg: "login completed",
        body: req.body
    })
}