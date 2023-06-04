const uuid = require("uuid");
const path = require("path");
const { Address } = require("../models/models");
const ApiError = require("../error/ApiError");

class AddressController {
  async getOne(req, res) {
    const userId = req.user.id;
    try {
      const address = await Address.findOne({
        where: { userId },
        attributes: [
          "city",
          "street",
          "house",
          "entrance",
          "floor",
          "apartment",
          "comment",
        ],
      });
      res.send(address);
    } catch (error) {
      res.status(200).send(ApiError.badRequest("Адрес не найден!"));
    }
  }
  async create(req, res) {
    try {
      const addressData = {};

      for (const field in req.body) {
        if (field in Address.rawAttributes) {
          addressData[field] = req.body[field];
        }
      }
      addressData.userId = req.user.id;
      // Проверяем наличие обязательных полей
      if (!addressData.city || !addressData.street || !addressData.house) {
        throw new Error("Необходимо заполнить город, улицу и номер дома.");
      }
      //Добавляем запись в базу данных
      const createdAddress = await Address.create(addressData);
      res.send(createdAddress);
    } catch (error) {
      console.error("Ошибка при добавлении адреса:", error.message);
      throw error;
    }
  }
  async delete(req, res) {
    const userId = req.user.id;
    Address.destroy({
      where: {
        userId,
      },
    });
  }
  async update(req, res) {
    const address = {
      city: req.body.city,
      street: req.body.street,
      house: req.body.house,
      entrance: req.body.entrance,
      floor: req.body.floor,
      apartment: req.body.apartment,
      comment: req.body.comment,
    };
    try {
      await Address.update({ ...address }, { where: { userId: req.user.id } });
      res.send({ message: "Данные успешно обновлены" });
    } catch (error) {
      res.status(200).send({ error });
    }
  }
}

module.exports = new AddressController();
