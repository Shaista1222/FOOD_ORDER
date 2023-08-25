const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
