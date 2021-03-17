module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("account", {
      firstName: {type: Sequelize.STRING},
      lastName: {type: Sequelize.STRING},
      emailAddress: {type: Sequelize.STRING}
    });
  
    return User;
  };