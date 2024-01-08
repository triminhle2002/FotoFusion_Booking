const { v4: uuidv4 } = require("uuid");
const RequestService = require("../services/request_services");

// Lấy danh sách tất cả các yêu cầu
const getAllRequests = async (req, res) => {
  try {
    const requests = await RequestService.getAllRequests();
    res.json(requests);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu cầu:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách yêu cầu." });
  }
};

// Lấy thông tin yêu cầu bằng ID
const getRequestById = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await RequestService.getRequestById(id);
    if (!request) {
      return res.status(404).json({ error: "Không tìm thấy yêu cầu." });
    }

    res.json(request);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin yêu cầu:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi lấy thông tin yêu cầu." });
  }
};
const getRequestByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await RequestService.getAllRequestsByUserId(id);
    if (!request) {
      return res.status(404).json({ error: "Không tìm thấy yêu cầu." });
    }

    res.json(request);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin yêu cầu:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi lấy thông tin yêu cầu." });
  }
};

// Tạo yêu cầu mới
const createNewRequest = async (req, res) => {
  try {
    const id = uuidv4();
    const inputData = req.body;
    const productData = { id, ...inputData };

    const createdRequest = await RequestService.createRequest(productData);
    res.status(201).json(createdRequest);
  } catch (error) {
    console.error("Lỗi khi tạo yêu cầu mới:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi tạo yêu cầu mới." });
  }
};

// Cập nhật thông tin yêu cầu bằng ID
const updateRequestById = async (req, res) => {
  try {
    const id = req.params.id;
    const inputData = req.body;
    const updatedRequest = await RequestService.updateRequest(id, inputData);

    if (!updatedRequest) {
      return res.status(404).json({ error: "Yêu cầu không tồn tại" });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Lỗi khi cập nhật yêu cầu:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật yêu cầu." });
  }
};

// Xóa yêu cầu bằng ID
const deleteRequestById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteResult = await RequestService.deleteRequest(id);

    if (!deleteResult) {
      return res.status(404).json({ error: "Không tìm thấy yêu cầu." });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi xóa yêu cầu:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi xóa yêu cầu." });
  }
};

module.exports = {
  getAllRequests,
  getRequestById,
  createNewRequest,
  updateRequestById,
  deleteRequestById,
  getRequestByUserId,
};
