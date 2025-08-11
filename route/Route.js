import express from "express";
import multer from "multer";
import { signup, signin } from "../controller/UserController.js";
import { orderFood } from "../controller/OrderController.js";
import { fetchCert } from "../controller/OrderController.js";
import { fetchUserById } from "../controller/UserController.js";
import {getMeals, createMeal, deleteMeal} from "../controller/MealController.js";
import { updateOrderStatus } from "../controller/OrderController.js";
import {getUserOrders, deleteOrder} from "../controller/OrderController.js";
// import authMiddleware from "../middleware/authMiddleware.js"


const router = express.Router();

// ✅ multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // saves in uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique file name
  },
});

const upload = multer({ storage: storage });


router.post("/signup", signup);
router.post("/signin", signin);
router.post("/orderFood", orderFood)
router.get("/fetchorder", fetchCert)
// router.get("/fetchuser", fetchuser)
router.get("/meals", getMeals);
router.post("/meals", upload.single("image"), createMeal);
router.delete("/meals/:id", deleteMeal);
router.put("/order/:id", updateOrderStatus);
router.get("/orders/:userId", getUserOrders);
router.delete("/orders/:id", deleteOrder);
// router.get("/fetchuser/:id", fetchUserById)
router.get("/fetchUserById/:id", fetchUserById);






export default router;




