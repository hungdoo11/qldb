import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // dùng để điều hướng
import "./admin.css";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null); // bàn đang chọn
  const [orderDetails, setOrderDetails] = useState(null); // thông tin đơn hàng
  const [showPayment, setShowPayment] = useState(false); // mở modal thanh toán
  const [payments, setPayments] = useState([]); // danh sách thanh toán
  const [method, setMethod] = useState("cash");
  const [amount, setAmount] = useState(""); // Số tiền cho mỗi lần thêm
  const [paymentDone, setPaymentDone] = useState(false); // trạng thái hoàn thành
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const openDetail = async (table) => {
    setSelectedTable(table);
    setModalType("detail");
    setLoading(true);

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/admin/order-by-table/${table.id}`,
        { headers: { Accept: "application/json" } }
      );

      console.log("API Response:", res.data); // Kiểm tra dữ liệu
      if (!res.data || res.data.length === 0) {
        setOrderDetails(null);
        setTotalPrice(0);
        setLoading(false);
        return;
      }

      const order = res.data[0];

      const orderInfo = {
        orderId: order.id,
        customerName: order.customer?.name || "N/A",
        userName: order.user?.name || "N/A",
        tableNumber: order.table?.table_number || "N/A",
        status: order.status || "Không xác định",
        totalAmount: parseFloat(order.total_amount || 0).toLocaleString("vi-VN"),
        createdAt: order.created_at || "N/A",
        updatedAt: order.updated_at || "N/A",
        items: order.details?.map((detail) => ({
          name: detail.dish?.name || "Không xác định",
          qty: detail.quantity,
          price: parseFloat(detail.price),
        })) || [],
      };

      setOrderDetails(orderInfo);
      const total = orderInfo.items.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      );
      setTotalPrice(total);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi API:", err.response ? err.response.data : err.message);
      setOrderDetails(null);
      setTotalPrice(0);
      setLoading(false);
    }
  };

  const closeDetail = () => {
    setSelectedTable(null);
    setOrderDetails(null);
    setTotalPrice(0);
  };

  const openPayment = async (table) => {
    setSelectedTable(table);
    setModalType("payment");
    setPayments([]);
    setAmount(""); // Reset amount khi mở modal
    setPaymentDone(false);

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/admin/order-by-table/${table.id}`,
        { headers: { Accept: "application/json" } }
      );

      if (res.data && res.data.length > 0) {
        const order = res.data[0];
        setPayments(order.payments || []);
      }
    } catch (err) {
      console.error("Lỗi lấy dữ liệu thanh toán:", err);
    }
  };

  const closeModal = () => {
    setSelectedTable(null);
    setOrderDetails(null);
    setTotalPrice(0);
    setModalType(null);
  };

  // Thêm phương thức thanh toán
  const addPayment = () => {
    const amountValue = parseFloat(amount);
    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ!");
      return;
    }
    if (amountValue > totalPrice - payments.reduce((sum, p) => sum + p.amount, 0)) {
      alert("Số tiền vượt quá tổng số tiền còn lại!");
      return;
    }
    setPayments([...payments, { method, amount: amountValue }]);
    setAmount(""); // Reset input sau khi thêm
  };

  // Hoàn thành thanh toán
  const completePayment = async () => {
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    if (totalPaid !== totalPrice) {
      alert(`Tổng số tiền thanh toán (${totalPaid.toLocaleString("vi-VN")} đ) không khớp với tổng hóa đơn (${totalPrice.toLocaleString("vi-VN")} đ)!`);
      return;
    }

    try {
      console.log("Payments to send:", payments);
      console.log("Order ID:", orderDetails?.orderId);

      // Gọi API lưu từng payment
      for (let p of payments) {
        const response = await axios.post("http://127.0.0.1:8000/api/admin/payments", {
          order_id: orderDetails?.orderId,
          method: p.method,
          amount: p.amount,
        });
        console.log("Payment response:", response.data);
      }

      // Cập nhật trạng thái đơn hàng
      const updateResponse = await axios.put(
        `http://127.0.0.1:8000/api/admin/orders/${orderDetails?.orderId}/pay`,
        { status: "paid" }
      );
      console.log("Update status response:", updateResponse.data);

      setPaymentDone(true);
      alert("Thanh toán thành công!");
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error.response ? error.response.data : error.message);
      alert("Có lỗi xảy ra khi thanh toán! Kiểm tra console để biết thêm chi tiết.");
    }
  };

  const translateStatus = (status) => {
    switch (status) {
      case "available":
        return "Trống";
      case "occupied":
        return "Đang sử dụng";
      case "reserved":
        return "Đặt trước";
      default:
        return "Không xác định";
    }
  };

  const getStatusClass = (status) => {
    if (status === "available") return "status-empty";
    if (status === "occupied") return "status-busy";
    if (status === "reserved") return "status-reserved";
    return "";
  };

  const fetchTables = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/tables", {
        headers: { Accept: "application/json" },
      });
      setTables(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch tables error:", err);
      setError("Không thể tải danh sách bàn");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  if (loading) return <p>Đang tải danh sách bàn...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="">
      <h2 className="admin-title">Danh sách bàn</h2>
      <div className="admin-container">
        <div className="tables-grid">
          {tables.length > 0 ? (
            tables.map((table) => (
              <div className="table-card" key={table.id}>
                <h3>Bàn {table.table_number}</h3>
                <p className={`table-status ${getStatusClass(table.status)}`}>
                  {translateStatus(table.status)}
                </p>
                <div className="table-actions">
                  <button className="btn-back" onClick={() => openDetail(table)}>
                    Chi tiết
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/admin/tables/edit/${table.id}`)}
                  >
                    Sửa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Không có bàn nào</p>
          )}
        </div>
      </div>
      {modalType === "detail" && selectedTable && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Chi tiết Bàn {selectedTable.table_number}</h3>

            {loading ? (
              <p>Đang tải thông tin đơn hàng...</p>
            ) : orderDetails ? (
              <div className="order-info">
                <p><strong>Mã đơn:</strong> {orderDetails.orderId}</p>
                <p><strong>Nhân viên:</strong> {orderDetails.userName}</p>
                <p><strong>Khách hàng:</strong> {orderDetails.customerName}</p>
                <p><strong>Bàn:</strong> {orderDetails.tableNumber}</p>
                <p><strong>Trạng thái:</strong> {orderDetails.status}</p>
                <p><strong>Tổng tiền:</strong> {orderDetails.totalAmount} đ</p>
                <p><strong>Tạo lúc:</strong> {orderDetails.createdAt}</p>
                <p><strong>Cập nhật lúc:</strong> {orderDetails.updatedAt}</p>

                {orderDetails.items.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Món</th>
                        <th>SL</th>
                        <th>Giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.qty}</td>
                          <td>{item.price.toLocaleString("vi-VN")} đ</td>
                          <td>{(item.qty * item.price).toLocaleString("vi-VN")} đ</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Không có món nào trong đơn hàng.</p>
                )}

                <div className="total">
                  <h3>Tổng cộng: {totalPrice.toLocaleString("vi-VN")} đ</h3>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-confirm"
                    onClick={() => openPayment(selectedTable)}
                    disabled={orderDetails.status === "paid"}
                  >
                    Thanh toán
                  </button>
                  <button className="btn-back" onClick={closeModal}>Đóng</button>
                </div>
              </div>
            ) : (
              <div>
                <p>Không có đơn hàng cho bàn này.</p>
                <button className="btn-back" onClick={closeModal}>Đóng</button>
              </div>
            )}
          </div>
        </div>
      )}

      {modalType === "payment" && selectedTable && (
        <div className="payment-overlay" onClick={closeModal}>
          <div className="payment-box" onClick={(e) => e.stopPropagation()}>
            {!paymentDone ? (
              <>
                <h3>Thanh toán - Bàn {selectedTable.table_number}</h3>

                <label>Phương thức:</label>
                <select
                  className="payment-select"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="cash">Tiền mặt</option>
                  <option value="card">Thẻ</option>
                  <option value="transfer">Chuyển khoản</option>
                </select>

                <label>Số tiền:</label>
                <input
                  className="payment-input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Nhập số tiền"
                />

                <button className="btn-edit" onClick={addPayment}>
                  Thêm
                </button>

                <ul className="payment-list">
                  {payments.map((p, i) => (
                    <li key={i}>
                      {p.method} - {p.amount.toLocaleString("vi-VN")} đ
                    </li>
                  ))}
                </ul>
                <p>
                  Tổng đã thanh toán: {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString("vi-VN")} đ / {totalPrice.toLocaleString("vi-VN")} đ
                </p>

                <div className="payment-actions">
                  <button className="btn-confirm" onClick={completePayment}>
                    Hoàn thành
                  </button>
                  <button className="btn-back" onClick={closeModal}>
                    Hủy
                  </button>
                </div>
              </>
            ) : (
              <div className="payment-done">
                <h3>✅ Thanh toán hoàn tất</h3>
                <button className="btn-confirm" onClick={closeModal}>Đóng</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}