module.exports = (sequelize, Sequelize) => {
    const Order_detail = sequelize.define("order_detail", {
      qty: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      }
    });
    return Order_detail;
  };