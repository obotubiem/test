const order_status = require("../internal/constants/order");
const product_uc = require("../usecase/product");
const { Order, OrderDetail } = require("../models");
const Op = require("sequelize").Op;

let getPendingOrderByUserID = async (user_id) => {
  let order = null;
  try {
    order = await Order.findOne({
      where: {
        user_id: user_id,
        status: order_status.ORDER_PENDING,
      },
    });
  } catch (error) {
    console.log(error);
  }
  if (order === null) {
    return order;
  }
  return {
    ...order.dataValues,
    details: await getDetailOrder(order.id),
  };
};

let getDetailOrder = async (order_id) => {
  let details = [];
  try {
    details = await OrderDetail.findAll({
      where: { order_id: order_id },
    });
  } catch (error) {
    console.log(error);
  }
  return details;
};



module.exports ={getPendingOrderByUserID, getDetailOrder}