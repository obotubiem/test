module.exports = (sequelize, Sequelize) => {
    const Detail = sequelize.define("detail", {
      qty: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      }
    });
    return Detail;
  };