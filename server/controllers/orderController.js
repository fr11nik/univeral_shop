const {
  Discount,
  User,
  Device,
  Basket,
  BasketDevice,
  Order,
} = require("../models/models");
class OrderController {
  async create(req, res, next) {
    const userId = req.user.id;
    const user = await User.findOne({ where: { id: userId } });

    const addition = {
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
    };
    const order = await Order.create({
      totalAmount: addition.totalAmount,
      paymentMethod: addition.paymentMethod,
    });
    await order.setUser(user);
    const devices = await Basket.findOne({
      where: {
        userId,
      },
      attributes: [],
      include: [
        {
          attributes: ["deviceId"],
          model: BasketDevice,
          include: [
            {
              model: Device,
              attributes: [],
            },
          ],
        },
      ],
    });
    const arr = [];
    devices.basket_devices.map((item) => {
      arr.push(item.deviceId);
    });
    const devices_list = await Device.findAll({ where: { id: arr } });
    const resa = await order.addDevices(devices_list);
    const data = await Basket.findOne({
      where: { userId },
      attributes: ["id"],
    });
    const id = data.dataValues["id"];
    await BasketDevice.destroy({ where: { basketId: id } });
    res.send(resa);
  }
  async getOne(req, res) {
    const userId = req.user.id;
    let ordersArr = [];
    const ordersItems = await Order.findAll({ where: { userId } });
    if (!ordersItems) {
      res.send({ devices: [] });
    }
    for (let i = 0; i < ordersItems.length; i++) {
      var items = await ordersItems[i].getDevices();
      ordersArr.push({ orderDetails: ordersItems[i], devices: items });
    }
    res.send(ordersArr);
  }
  async delete(req, res) {}
}
module.exports = new OrderController();
