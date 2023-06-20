const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
const { Basket, Device, BasketDevice, Discount } = require("../models/models");
class StripeController {
  async create(req, res) {
    const id = req.user.id;
    const basket = await Basket.findOne({
      where: {
        userId: id,
      },
      attributes: [],
      include: [
        {
          model: BasketDevice,
          attributes: ["id"],
          include: [
            {
              model: Device,
              attributes: ["price"],
              include: [
                {
                  model: Discount,
                  required: false,
                  attributes: ["discountSize"],
                },
              ],
            },
          ],
        },
      ],
    });
    var total = 0;
    basket.basket_devices.map((item) => {
      var sub = 0;
      if (item.device.discount) {
        sub =
          item.device.price -
          item.device.price * (item.device.discount.discountSize / 100);
      } else sub = item.device.price;
      total += sub;
    });
    const amountInRubles = total;
    const amountInKopeks = Math.round(amountInRubles * 100);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "RUB",
        amount: amountInKopeks,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  }
}

module.exports = new StripeController();
