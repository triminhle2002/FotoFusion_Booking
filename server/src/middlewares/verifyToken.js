const jwt = require('jsonwebtoken');

const Account = require('../models/account_models')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({
            err: 1,
            message: "Require authorization",
        });
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, async (error, decode) => {
        if (error) {
            const isChecked = error instanceof jwt.TokenExpiredError
            if (!isChecked) {
                return res.status(401).json({
                    err: 1,
                    message: "Access Token invalid",
                });
            }
            // Check the expiration date of the access token
            if (isChecked) {
                return res.status(401).json({
                    err: 2,
                    message: "Access Token has expired",
                });
            }
        }
        const account = await Account.findOne({
            where: { email: decode.email },
            attributes: {
                exclude: ["password", "refreshToken"],
            },
        });
        req.account = account;
        next();
    });
};

const isAdminSystem = (async (req, res, next) => {
    if (req.account.role_id !== '33d1f078-9118-4683-93cc-0d75d7cb7e66') {
        return res.status(401).json({
            success: false,
            message: 'You are not the admin of this sytem',
        });
    } else {
        next();
    }
});

const isAdminOrEditorSystem = async (req, res, next) => {
    const allowedRoles = ['33d1f078-9118-4683-93cc-0d75d7cb7e66', 'b0a8f0a7-32f8-4440-8483-c4d74dd95773'];
    if (!allowedRoles.includes(req.account.role_id)) {
        return res.status(401).json({
            success: false,
            message: 'You are not the admin or photo editor of this system',
        });
    } else {
        next();
    }
};

const isAdminAndMakeUpSystem = (async (req, res, next) => {
    const allowedRoles = ['33d1f078-9118-4683-93cc-0d75d7cb7e66', 'b6d6c655-3f81-4ed4-aac7-a9a69dc4ae3b'];
    if (!allowedRoles.includes(req.account.role_id)) {
        return res.status(401).json({
            success: false,
            message: 'You are not the admin or makeup of this system',
        });
    } else {
        next();
    }
});
const isAdminAndPhotographerSystem = (async (req, res, next) => {
    const allowedRoles = ['33d1f078-9118-4683-93cc-0d75d7cb7e66', '967bef84-6cb8-4c1e-81ed-5c44684a3ac0'];
    if (!allowedRoles.includes(req.account.role_id)) {
        return res.status(401).json({
            success: false,
            message: 'You are not the admin or photographer of this system',
        });
    } else {
        next();
    }
});
const isAdminAndcusSerRepSystem = (async (req, res, next) => {
    const allowedRoles = ['33d1f078-9118-4683-93cc-0d75d7cb7e66', '23503de6-755f-45dc-87df-4b239b0af59f'];
    if (!allowedRoles.includes(req.account.role_id)) {
        return res.status(401).json({
            success: false,
            message: 'You are not the admin or Customer Service Representative of this system',
        });
    } else {
        next();
    }
});



module.exports = {
    verifyToken,
    isAdminSystem,
    isAdminOrEditorSystem,
    isAdminAndMakeUpSystem,
    isAdminAndPhotographerSystem,
    isAdminAndcusSerRepSystem

};