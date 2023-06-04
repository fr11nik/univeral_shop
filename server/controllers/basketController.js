const uuid = require("uuid");
const path = require("path");
const { Basket, Device, BasketDevice } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async getOne(req, res) {
    const id = req.user.id;
    const basket = await Basket.findOne({
      where: {
        userId: id,
      },
      attributes: [],
      include: [
        {
          model: BasketDevice,
          attributes: ["id", "deviceId"],
          include: [
            {
              model: Device,
              attributes: [
                "name",
                "price",
                "rating",
                "img",
                "typeId",
                "brandId",
              ],
            },
          ],
        },
      ],
    });

    res.send(basket);
  }
  async create(req, res) {
    const userId = req.user.id;
    // получить id устройства из body
    const deviceId = req.body.id;
    const amount = req.body.amount || 1;
    if (deviceId === undefined) {
      res.status(404).send(ApiError.badRequest("device_id is null"));
    }
    const currentBasket = await Basket.findOne({
      where: {
        userId,
      },
      attributes: ["id"],
    });
    const basketId = currentBasket.dataValues.id;
    const DeviceObj = await Device.findByPk(deviceId);
    if (!DeviceObj) {
      res.status(404).send({ message: "current device is not exist!" });
    }
    BasketDevice.create({
      basketId,
      deviceId,
      amount,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(401).send(err.parent.detail);
      });
  }
  async delete(req, res) {
    const id = req.body.id;
    BasketDevice.destroy({
      where: {
        id,
      },
    })
      .then((deletedRows) => {
        if (deletedRows > 0) {
          res.status(200).json({ message: "Успешно удалено" });
        } else {
          res.status(404).json({ message: "Запись не найдена" });
        }
        return;
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        res.status(401).send({ message: "Ошибка со стороны destory" });
        return;
      });
  }
}

module.exports = new BasketController();
