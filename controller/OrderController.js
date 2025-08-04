import e from "express";
import sendEmail from "../utils/sendEmail.js";
import Order from "../model/Order.js";



export const orderFood = async (req, res) => {
    try {
        const {
            customerName,
            foodItem,
            quantity,
            deliveryAddress,
            orderTime,
            status,
            userId,
            email
              
        } = req.body

        const neworder = new Order ({
            customerName : customerName,
            foodItem: foodItem,
            quantity: quantity,
            deliveryAddress: deliveryAddress,
            orderTime: orderTime,
            status: status,
            userId: userId,
            email: email
            

        })
await neworder.save()



 const foodItemsString = req.body.foodItem
      .map((item) => `${item.name} (x${item.quantity})`)
      .join(", ");

const message = `<table>
        <tbody>
        <tr>
        <td style="padding: 20px 30px 40px 30px;">
        <table width="100%" cellspacing="0" cellpadding="0"
        border="0">
        <tbody>
        <tr>
        <td style="padding: 5px 0 20px 10px; fontsize: 18px; line-height: 24px;">
        <strong>
        <p style="font-size: 20px; lineheight: 28px;"> Hello ${req.body.customerName},</p>
        </strong>
        <p style="font-size< 10px; lineheight: 24px;">
        Congratulations on successfully Orderig your Meal, Find below the details of your Order.
        </p>
        <ul style="font-size: 16px"; lineheight: 24px;">
        <li>
        your reference number ${req.body.userId}
        </li>
        <li> Food-Item: ${foodItemsString} 
        </li>
        <li>
        Quantity: ${req.body.quantity}
        </li>
        <li>
        Your Order Will Get To You Soonest
        </li>
        </ul>
        <strong style="font-size: 18px; lienheight: 28px;"> Enjoy Your Meal </strong>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>`;

        await sendEmail(req.body.email, "Order confirmation", message)

    return res.status(201).json ({message: "Order saved successfully"});
    }catch(error){
        console.log(error);

    }

    }
    export const fetchCert = async (req, res) => {
        try {
            let users = await Order.find().select(
                "orderTime customerName foodItem deliveryAddress userId status quantity email"
            );
            //Sending the fetched users as a response
            return res.status(200).json({users});
        }catch{
            return res.status(403).json({ msg: "Error in Fetching Users" });
    }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating order with id:", id);

    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ msg: "Order status updated", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; // or req.query
    const orders = await Order.find({ userId: userId });
    return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error fetching orders." });
  }
};

// Delete Order by ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    await Order.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error while deleting order" });
  }
};
