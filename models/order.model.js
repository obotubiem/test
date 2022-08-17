module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      customer_id: {
        type: Sequelize.INTEGER
      }
    
    });
    return Order;
  };