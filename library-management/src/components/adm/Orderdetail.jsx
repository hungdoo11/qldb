import React, { useState, useEffect } from "react";
import api from "../api/Api";
import "./admin.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [showQtyModal, setShowQtyModal] = useState(false);
const [currentDish, setCurrentDish] = useState({ orderId: null, dishId: null, maxQty: 0 });
const [qtyInput, setQtyInput] = useState(1);


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/order", {
        params: { status: "pending" },
      });
      setOrders(res.data || []); // dữ liệu thật nằm trong res.data.data
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/admin/order/${id}`, { status });
      if (res.status == 200) {
        setIsOpen(false);
        setSelectedOrder(null);
      }
      fetchOrders();
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (error) {
      console.error(error);
    }
  };
 const removeDish = async (orderId, dishId, qtyToRemove) => {
  if (!qtyToRemove || qtyToRemove <= 0) {
    alert("Số lượng không hợp lệ!");
    return;
  }

  const res = await api.delete(`/admin/order-detail-by-order`, {
    params: {
      dish_id: dishId,
      order_id: orderId,
      quantity: qtyToRemove,
    }
  });

  if (res.status === 200) {
    setSelectedOrder((prev) => ({
      ...prev,
      details: prev.details.map((d) =>
        d.dish_id === dishId
          ? { ...d, quantity: d.quantity - qtyToRemove }
          : d
      ).filter((d) => d.quantity > 0)
    }));
  }
};




  return (
    <div>
      <h2 className="admin-title">Danh sách đơn bếp</h2>
      <div className="admin-container">
        <div className="orders-grid-order">
          {orders.map((order, index) => {
            const total = order.details
              ? order.details.reduce(
                (sum, d) => sum + d.quantity * parseFloat(d.price),
                0
              )
              : 0;

            return (
              <div
                key={order.id}
                className="order-card bordered-card"
                onClick={() => {
                  setSelectedOrder(order);
                  setIsOpen(true);
                }}
              >
                {/* Header: thứ tự + mã đơn */}
                <div className="order-header">
                  <span className="order-queue">#{index + 1}</span>
                  <span className="order-id">Mã: {order.id}</span>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </div>

                {/* Body: khách + bàn */}
                <div className="order-body">
                  <p><b>Khách:</b> {order.cus_name}</p>
                  <p><b>Bàn:</b> {order.table?.table_number || "Chưa có"}</p>
                </div>

                {/* Footer: tổng cộng */}
                <div className="order-footer">
                  <span className="total-label">Tổng cộng:</span>
                  <span className="total-price">{total.toLocaleString()} đ</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal chi tiết */}
      {isOpen && selectedOrder && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Chi tiết đơn hàng</h2>
            <p><b>Mã đơn:</b> {selectedOrder.id}</p>
            <p><b>Khách hàng:</b> {selectedOrder.cus_name}</p>
            <p><b>Bàn:</b> {selectedOrder.table?.table_number || "Chưa có"}</p>
            <p><b>Trạng thái:</b> {selectedOrder.status}</p>

            <h3>Danh sách món ăn</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Món ăn</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                  <th>Hành động</th> {/* thêm cột */}
                </tr>
              </thead>
              <tbody>
                {selectedOrder.details?.map((d, idx) => (
                  <tr key={idx}>
                    <td>{d.dish?.name}</td>
                    <td>{d.quantity}</td>
                    <td>{parseFloat(d.price).toLocaleString()} đ</td>
                    <td>{(d.quantity * parseFloat(d.price)).toLocaleString()} đ</td>
                    <td>
                     <button
                      className="btn-reject"
                      onClick={() => {
                        setCurrentDish({ orderId: selectedOrder.id, dishId: d.dish_id, maxQty: d.quantity });
                        setQtyInput(1);
                        setShowQtyModal(true);
                      }}
                    >
                      ❌
                    </button>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="order-actions">
              <button
                className="btn-accept"
                onClick={() => updateStatus(selectedOrder.id, "serving")}
              >
                Xác nhận
              </button>
              <button
                className="btn-reject-order"
                onClick={() => updateStatus(selectedOrder.id, "cancelled")}
              >
                Từ chối
              </button>
              <button className="btn-back" onClick={() => setIsOpen(false)}>
                Đóng
              </button>
            </div>

          </div>
        </div>
        
      )}
      {showQtyModal && (
  <div className="modal-overlay" onClick={() => setShowQtyModal(false)}>
    <div className="mini-modal" onClick={(e) => e.stopPropagation()}>
      <h4>Nhập số lượng muốn xóa (Tối đa {currentDish.maxQty})</h4>
      <input
        type="number"
        min="1"
        max={currentDish.maxQty}
        value={qtyInput}
        onChange={(e) => setQtyInput(e.target.value)}
      />
      <div className="modal-buttons">
       <button
        className="btn-accept"
        onClick={() => {
          removeDish(currentDish.orderId, currentDish.dishId, parseInt(qtyInput));
          setShowQtyModal(false);
        }}
      >
        OK
      </button>

        <button className="btn-reject-order" onClick={() => setShowQtyModal(false)}>Hủy</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
