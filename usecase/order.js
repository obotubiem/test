const order_constants = require("../internal/constants/order");
const product_uc = require("../usecase/product");
let db = require('../models/index')
const Op = require("sequelize").Op;

let getPendingOrderByUserID = async (user_id) => {
  let order = null;
  try {
    order = await db.order.findOne({
      where: {
        user_id: user_id,
        status: order_constants.ORDER_PENDING,
      },
    });
  } catch (e) {
    console.log(e);
  }

  if (order === null) {
    return order;
  }

  let grandTotal = await db.orderDetail.sum("total", {
    where: { order_id: order.id },
  });

  order.setDataValue("grandTotal", grandTotal);

  return {
    ...order.dataValues,
    details: await getDetailOrder(order.id),
  };
};

let getDetailOrder = async (order_id) => {
  let details = [];
  try {
    details = await db.orderDetail.findAll({
      where: { order_id: order_id },
    });
  } catch (e) {
    console.log(e);
  }

  return details;
};

let createOrder = async (user_id, items) => {
  let is_success = false;
  let order = {
    user_id: user_id,
    status: order_constants.ORDER_PENDING,
  };
  let res_order = null;
  try {
    res_order = await db.order.create(order);
    is_success = true;
  } catch (e) {
    console.log(e);
  }
  order = await getPendingOrderByUserID(user_id);
  await addOrderDetails(order.id, items);
  return {
    is_success: is_success,
    order: order,
  };
};

let addOrderDetails = async (order_id, items) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].qty <= 0) {
      continue;
    }
    let product = null;
    product = await product_uc.getProudctByID(items[i].id);

    if (product !== null) {
      let detail = {
        order_id: order_id,
        product_id: product.id,
        qty: items[i].qty,
        total: product.price * items[i].qty,
      };

      try {
        await db.orderDetail.create(detail);
      } catch (e) {
        console.log(e);
      }
    }
  }
};

let changeOrderStatus = async (order_id, status) => {
  await db.order.update(
    {
      status: status,
    },
    {
      where: { id: order_id },
    }
  );
};

let listOrderExcludePending = async () => {
  let orders = await db.order.findAll({
    where: {
      [Op.and]: [
        {
          status: {
            [Op.ne]: order_constants.ORDER_PENDING,
          },
        },
        {
          status: {
            [Op.ne]: order_constants.ORDER_COMPLETED,
          },
        },
      ],
    },
  });

  if (orders === null) {
    return [];
  }

  return orders;
};

let listCompletedOrder = async () => {
  let orders = await db.order.findAll({
    where: {
      [Op.or]: [
        {
          status: order_constants.ORDER_COMPLETED,
        },
        {
          status: order_constants.ORDER_CANCELED,
        },
      ],
    },
  });

  if (orders === null) {
    return [];
  }

  return orders;
};


let updateOrder = async (user_id, items) => {
  let is_success = false;
  let order = {
    user_id: user_id,
    status: order_constants.ORDER_PENDING,
  };
  let res_order = null;
  try {
    res_order = await db.order.update(order);
    console.log(res_order)
    is_success = true;
  } catch (e) {
    console.log(e);
  }
  order = await getPendingOrderByUserID(user_id);
  await addOrderDetails(order.id, items);
  return {
    is_success: is_success,
    order: order,
  };
};

module.exports = {
  getPendingOrderByUserID: getPendingOrderByUserID,
  getDetailOrder: getDetailOrder,
  createOrder: createOrder,
  addOrderDetails: addOrderDetails,
  changeOrderStatus: changeOrderStatus,
  listOrderExcludePending: listOrderExcludePending,
  listCompletedOrder: listCompletedOrder,
  updateOrder:updateOrder
};
