const Account = require('../models/account_models');
const User = require('../models/users_models');
const Roles = require('../models/roles_models');

class UserService {
    async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            throw error;
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email: email }
            });
            return user;
        } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await User.findAll({
                include: [
                    {
                        model: Account,
                        as: 'account',
                    },
                ],
            });
            return users;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài viết:', error);
            throw error;
        }
    }
    async getAllUsersIsCustomer() {
        try {
            const users = await User.findAll({
                include: [
                    {
                        model: Account,
                        as: 'account',
                        include: [
                            {
                                model: Roles, // Tên mô hình Role
                                as: 'Role',
                                where: {
                                    name: 'customer', // Điều kiện để chọn vai trò là 'customer'
                                },
                            },
                        ],
                    },
                ],

            });
            const customerUsers = users
                .filter(user => user.account && user.account.role !== null)
                .map(user => ({
                    id: user.id,
                    email: user.email,
                    name: user.name
                }));

            return customerUsers;

            return customerUsers;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.error('Lỗi khi tạo bài viết:', error);
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {
            const user = await User.findByPk(id);

            if (!user) {
                return null;
            }

            await user.update(userData);
            return user;
        } catch (error) {
            console.error('Lỗi khi cập nhật bài viết:', error);
            throw error;
        }
    }


    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);

            if (!user) {
                return false;
            }

            await user.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa bài viết:', error);
            throw error;
        }
    }
    async deleteUserbyEmail(email) {
        try {
            const user = await User.findOne({
                where: { email: email }
            });

            if (!user) {
                return false;
            }

            await user.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa người dùng :', error);
            throw error;
        }
    }
}

module.exports = new UserService();