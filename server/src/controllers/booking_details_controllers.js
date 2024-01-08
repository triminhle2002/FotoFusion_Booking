const express = require('express');
const sendMail = require("../utils/sendMail");
const { v4: uuidv4 } = require('uuid');
const BookingDetailService = require('../Services/booking_detail_services');

// Lấy danh sách tất cả chi tiết đặt hàng
const getAllBookingDetails = async (req, res) => {
    try {
        const bookingDetails = await BookingDetailService.getAllBookingDetails();
        res.json(bookingDetails);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách chi tiết đặt hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách chi tiết đặt hàng.' });
    }
};

// Lấy thông tin chi tiết đặt hàng bằng ID
const getBookingDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const bookingDetail = await BookingDetailService.getBookingDetailById(id);
        if (!bookingDetail) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết đặt hàng.' });
        }

        res.json(bookingDetail);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết đặt hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin chi tiết đặt hàng.' });
    }
};
const getBookingDetailByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const bookingDetail = await BookingDetailService.getBookingDetailByUserId(id);
        if (!bookingDetail) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết đặt hàng.' });
        }

        res.json(bookingDetail);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết đặt hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin chi tiết đặt hàng.' });
    }
};

// Tạo chi tiết đặt hàng mới
const createNewBookingDetail = async (req, res) => {
    try {
        // Lấy thông tin chi tiết đặt hàng từ request body
        const id = uuidv4();
        const inputData = req.body;
        const bookingDetailData = { id, ...inputData };

        // Gọi service để tạo chi tiết đặt hàng
        const bookingDetail = await BookingDetailService.createBookingDetail(bookingDetailData);

        // Trả về thông tin chi tiết đặt hàng vừa tạo
        res.status(201).json(bookingDetail);
    } catch (error) {
        console.error('Lỗi khi tạo chi tiết đặt hàng mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo chi tiết đặt hàng mới.' });
    }
};

// Cập nhật thông tin chi tiết đặt hàng bằng ID
const updateBookingDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const bookingDetailData = { id, ...inputData };

        // Gọi service để cập nhật chi tiết đặt hàng
        const updatedBookingDetail = await BookingDetailService.updateBookingDetail(id, bookingDetailData);

        if (!updatedBookingDetail) {
            return res.status(404).json({ error: 'Chi tiết đặt hàng không tồn tại' });
        }

        res.status(200).json(updatedBookingDetail);
    } catch (error) {
        console.error('Lỗi khi cập nhật chi tiết đặt hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật chi tiết đặt hàng.' });
    }
};

// Xóa chi tiết đặt hàng bằng ID
const deleteBookingDetailById = async (req, res) => {
    try {
        const id = req.params.id;

        // Gọi service để xóa chi tiết đặt hàng
        const deleteResult = await BookingDetailService.deleteBookingDetail(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết đặt hàng.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa chi tiết đặt hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa chi tiết đặt hàng.' });
    }
};
const sendMailConfirmBooking = async (req, res) => {
    try {
        // Xác định nếu có thời gian thử trang phục hay không
        const email = req.body.email;
        const booking_time = req.body.booking_time;
        // const timeTryCostumes = req.body.timeTryCostumes;

        //const isTryCostumes = timeTryCostumes !== null;

        // Tạo phần HTML cho email
        const html = `
          <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
            <div style="margin: 50px auto; width: 70%; padding: 20px 0">
              <div style="border-bottom: 1px solid #eee">
                <a href="" style="display: block; font-size: 1.9em; color: #FF6600; text-decoration: none; font-weight: 600; text-align: center">FOTO FUSHION</a>
              </div>
              <p style="font-size: 1.1em">Dear Customer,</p>
              <p>Thank you for choosing FotoFushion! Your booking has been confirmed for the following details:</p>
              
              <p><strong>Booking Time:</strong> ${booking_time}</p>
              
            
              
              <p>Please make sure to arrive on time for your photoshoot appointment.</p>
              
              <h2 style="background: #FF6600; margin: 20px auto; width: max-content; padding: 10px; color: #fff; border-radius: 4px;">Thank You!</h2>
              
              <p style="font-size: 0.9em;">Best regards,<br />FotoFushion</p>
              
              <hr style="border: none; border-top: 1px solid #eee" />
              
              <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
                <p>FotoFushion Inc</p>
                <p>254, Nguyen Van Linh Street, Thanh Khue District, Da Nang City</p>
                <p>Vietnam</p>
              </div>
            </div>
          </div>
        `;

        // Gửi email
        await sendMail({
            email,
            html,
            subject: "Booking Confirmation",
        });

        // Trả về phản hồi khi gửi email thành công
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    getAllBookingDetails,
    getBookingDetailById,
    createNewBookingDetail,
    updateBookingDetailById,
    deleteBookingDetailById,
    sendMailConfirmBooking,
    getBookingDetailByUserId
};
