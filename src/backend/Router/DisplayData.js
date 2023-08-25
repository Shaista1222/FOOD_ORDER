const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


router.post('/food-data', async (req, res) => {
    try {
        const menuCollection = mongoose.connection.db.collection('menu');
        const data = await menuCollection.find({}).toArray();

        const catCollection = mongoose.connection.db.collection('food-category');
        const catData = await catCollection.find({}).toArray();

        res.send([data, catData]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// router.post('/food-data', (req, res) => {
//     try {
//         func()
//         res.send([global.menu, global.food_category]);
//     } catch (error) {
//         console.log(error.message)
//         res.send("Server error.")
//     }
// });
//object ke andr map nae ota but only for array
//us function tab sero jb us element/component m cane aa aa raa o(useEffect()) depenciess(element) andr function call
// o jaene
module.exports = router;