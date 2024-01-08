const authServices = require("../Services/Auth");
const joi = require("joi");
const { email, password, refreshToken, phone_number } = require("../helper/joi_schema");
const { v4: uuidv4 } = require("uuid");

const Userservices = require('../Services/user_services')


const generateUserNameFromEmail = (email) => {
    const parts = email.split('@');
    return parts[0];
}
const createNewUser = async (email) => {

    const name = generateUserNameFromEmail(email)
    const id = uuidv4();
    const userData = { id, email, name };
    const createdUser = await Userservices.createUser(userData);

};


const register = async (req, res) => {
    try {
        // Validate data

        const { email, password, phone_number } = req.body;

        const { error } = joi.object({ email, password, phone_number }).validate(req.body);
        if (error)
            return res.status(400).json({
                message: error.details[0].message,
            });


        const accountData = { email, password, phone_number }

        const response = await authServices.registerAndSendOTP(accountData, res);

        return response

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
const confirmOtpRegisted = async (req, res) => {
    try {
        if (!req.body.email || !req.body.otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            });
        } else {
            const response = await authServices.confirmOTPAndActivateAccount(req.body, res);

            if (response && response.statusCode === 200) {
                // Kiểm tra xem createNewUser có được gọi đúng cách hay không
                const newUser = await createNewUser(req.body.email, req, res);
                // if (newUser) {
                //     return res.status(200).json({ message: 'Account confirmed, activated, and user created successfully.' });
                // } else {
                //     return res.status(500).json({ message: 'Failed to create user after activation.' });
                // }
            }
            return response;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        // Validate data
        const { error } = joi.object({ email, password }).validate(req.body);
        if (error)
            return res.status(400).json({
                message: error.details[0].message,
            });
        const response = await authServices.login(req.body, res);
        return response;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const refreshTokenCrl = async (req, res) => {
    try {
        const { error } = joi.object({ refreshToken }).validate(req.cookies);
        if (error)
            return res.status(400).json({
                message: error.details[0].message,
            });
        const response = await authServices.refreshToken(req.cookies.refreshToken, res);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const logout = async (req, res) => {
    try {
        const { error } = joi.object({ refreshToken }).validate(req.cookies);
        if (error)
            return res.status(400).json({
                message: error.details[0].message,
            });
        const response = await authServices.logout(req.cookies.refreshToken, res);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { error } = joi.object({ email }).validate(req.body);
        if (error)
            return res.status(400).json({
                message: error.details[0].message,
            });
        const response = await authServices.forgotPassword(req.body.email, res);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const resetPassword = async (req, res) => {
    try {

        if (!req.body.password || !req.body.otp)
            return res.status(400).json({
                message: "Password and OTP is required",
            });
        const response = await authServices.resetPassword(req.body, res);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
const changePassword = async (req, res) => {
    try {

        const email = req.params.email;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({
                message: "newPassword || oldPassword || email is required",
            });
        }

        const changepw = await authServices.changePassword({ email, oldPassword, newPassword }, res);
        return changepw
    } catch (error) {
        console.error('Lỗi thay đổi mật khẩu:', error);
        res.status(500).json({ error: 'Lỗi thay đổi mật khẩu.' });
    }
};

module.exports = {
    login,
    register,
    confirmOtpRegisted,
    refreshTokenCrl,
    logout,
    forgotPassword,
    resetPassword,
    changePassword
};