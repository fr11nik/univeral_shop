const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
  async delete(req, res) {
    const { name } = req.body;
    if (!name) {
      res.status(400).send({ message: "В body ничего нет" });
    }
    const brand = await Brand.findOne({ where: { name }, attributes: ["id"] });
    if (!brand) {
      res.status(404).send({ message: "Данный бренд не найден!" });
      return;
    }
    try {
      await Brand.destroy({ where: { id: brand.id, name } });
      res.send({ message: "Бренд был успешно удален" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new BrandController();
