var jwt = require('jwt-simple');
var secret = '0xDbc23AE43a150ff8884B02Cea117b22D1c3b9796';

exports.checkAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        var userData = jwt.decode(token, secret);
        req.user = userData[0];
        next();
    } catch (e) {
        res.status(401).json({
            status: "Unauthorized"
        })
    }
}