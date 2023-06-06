const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo, Discount, Brand } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res) {
    const idsToDelete = req.body;
    await Device.destroy({
      where: {
        id: {
          [Op.in]: idsToDelete,
        },
      },
    })
      .then((rowsDeleted) => {
        res.send({ message: "успешно!" });
      })
      .catch((error) => {
        res.status(401).send({ error });
      });
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({
        include: [
          {
            model: Discount,
            required: false, // Если вы хотите получить девайсы, даже если для них нет скидок}
          },
          {
            model: Brand,
            attributes: ["name"],
          },
        ],
        limit,
        offset,
      });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        include: [
          {
            model: Discount,
            required: false, // Если вы хотите получить девайсы, даже если для них нет скидок}
          },
          {
            model: Brand,
            attributes: ["name"],
          },
        ],
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        include: [
          {
            model: Discount,
            required: false, // Если вы хотите получить девайсы, даже если для них нет скидок}
          },
          {
            model: Brand,
            attributes: ["name"],
          },
        ],
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        include: [
          {
            model: Discount,
            required: false, // Если вы хотите получить девайсы, даже если для них нет скидок}
          },
          {
            model: Brand,
            attributes: ["name"],
          },
        ],
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [
        { model: DeviceInfo, as: "info" },
        {
          model: Discount,
          required: false, // Если вы хотите получить девайсы, даже если для них нет скидок
        },
      ],
    });
    return res.json(device);
  }
  async getDevicesWithoutDiscount(req, res) {
    try {
      let devicesWithoutDiscount = await Device.findAll({
        include: {
          model: Discount,
          required: false,
        },
        attributes: ["id", "name", "price", "rating", "img"],
      });

      devicesWithoutDiscount = devicesWithoutDiscount.filter(
        (device) => device.discount === null
      );
      res.json(devicesWithoutDiscount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async getDevicesWithDiscount(req, res) {
    try {
      let devicesWithoutDiscount = await Device.findAll({
        include: {
          model: Discount,
          required: false,
        },
        attributes: ["id", "name", "price", "rating", "img"],
      });

      devicesWithoutDiscount = devicesWithoutDiscount.filter(
        (device) => device.discount !== null
      );
      res.json(devicesWithoutDiscount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new DeviceController();
