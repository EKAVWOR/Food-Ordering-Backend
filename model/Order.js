import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },
    foodItem: {
        type: Array,
        required: true,
    },
    quantity: {
        type: Number,
        required: false
    },
    deliveryAddress: {
        type: String,
    },
    orderTime: {
        type: Date,
    },
     status:  {
        type: String,
    },
    userId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    

});

const Order = mongoose.model("Order", orderSchema)
export default Order;