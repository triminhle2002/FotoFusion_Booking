const Account = require('../models/account_models');
const Roles = require('../models/roles_models');


class AccountService {
    async getAccountByEmail(email) {
        try {
            const account = await Account.findOne({
                where: { email },
                include: [
                    {
                        model: Roles, // Thay Role bằng tên mô hình của bạn
                        as: 'Role', // Tùy chọn, chỉ định tên alias (nếu có)
                    },
                ],
            });
            return account;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin tài khoản:', error);
            throw error;
        }
    }
    async getAllAccounts() {
        try {
            const accounts = await Account.findAll({
                include: [
                    {
                        model: Roles, // Thay Role bằng tên mô hình của bạn
                        as: 'Role', // Tùy chọn, chỉ định tên alias (nếu có)
                    },
                ],
            });
            return accounts;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin tài khoản:', error);
            throw error;
        }
    }
    async createAccount(accountData) {
        try {
            const account = await Account.create(accountData);
            return account;
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản:', error);
            throw error;
        }
    }

    async updateAccount(email, accountData) {
        try {
            const account = await Account.findOne({
                where: { email },
            });

            if (!account) {
                return null;
            }

            await account.update(accountData);
            return account;
        } catch (error) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
            throw error;
        }
    }

    async deleteAccount(email) {
        try {
            const account = await Account.findOne({
                where: { email },
            });

            if (!account) {
                return false;
            }

            await account.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa tài khoản:', error);
            throw error;
        }
    }
}

module.exports = new AccountService();