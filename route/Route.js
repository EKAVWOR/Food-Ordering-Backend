import express from "express";
import { signup, signin } from "../controller/UserController.js";
import { orderFood } from "../controller/OrderController.js";
import { fetchCert } from "../controller/OrderController.js";
import { fetchuser } from "../controller/UserController.js";


const router = express.Router();


router.post("/signup", signup);
router.post("/signin", signin);
router.post("/orderFood", orderFood)
router.get("/fetchorder", fetchCert)
router.get("/fetchuser", fetchuser)





export default router;