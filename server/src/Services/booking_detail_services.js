const BookingDetail = require('../models/booking_detail_models');
const Users = require('../models/users_models');
const Account = require('../models/account_models');
const Costume = require('../models/costume_models');
const Price_List = require('../models/price_list_models');
const Equipment = require('../models/equipment_models');
const PhotographyRoom = require('../models/photography_room_models');
const Location = require('../models/locations_models');
const PhotoAlbums = require('../models/photo_Albums_models');



class BookingDetailService {
    async getBookingDetailById(id) {
        try {
            const bookingDetail = await BookingDetail.findByPk(id, {
                include: [
                    {
                        model: Costume,
                        as: 'costumes',
                    },
                    {
                        model: Equipment,
                        as: 'equipment',
                    },
                    {
                        model: PhotographyRoom,
                        as: 'room',
                    },
                    {
                        model: Location,
                        as: 'location',
                    },
                    {
                        model: Price_List,
                        as: 'pricelist',
                    },
                    {
                        model: PhotoAlbums,
                        as: 'albums',
                    },
                ],
            });
            return bookingDetail
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chi tiết đặt lịch:', error);
            throw error;
        }
    }
    async getBookingDetailByUserId(id) {
        try {
            const bookingDetail = await BookingDetail.findAll({
                where: {
                    user_id: id
                },
                include: [
                    {
                        model: Costume,
                        as: 'costumes',
                    },
                    {
                        model: Equipment,
                        as: 'equipment',
                    },
                    {
                        model: PhotographyRoom,
                        as: 'room',
                    },
                    {
                        model: Location,
                        as: 'location',
                    },
                    {
                        model: Price_List,
                        as: 'pricelist',
                    },
                    {
                        model: PhotoAlbums,
                        as: 'albums',
                    },
                ],
            });
            return bookingDetail
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chi tiết đặt lịch:', error);
            throw error;
        }
    }


    async getAllBookingDetails() {
        try {
            const bookingDetails = await BookingDetail.findAll({
                include: [
                    {
                        model: Users,
                        as: 'user',
                        include: [
                            {
                                model: Account,
                                as: 'account', // Tên quan hệ với bảng Account
                                attributes: ['phone_number'] // Chỉ lấy số điện thoại
                            }
                        ],
                    },
                    {
                        model: Costume,
                        as: 'costumes',
                    },
                    {
                        model: Equipment,
                        as: 'equipment',
                    },
                    {
                        model: PhotographyRoom,
                        as: 'room',
                    },
                    {
                        model: Location,
                        as: 'location',
                    },
                    {
                        model: Price_List,
                        as: 'pricelist',
                    },
                    {
                        model: PhotoAlbums,
                        as: 'albums',
                    },
                ],
            });
            return bookingDetails;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách chi tiết đặt lịch:', error);
            throw error;
        }
    }

    async createBookingDetail(bookingDetailData) {
        try {
            const bookingDetail = await BookingDetail.create(bookingDetailData);
            return bookingDetail;
        } catch (error) {
            console.error('Lỗi khi tạo chi tiết đặt lịch:', error);
            throw error;
        }
    }

    async updateBookingDetail(id, bookingDetailData) {
        try {
            const bookingDetail = await BookingDetail.findByPk(id);

            if (!bookingDetail) {
                return null;
            }

            await bookingDetail.update(bookingDetailData);
            return bookingDetail;
        } catch (error) {
            console.error('Lỗi khi cập nhật chi tiết đặt lịch:', error);
            throw error;
        }
    }

    async deleteBookingDetail(id) {
        try {
            const bookingDetail = await BookingDetail.findByPk(id);

            if (!bookingDetail) {
                return false;
            }

            await bookingDetail.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa chi tiết đặt lịch:', error);
            throw error;
        }
    }


}

module.exports = new BookingDetailService();
