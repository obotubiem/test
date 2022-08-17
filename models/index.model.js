const dbConfig = require('../config/database');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.customer = require('./customer.model')(sequelize, Sequelize)
db.category = require('./category.model')(sequelize, Sequelize)
db.product = require('./product.model')(sequelize, Sequelize)
db.order = require('./order.model')(sequelize, Sequelize)
db.order_detail =require('./order_detail.model')(sequelize, Sequelize)

db.category.hasMany(db.product, {foreignKey:"category_id"})
db.product.belongsTo(db.category, {foreignKey:"category_id"} )

db.order.belongsTo(db.customer, {foreignKey:"customer_id"})
db.customer.hasMany(db.order,{foreignKey:"customer_id"})

db.order_detail.belongsTo(db.order,{foreignKey: "order_id"})
db.order.hasMany(db.order_detail,{foreignKey: "order_id"})

db.product.hasMany(db.order_detail,{foreignKey: "product_id"})
db.order_detail.belongsTo(db.product,{foreignKey : "product_id"})


module.exports = db;