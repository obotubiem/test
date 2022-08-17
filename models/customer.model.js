module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      username: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
    });
    return Customer;
  };