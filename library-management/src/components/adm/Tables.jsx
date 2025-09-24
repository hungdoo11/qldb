import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // dùng để điều hướng
import "./admin.css";

export default function Tables() 
{
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [selectedTable, setSelectedTable] = useState(null); // bàn đang chọn
const [orderDetails, setOrderDetails] = useState(null);   // thông tin đơn hàng
const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

const openDetail = async (table) => {
  setSelectedTable(table);
  setLoading(true);

try {
  const res = await axios.get(
    `http://127.0.0.1:8000/api/admin/orders/${table.id}`,
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
      orderId: order.id || "N/A",
      customerId: order.customer?.name || order.customer_id || "N/A",
      userId: order.user?.name || order.user_id || "N/A",
      table: order.table?.table_number || "N/A",
      status: order.status || "Không xác định",
      totalAmount: parseFloat(order.total_amount || 0).toLocaleString("vi-VN"),
      createdAt: order.created_at || "N/A",
      updatedAt: order.updated_at || "N/A",
      items: order.details?.map((detail) => ({
        name: detail.dish?.name || "Không xác định",
        qty: detail.quantity || 0,
        price: parseFloat(detail.price || 0),
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

//  if (order.items && order.items.length > 0) {
//       const total = order.items.reduce(
//         (sum, item) => sum + item.qty * item.price,
//         0
//       );
//       setTotalPrice(total);
//     } else {
//       setTotalPrice(order.total_amount);
//     }
//   } catch (err) {
//     console.error("Lấy chi tiết đơn hàng lỗi:", err);
//     setOrderDetails(null);
//   }


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

      {/* nút thêm bàn */}
      {/* <button className="btn-confirm" onClick={() => navigate("/admin/tables/add")}>
        + Thêm bàn
      </button> */}

      <div className="tables-grid">
        {tables.length > 0 ? (
          tables.map((table) => (
            <div className="table-card" key={table.id}>
              <h3>Bàn {table.table_number}</h3>
              <p className={`table-status ${getStatusClass(table.status)}`}>
                {translateStatus(table.status)}
              </p>
              <div className="table-actions">
                {table.status === "available" && (
                  <button className="btn-confirm">Thanh toán</button>
                )}
                {table.status === "occupied" && (
                  <button className="btn-confirm">Thanh toán</button>
                )}
              <button className="btn-back" onClick={() => openDetail(table)}>
  Chi tiết
</button>


{selectedTable && (
  <div className="modal-overlay" onClick={closeDetail}>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
      <h3>Chi tiết Bàn {selectedTable.table_number}</h3>

      {loading ? (
        <p>Đang tải thông tin đơn hàng...</p>
      ) : orderDetails ? (
        <div className="order-info">
          <p><strong>Mã đơn:</strong> {orderDetails.orderId}</p>
          <p><strong>Bàn:</strong> {orderDetails.table}</p>
          <p><strong>Nhân viên:</strong> {orderDetails.userId}</p>
          <p><strong>Khách hàng:</strong> {orderDetails.customerId}</p>
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
        </div>
      ) : (
        <p>Không có đơn hàng cho bàn này.</p>
      )}

      <button className="btn-back" onClick={closeDetail}>
        Đóng
      </button>
    </div>
  </div>
)}



                {/* nút sửa */}
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
    </div>
  );
}
