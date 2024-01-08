const StoreService = require("../Services/shop");
const jwt = require("jsonwebtoken");
let express = require("express");
let router = express.Router();
let $ = require("jquery");
//const request = require('request');
const moment = require("moment");
const PaymentService = require("../Services/payment_services");
const User = require("../models/users_models");

let url_old = "";

const createPayment = async (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  //console.log("lllllllllllllllllllllllllllllll", req.body);
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let config = require("config");

  let tmnCode = config.get("vnp_TmnCode");
  let secretKey = config.get("vnp_HashSecret");
  let vnpUrl = config.get("vnp_Url");
  let returnUrl = config.get("vnp_ReturnUrl");
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.amount;
  let bankCode = req.body.bankCode;

  //let locale = req.body.language;
  //if(locale === null || locale === ''){
  let email = req.body.email;
  let locale = "vn";
  //}
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(500).json({ error: "Đã xảy ra lỗi không tìm thấy user" });
  }
  const user_name = user.name;

  let payment_type = req.body.payment_type;
  let id = req.body.id;
  let payment_message = "";
  url_old = req.body.url;
  let request = req.body.request;
  //1: thanh toan product 2: thanh toan chinh anh 3: thanh toan booking
  if (payment_type == "1") {
    payment_message = "Thanh toan hoa don cua hang cho nguoi dung ";
  } else if (payment_type == "2") {
    payment_message = "Thanh toan hoa don chinh sua anh cho nguoi dung ";
  } else {
    payment_message = "Thanh toan hoa don booking cho nguoi dung ";
  }
  payment_message = payment_message + user_name + " voi ma GD: ";

  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] =
    payment_message +
    orderId +
    " Loai GD: fotofushion" +
    payment_type +
    " email: " +
    email +
    " id :" +
    id +
    " request:" +
    request;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  console.log(">>>>>>>>>>>>>>>", vnp_Params.vnp_OrderInfo);
  vnp_Params = sortObject(vnp_Params);
  //console.log(vnp_Params);
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  //
  console.log("fsfdsfsdf", vnpUrl, "fdfdfs");
  //res.redirect(vnpUrl);
  res.status(200).json({ redirectUrl: vnpUrl });
};

const vnp_Return = async (req, res) => {
  let vnp_Params = req.query;

  const amount = vnp_Params["vnp_Amount"] / 100;

  const order_inf = vnp_Params["vnp_OrderInfo"];
  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let config = require("config");
  let tmnCode = config.get("vnp_TmnCode");
  let secretKey = config.get("vnp_HashSecret");

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  let img_url_old = url_old;

  const id = getId(order_inf);
  const email = getEmail(order_inf);
  const payment_type = getPaymentType(order_inf);
  // img_url_old = img_url_old + getUrl(order_inf);

  const request = getRequest(order_inf);
  //console.log(email);
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(500).json({ error: "Đã xảy ra lỗi không tìm thấy user" });
  }
  const user_id = user.id;
  if (payment_type == "fotofushion1") {
    //console.log("theem du lieu vao bang order");
    PaymentService.sucessPaymentForStore(user_id, amount);
  } else if (payment_type == "fotofushion2") {
    //console.log("theem du lieu vao bang reques");
    PaymentService.sucessPaymentForRequest(user_id, img_url_old, request);
  } else {
    //console.log("theem du lieu vao bang booking details");
    PaymentService.sucessPaymentForBookingdetails(user_id, amount);
  }

  const htmlReport = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FOTO FUSHION</title>
        <style>
            body {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: 100vh;
margin: 0;
font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
            }
    
            div {
                text-align: center;
            }
    
            h1, p {
                margin: 0;
            }
    
            h1 {
                color: #333;
                font-size: 2em;
                margin-bottom: 10px;
            }
    
            p {
                color: #666;
                font-size: 1.2em;
                margin-bottom: 20px; /* Khoảng cách dưới cùng */
            }
    
            a {
                text-decoration: none; /* Loại bỏ đường gạch chân mặc định của liên kết */
                color: #007bff; /* Màu liên kết */
            }
    
            button {
                padding: 10px 20px;
                font-size: 1.2em;
                background-color: #007bff;
                color: #fff;
                border: none;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <div>
            <h1>FOTO FUSHION</h1>
            <p>Thanh Toán Thành Công!</p>
            <p>Trân trọng Cảm ơn Quý Khách đã sử dụng dịch vụ của chúng tôi</p>
            <p>Chúng tôi yêu mọi người</p>
            <a href="https://fotofusionbooking.vercel.app/" target="_blank">Trở lại Website FotoFushion để xem thêm dịch vụ</a>
            
        </div>
    </body>
    </html>
    
    `;

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    //res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    res.setHeader("Content-Type", "text/html");
    res.send(htmlReport);
  } else {
    res.render("success", { code: "97" });
  }
};
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
function getEmail(order_inf) {
  //console.log(order_inf);
  // Sử dụng biểu thức chính quy để lấy đoạn email
  const emailRegex = /email:\s*([^\s]+)/;
  const match = order_inf.match(emailRegex);
  let email = "";
  if (match && match[1]) {
    email = match[1];
    console.log("Địa chỉ email:", email);
  } else {
    console.log("Không tìm thấy địa chỉ email trong văn bản.");
  }
  return email;
}
function getPaymentType(order_inf) {
  const regex = /Loai GD: (\w+)/;
  const match = order_inf.match(regex);

  // Kiểm tra xem có kết quả hay không và lấy giá trị từ nhóm thứ nhất
  const payment_type = match && match[1];
  return payment_type;
}
function getId(order_inf) {
  const regex = /id\s*:\s*(\d+)/;
  const match = order_inf.match(regex);

  // Kiểm tra xem có khớp với regex hay không
  if (match && match[1]) {
    return match[1];
  } else {
    return null; // Hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
  }
}
function getUrl(order_inf) {
  const text = order_inf;

  const regex = /url\s*:\s*(https?:\/\/[^\s]+)/;

  const match = text.match(regex);
  //console.log("EEEEEEEEEEEEEEEEEEE=>",   match[1] ,order_inf);
  // Kiểm tra xem có khớp với regex hay không
  if (match && match[1]) {
    return match[1];
  } else {
    return null; // Hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
  }
}
function getRequest(order_inf) {
  const regex = /request\s*:\s*([^\n]+)/;
  const match = order_inf.match(regex);

  // Kiểm tra xem có khớp với regex hay không
  if (match && match[1]) {
    return match[1];
  } else {
    return null; // Hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
  }
}
module.exports = {
  createPayment,
  vnp_Return,
};
