const ensureSignedIn = (req, res, next) => {
    if (!req.session.jwtToken) {
        return res.json({
            success: false,
            error:`You must login`
        })
    }
    next();
}

const ensureSignedOut = (req, res, next) => {
    if (req.session.jwtToken) {
        return res.json({
            success: false,
            error: `You already logged-in`
        })
    }
    next();
}

module.exports = {
    ensureSignedIn,
    ensureSignedOut
}
