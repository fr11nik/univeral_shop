const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async delete(req, res) {
    const { name } = req.body;
    if (!name) {
      res.status(400).send({ message: "В body ничего нет" });
    }
    const type = await Type.findOne({ where: { name }, attributes: ["id"] });
    if (!type) {
      res.status(404).send({ message: "Данный тип не найден!" });
      return;
    }
    try {
      await Type.destroy({ where: { id: type.id, name } });
      res.send({ message: "Тип был успешно удален" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new TypeController();
