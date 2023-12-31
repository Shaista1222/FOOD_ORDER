const mongoose = require("mongoose");

const DBConnection = async () => {
    await mongoose
        .connect("mongodb://127.0.0.1:27017/food-delivery", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async () => {
            // const fetch_data = await mongoose.connection.db.collection("menu")
            // fetch_data.find({}).toArray(function (err, data) {
            //     const fetch_catData = mongoose.connection.db.collection("food-category")
            //     fetch_catData.find({}).toArray(function (err, catData) {
            //         if (err) console.log(err)
            //         else {
            //             global.menu = data
            //             // const info1 = global.menu
            //             // console.log(info1)
            //             global.food_category = catData
            //             // const info = global.food_category
            //             // console.log(info)
            //         }
            //     })
            // })
            console.log("connected to the database..")
        })
        .catch((err) => console.error("mongoose is not connected", err));
}
module.exports = DBConnection;
