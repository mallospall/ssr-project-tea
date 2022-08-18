const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, { foreignKey: 'tea_id' });
    }
  }
  Tea.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    x: DataTypes.FLOAT,
    y: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Tea',
  });
  return Tea;
};
