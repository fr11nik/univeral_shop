const uuid = require("uuid");
const path = require("path");
const { PersonalInfo, Address, User } = require("../models/models");
const ApiError = require("../error/ApiError");

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
        },
        {
          model: PersonalInfo,
        },
      ],
    });
    const isValid =
      userData.personal_info.firstName.length != 0 &&
      userData.personal_info.lastName.length != 0 &&
      userData.personal_info.phoneNumber.length != 0 &&
      userData.address.city.length != 0 &&
      userData.address.street.length != 0 &&
      userData.address.house.length != 0 &&
      userData.address.entrance.length != 0;
    res.send(isValid);
  }
}
module.exports = new PersonalInfoController();
