const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define("basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});
const Discount = sequelize.define("discount", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discountSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 99 },
  },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const PersonalInfo = sequelize.define("personal_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lastName: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  firstName: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  patronymic: { type: DataTypes.STRING },
  phoneNumber: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
});
const Address = sequelize.define("address", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  city: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  street: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  house: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  entrance: { type: DataTypes.STRING },
  floor: { type: DataTypes.STRING },
  apartment: { type: DataTypes.STRING },
  comment: { type: DataTypes.STRING },
});
const Sales = sequelize.define("sales", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sale_percent: { type: DataTypes.INTEGER, allowNull: false },
});
const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  totalAmount: { type: DataTypes.INTEGER, allowNull: false },
  paymentMethod: { type: DataTypes.STRING, allowNull: true },
});
Order.belongsTo(User); // Связь: Order принадлежит User
Order.belongsToMany(Device, { through: "OrderDevice" });
User.hasMany(Order); // Связь: User имеет много Order
Device.belongsToMany(Order, { through: "OrderDevice" });
//belongs to - принадлежит Bascket.belongsTo(User)____ Bascket - таблица где будет ссылка на belongsTo(объект)
User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(PersonalInfo, { onDelete: "CASCADE" });
PersonalInfo.belongsTo(User, { onDelete: "CASCADE" });

User.hasOne(Address, { onDelete: "CASCADE" });
Address.belongsTo(User, { onDelete: "CASCADE" });

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasOne(Discount);
Discount.belongsTo(Device);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
  PersonalInfo,
  Address,
  Discount,
  Order,
};
