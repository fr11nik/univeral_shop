const {
  PersonalInfo,
  Address,
  User,
  Basket,
  Device,
  BasketDevice,
  Discount,
} = require("../models/models");

const ApiError = require("../error/ApiError");
const validator = require("validator");
class PersonalInfoController {
  async getOne(req, res) {
    const userId = req.user.id;
    try {
      const personalInfo = await PersonalInfo.findOne({
        where: { userId },
        attributes: ["lastName", "firstName", "patronymic", "phoneNumber"],
      });
      res.send(personalInfo);
    } catch (error) {
      res.status(200).send(ApiError.badRequest(err));
    }
  }
  async create(req, res) {}
  async delete(req, res) {}

  async update(req, res) {
    const userId = req.user.id;
    const personalInfoData = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      patronymic: req.body.patronymic,
      phoneNumber: req.body.phoneNumber,
    };
    try {
      await PersonalInfo.update({ ...personalInfoData }, { where: { userId } });
      res.send({ message: "Данные успешно обновлены" });
    } catch (error) {
      res.status(200).send({ err });
    }
  }
  async verify(req, res) {
    const userId = req.user.id;
    const userData = await User.findOne({
      where: { id: userId },
      attributes: [],
      include: [
        {
          model: Address,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "userId",
              "floor",
              "apartment",
              "comment",
            ],
          },
        },
        {
          model: PersonalInfo,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "userId",
              "phoneNumber",
              "patronymic",
            ],
          },
        },
      ],
      raw: true,
    });
    for (let [key, value] of Object.entries(userData)) {
      if (typeof value === "string") {
        userData[key] = value.replace(/\s/g, "");
        if (userData[key].length === 0) {
          res.send(false);
          return;
        }
      } else if (value === -1) {
        res.send(false);
        return;
      }
    }
    res.send(true);
  }
}
module.exports = new PersonalInfoController();
