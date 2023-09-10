// authMiddleware.js
const jwt = require('jsonwebtoken');
const { JSON_TOKEN_SECRET } = process.env;

exports.validateUser = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.cookies['access-token'];

    // Check if the token is missing
    if (!token) {
        return res.redirect('/login')
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, JSON_TOKEN_SECRET);

        // Attach the user data to the request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Authorization denied. Invalid token.' });
    }
};
