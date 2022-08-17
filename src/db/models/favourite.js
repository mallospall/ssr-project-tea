const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { foreignKey: 'user_id' });
      this.belongsToMany(models.Tea, { foreignKey: 'tea_id' });
    }
  }
  Favourite.init({
    user_id: DataTypes.INTEGER,
    tea_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};
