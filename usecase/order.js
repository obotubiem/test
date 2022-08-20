let order_status = require("../internal/constants/order");
const product_uc = require("../usecase/product");
const { Order, OrderDetail } = require("../models");
const order = require("../internal/constants/order");
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
  // if (order === null) {
  //   return order
  // }
  // return {
  //   ...order.dataValues,
  //   details: await getDetailOrder(order.id),
  // }
}

let createOrder = async (order) =>{
  let is_success = false
  try {
      order = await Order.create(order)
      is_success = true
  } catch (error) {
      console.log(error)
  }
  return {
      is_success : is_success,
      order : order
  }
}


// let getDetailOrder = async (order_id) => {
//   let details = [];
//   try {
//     details = await OrderDetail.findAll({
//       where: { order_id: order_id },
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   return details;
// };

// let createOrder = async (user_id, items)=>{
//   let is_succes =false
//   let order ={
//     user_id : user_id,
//     status : order_status.ORDER_PENDING
//   }
//   let res_order = null

//   try {
//     res_order = await Order.create(order)
//     is_succes = true
//   } catch (error) {
//     console.log(error)
//   }
//   order = await getPendingOrderByUserID(user_id)
//   await addOrderDetails(order.id, items)
//   return {
//     is_succes: is_succes,
//     order:order
//   }
// }

let addOrderDetails =async (order_id, items) =>{
  for(let i =0; i<items.length; i++){
    if(items[i].qty <=0){
      continue
    }
    let product = null
    product = await product_uc.getProudctByID(items[i].id)
    if(product!==null){
      let detail = {
        order_id: order_id,
        product_id: product_id,
        qty:items[i].qty
      }
      try {
        await OrderDetail.create(detail)
      } catch (error) {
        console.log(error)
      }
    }
  }
}


module.exports ={
  getPendingOrderByUserID, 
 createOrder
}