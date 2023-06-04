const {Discount} = require('../models/models');
class DiscountController {
    async create(req,res,next){
        const deviceId = req.body.deviceId;
        const discountSize = req.body.discountSize;
        if(!deviceId) res.status(404).send({message:"Не найдено!"}) 
        try {
            const data = await Discount.create({deviceId,discountSize});
            res.send(data)
        } catch (error) {
            res.status(200).send(error)
        }
    }
    async delete(req,res){
        const deviceId = req.body.deviceId;
        const deviceName = req.body.deviceName;
        if(!deviceId) res.status(404).send({message:"Не найдено!"})
        try {
            const data = await Discount.destroy({where:{deviceId}})
            if(!data){
                res.status(400).send({message:"Ошибка"})
                return;
            }
            res.send({message:"Успешно!"})
            return;
        } catch (error) {
            res.status(200).send(error)
            return;
        }
    }   
}
module.exports = new DiscountController();