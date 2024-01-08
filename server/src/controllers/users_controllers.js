const { v4: uuidv4 } = require('uuid');
const UserService = require('../Services/user_services');

// Lấy danh sách tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách người dùng.' });
    }
};
const getAllUsersIsCustomer = async (req, res) => {
    try {
        const users = await UserService.getAllUsersIsCustomer();
        res.status(200).json(users);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách người dùng.' });
    }
};
// Lấy thông tin người dùng bằng ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
        }

        res.json(user);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
        }
        res.json(user);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin người dùng.' });
    }
};

// Tạo người dùng mới
const createNewUser = async (req, res) => {
    try {
        const { email, address, name, gender, voucher_id } = req.body;
        const id = uuidv4();
        const userData = { id, email, address, name, gender, voucher_id };
        const createdUser = await UserService.createUser(userData);
        res.status(201).json(createdUser);
    } catch (error) {
        console.error('Lỗi khi tạo người dùng mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo người dùng mới.' });
    }
};

// Cập nhật thông tin người dùng bằng ID
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const userData = { id, ...inputData };;
        const updatedUser = await UserService.updateUser(id, userData);

        if (!updatedUser) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Lỗi khi cập nhật người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật người dùng.' });
    }
};

// Xóa người dùng bằng ID
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await UserService.deleteUser(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa người dùng.' });
    }
};
const deleteUserbyEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const deleteResult = await UserService.deleteUserbyEmail(email);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa người dùng.' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
    getUserByEmail,
    deleteUserbyEmail,
    getAllUsersIsCustomer
};
