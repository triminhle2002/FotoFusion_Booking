// Import các tệp route cho các bảng khác
const auth = require('./auth')
const account = require('./account_routes.js')
const blogPost = require('./blog_post_routes.js')
const bookingDetails = require('./booking_details_routes.js')
const calendar = require('./calendar_routes.js')
const cart = require('./cart_routes.js')
const cart_items = require('./cart_items_routes.js')
const comment = require('./comment_routes.js')
const costumeRoutes = require('./costume_routes');
const equipmentRoutes = require('./equipment_routes');
const historyPaymentRoutes = require('./history_payment_routes');
const orderDetailRoutes = require('./orders_details_routes.js');
const ordersRoutes = require('./orders_routes');
const photoAlbumsRoutes = require('./photo_albums_routes');
const photosRoutes = require('./photo_routes.js');
const photographyRoomRoutes = require('./photography_room_routes');
const priceListRoutes = require('./price_list_routes');
const productsRoutes = require('./products_routes');
const promotionEventRoutes = require('./promotion_event_routes');
const requestRoutes = require('./request_routes');
const rolesRoutes = require('./roles_routes');
const usersRoutes = require('./users_routes');
const videoAlbumsRoutes = require('./video_albums_routes');
const videoRoutes = require('./video_routes');
const voucherRoutes = require('./voucher_routes');
const locationsRoutes = require('./locations_routes.js');
const notification = require('./notification.js');
const voucherdetail = require('./voucher_detail_routes.js');
const shop = require('./shop.js')
const payment = require('./payment_vnpay.js')



const index = (app) => {
    app.use("/", auth);
    app.use("/", shop)
    app.use("/", account);
    app.use("/", blogPost);
    app.use("/", bookingDetails);
    app.use("/", calendar);
    app.use("/", cart);
    app.use("/", cart_items);
    app.use("/", comment);
    app.use("/", costumeRoutes);
    app.use("/", equipmentRoutes);
    app.use("/", historyPaymentRoutes);
    app.use("/", orderDetailRoutes);
    app.use("/", ordersRoutes);
    app.use("/", photoAlbumsRoutes);
    app.use("/", photosRoutes);
    app.use("/", photographyRoomRoutes);
    app.use("/", priceListRoutes);
    app.use("/", productsRoutes);
    app.use("/", promotionEventRoutes);
    app.use("/", requestRoutes);
    app.use("/", rolesRoutes);
    app.use("/", usersRoutes);
    app.use("/", videoAlbumsRoutes);
    app.use("/", videoRoutes);
    app.use("/", voucherRoutes);
    app.use("/", locationsRoutes);
    app.use("/", notification);
    app.use("/", voucherdetail);
    app.use("/", payment);




};

module.exports = index;
