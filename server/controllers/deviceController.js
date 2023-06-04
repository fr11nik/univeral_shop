const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo, Discount,Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

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
            attributes:["name"]
          }
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
            attributes:["name"]
          }
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
            attributes:["name"]
          }
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
            attributes:["name"]
          }
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
      include: [{ model: DeviceInfo, as: "info" },{ model: Discount,
        required: false, // Если вы хотите получить девайсы, даже если для них нет скидок
      }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
