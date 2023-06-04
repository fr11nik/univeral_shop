const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket, PersonalInfo, Address } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const personalInfoData = {
      lastName: req.body.lastName || "",
      firstName: req.body.firstName || "",
      patronymic: req.body.patronymic || "",
      phoneNumber: req.body.phonenumber || "",
    };
    await PersonalInfo.create({
      ...personalInfoData,
      userId: user.id,
    });
    await Basket.create({ userId: user.id });
    const addressData = {
      city: req.body.city || "",
      street: req.body.street || "",
      house: req.body.house || "",
      entrance: req.body.entrance || "",
      floor: req.body.floor || "",
      apartment: req.body.apartment || "",
      comment: req.body.comment || "",
      userId: user.id,
    };

    const createdAddress = await Address.create(addressData);
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
