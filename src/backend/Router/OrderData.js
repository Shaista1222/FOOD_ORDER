const express = require("express");
const Order = require("../models/Orders");
const router = express.Router();


router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    console.log(data)
    await data.splice(0, 0, { Order_date: req.body.order_date })
    //if email not exisitng in db then create: else: InsertMany()
    //mtlb if user ka pala order
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Server Error: " + error.message);

        }
    } else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                //for append a new data, do not delete pale order
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Server Error: " + error.message);
        }
    }
})
router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: eId })
    } catch (error) {
        res.send("Error", error.message)
    }


});
module.exports = router;