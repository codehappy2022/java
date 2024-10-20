// components/OrderStatistics.js

import React from 'react';

const OrderStatistics = () => {
  // Dữ liệu giả lập cho thống kê
  const stats = {
    totalOrders: 120,
    totalRevenue: 25000, // Đơn vị: USD
    averageOrderValue: 208.33, // Đơn vị: USD
  };

  return (
    <div className="order-statistics">
      <h2>Thống Kê Đơn Hàng</h2>
      <ul>
        <li>Tổng số đơn hàng: {stats.totalOrders}</li>
        <li>Tổng doanh thu: ${stats.totalRevenue.toFixed(2)}</li>
        <li>Giá trị đơn hàng trung bình: ${stats.averageOrderValue.toFixed(2)}</li>
      </ul>
    </div>
  );
};

export default OrderStatistics;
