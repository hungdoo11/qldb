import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import api from "../api/Api";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [payments, setPayments] = useState([]);
  const [method, setMethod] = useState("cash");
  const [amount, setAmount] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [usePoints, setUsePoints] = useState(false);
  const [pointsUsed, setPointsUsed] = useState(0);

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

      if (res.data.status === "pending") {
        setOrderDetails(null);
        setTotalPrice(0);
        setLoading(false);
        return;
      }

      const order = res.data[0];

      const orderInfo = {
        orderId: order.id,
        customerName: order.customer?.name || "N/A",
        points: order.customer?.points || 0,
        type: order.customer?.type || "walk-in",
        userName: order.user?.name || "N/A",
        tableNumber: order.table?.table_number || "N/A",
        status: order.status || "Không xác định",
        totalAmount: parseFloat(order.total_amount || 0).toLocaleString("vi-VN"),
        createdAt: order.create_ated || "N/A",
        updatedAt: order.update_ated || "N/A",
        items:
          order.details?.map((detail) => ({
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

  const closeModal = () => {
    setSelectedTable(null);
    setOrderDetails(null);
    setTotalPrice(0);
    setModalType(null);
    setUsePoints(false);
    setPointsUsed(0);
  };

  const openPayment = async (table) => {
    setSelectedTable(table);
    setModalType("payment");
    setPayments([]);
    setAmount("");
    setPaymentDone(false);
    setUsePoints(false);
    setPointsUsed(0);

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

  const addPayment = () => {
    const amountValue = parseFloat(amount);
    const totalDue = totalPrice - pointsUsed;

    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ!");
      return;
    }
    if (amountValue > totalDue - payments.reduce((sum, p) => sum + p.amount, 0)) {
      alert("Số tiền vượt quá tổng số tiền còn lại!");
      return;
    }

    setPayments([...payments, { method, amount: amountValue }]);
    setAmount("");
  };

  const completePayment = async () => {
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalDue = totalPrice - pointsUsed;

    if (totalPaid !== totalDue) {
      alert(
        `Tổng thanh toán (${totalPaid.toLocaleString(
          "vi-VN"
        )} đ) không khớp với tổng cần trả (${totalDue.toLocaleString(
          "vi-VN"
        )} đ)!`
      );
      return;
    }

    try {
      const paymentArray = payments.map((item) => ({
        method: item.method,
        amount: item.amount,
      }));
      const payment = JSON.stringify(paymentArray);
      let pointsUsedCount = 0;
      if (usePoints && pointsUsed > 0) {
        let rate = 1000;
        if (orderDetails?.type === "member") rate = 1400;
        if (orderDetails?.type === "vip") rate = 1700;
        pointsUsedCount = Math.floor(pointsUsed / rate);
      }

      const finalAmount = totalPrice - pointsUsed;

      const res = await api.post(`/admin/payment-order`, {
        use_points: usePoints,
        points_used_money: pointsUsed,
        points_used_count: pointsUsedCount,
        final_amount: finalAmount,
        payment,
        order_id: orderDetails.orderId,
      });

      console.log("💳 Thanh toán thành công:", res);
      setPaymentDone(true); 
      await fetchTables();
      setTimeout(() => {
        closeModal();
      }, 2500);
    } catch (error) {
      console.error(
        "Lỗi khi thanh toán:",
        error.response ? error.response.data : error.message
      );
      alert("Có lỗi xảy ra khi thanh toán!");
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
    <div>
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
                  {table.status === "occupied" && (
                    <button className="btn-back" onClick={() => openDetail(table)}>
                      Chi tiết
                    </button>
                  )}
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

      {/* 🔎 Modal chi tiết đơn hàng */}
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
                          <td>
                            {(item.qty * item.price).toLocaleString("vi-VN")} đ
                          </td>
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
                  <button className="btn-back" onClick={closeModal}>
                    Đóng
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>Đang chờ duyệt hoá đơn.</p>
                <button className="btn-back" onClick={closeModal}>
                  Đóng
                </button>
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
                <h2 className="payment-title">💳 Thanh toán - Bàn {selectedTable.table_number}</h2>

                {/* 💠 Thông tin khách hàng */}
                <div className="customer-info">
                  <p><strong>Tên KH:</strong> {orderDetails?.customer_name || "Walk-in"}</p>
                  <p><strong>Loại KH:</strong> {orderDetails?.type || "walk-in"}</p>
                  <p><strong>Điểm hiện có:</strong> {orderDetails?.points || 0}</p>
                </div>

                {/* 🔘 Sử dụng điểm */}
                <div className="points-toggle">
                  <label>
                    <input
                      type="checkbox"
                      checked={usePoints}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setUsePoints(checked);

                        let rate = 1000;
                        if (orderDetails?.type === "member") rate = 1400;
                        if (orderDetails?.type === "vip") rate = 1700;

                        // Giới hạn trừ không vượt quá tổng tiền
                        const moneyFromPoints = checked
                          ? Math.min((orderDetails?.points || 0) * rate, totalPrice)
                          : 0;

                        setPointsUsed(moneyFromPoints);
                      }}
                    />
                    <span>💎 Sử dụng điểm để giảm giá</span>
                  </label>

                  {usePoints && (
                    <p className="points-discount">
                      Giảm: {pointsUsed.toLocaleString("vi-VN")} đ
                      <br />
                      (1 điểm ={" "}
                      {orderDetails?.type === "vip"
                        ? "1,700"
                        : orderDetails?.type === "member"
                          ? "1,400"
                          : "1,000"}{" "}
                      đ)
                    </p>
                  )}
                </div>

                {/* 💳 Chọn phương thức thanh toán */}
                <div className="payment-method-section">
                  <label>Phương thức thanh toán:</label>
                  <select
                    className="payment-select"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <option value="cash">💵 Tiền mặt</option>
                    <option value="card">💳 Thẻ</option>
                    <option value="transfer">🏦 Chuyển khoản</option>
                  </select>
                </div>

                {/* 💰 Nhập số tiền */}
                <div className="payment-amount-section">
                  <label>Số tiền thanh toán:</label>
                  <input
                    className="payment-input"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Nhập số tiền..."
                  />
                  <button className="btn-add" onClick={addPayment}>+ Thêm</button>
                </div>

                {/* 📃 Danh sách khoản đã nhập */}
                <div className="payment-list-section">
                  <h4>💸 Khoản thanh toán:</h4>
                  <ul className="payment-list">
                    {payments.length > 0 ? (
                      payments.map((p, i) => (
                        <li key={i}>
                          {p.method.toUpperCase()} —{" "}
                          {p.amount.toLocaleString("vi-VN")} đ
                        </li>
                      ))
                    ) : (
                      <li>Chưa có khoản thanh toán nào</li>
                    )}
                  </ul>
                </div>

                {/* ✅ Tổng kết thanh toán */}
                <div className="payment-summary">
                  <p>
                    Tổng hóa đơn: <strong>{totalPrice.toLocaleString("vi-VN")} đ</strong>
                  </p>
                  {usePoints && (
                    <p>
                      Sau khi trừ điểm:{" "}
                      <strong>{(totalPrice - pointsUsed).toLocaleString("vi-VN")} đ</strong>
                    </p>
                  )}
                  <p>
                    Đã thanh toán:{" "}
                    <strong>
                      {payments
                        .reduce((sum, p) => sum + p.amount, 0)
                        .toLocaleString("vi-VN")}{" "}
                      đ
                    </strong>
                  </p>
                </div>

                {/* ⚡️ Nút hành động */}
                <div className="payment-actions">
                  <button className="btn-confirm" onClick={completePayment}>
                    Hoàn tất
                  </button>
                  <button className="btn-cancel" onClick={closeModal}>
                    ❌ Hủy
                  </button>
                </div>
              </>
            ) : (
              <div className="payment-done">
                <h2>✅ Thanh toán hoàn tất!</h2>
                <p>Đơn hàng đã được thanh toán thành công.</p>
                <button className="btn-confirm" onClick={closeModal}>Đóng</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
