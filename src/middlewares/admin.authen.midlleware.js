export const adminCheck = (req, res, next) => {
    // console.log(req.user)
if(req.user && req.user.role === 'ADMIN') {
    next()
} else{
    res.status(403).json({
        message:"Unauthorized user"
    })
}
}

